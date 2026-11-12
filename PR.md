# ci: build the CV PDF on main

## Summary
The workflow regenerates the CV PDF on pushes to `main` that touch CV inputs and commits it back. Vercel builds the original push and then rebuilds on the PDF commit, so the live CV is current after the second build. Vercel settings are untouched.

## Changes
1. Trigger on push to `main` (CV input paths) and `workflow_dispatch`.
2. Commit the PDF to `main` without `[skip ci]`, so Vercel redeploys.
3. No deploy hook step.

## Verification
- Workflow not yet run.
