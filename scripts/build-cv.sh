#!/usr/bin/env bash
# Regenerates public/resume/afonso-caboz-resume.pdf from cv.py before `next build`.
# Never fails the build: if WeasyPrint (or its system libs) is unavailable, the
# committed PDF is kept as-is.
set -u
cd "$(dirname "$0")/.."

TARGET="public/resume/afonso-caboz-resume.pdf"
TMP="$(mktemp -d)/cv.pdf"
PY="$(command -v python3 || command -v python || true)"

if [ -z "$PY" ]; then
  echo "[build-cv] python not found - keeping committed $TARGET"; exit 0
fi

if ! "$PY" -c "import weasyprint" >/dev/null 2>&1; then
  "$PY" -m pip install --quiet --user -r requirements-cv.txt >/dev/null 2>&1 || true
fi

if "$PY" cv.py "$TMP" >/dev/null 2>&1 && [ -s "$TMP" ] && head -c 4 "$TMP" | grep -q '%PDF'; then
  mkdir -p "$(dirname "$TARGET")" && cp "$TMP" "$TARGET"
  echo "[build-cv] regenerated $TARGET from cv.py"
else
  echo "[build-cv] could not run cv.py here - keeping committed $TARGET"
fi
exit 0
