# ci: build CV PDF in GitHub Actions, drop Vercel prebuild hook

## Summary
Vercel cannot run WeasyPrint, so the PDF is now built in GitHub Actions and committed back to `main`.

## Changes
1. Remove the `prebuild` hook from `package.json`.
2. Add `.github/workflows/build-cv.yml` (build, check 2 pages, commit PDF).
3. Add education logos in `public/resume/logos/` that `cv.py` reads.
4. `cv.py` writes the PDF to `public/resume/`.

## Verification
- `cv.py` compiles (`py_compile`).
- Workflow not yet run. Trigger it with `workflow_dispatch` after merge.
