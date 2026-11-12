# ci: build the CV PDF on main, then trigger the Vercel deploy

## Summary
Vercel's own Git build of `main` is disabled. The workflow regenerates the CV PDF on every push to `main`, commits it if it changed, then calls a Vercel Deploy Hook, so Vercel always builds a commit that already has the new PDF.

## Changes
1. Trigger on push to `main` (all paths) and `workflow_dispatch`.
2. Commit the PDF to `main` without `[skip ci]`.
3. Final step posts to the `VERCEL_DEPLOY_HOOK` secret.

## Required setup (outside the repo)
- Vercel, Settings, Git: create a Deploy Hook for `main` and add it as the `VERCEL_DEPLOY_HOOK` repository secret.
- Vercel, Settings, Git, Ignored Build Step: `[ "$VERCEL_GIT_COMMIT_REF" = "main" ] && exit 0 || exit 1` (skips main, keeps previews).

## Verification
- Workflow not yet run.
