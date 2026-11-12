# ci: build the CV PDF on pull requests, not on main

## Summary
The CV workflow now runs on pull requests that touch CV inputs and commits the regenerated PDF to the PR branch. The Vercel preview shows it before merge, and merging brings it to `main`. Nothing runs on `main`.

## Changes
1. Trigger on `pull_request` instead of `push` to `main`, and drop `workflow_dispatch`.
2. Check out and push to the PR head branch.
3. Commit message no longer contains `[skip ci]`, so Vercel redeploys the preview.

## Verification
- Workflow not yet run. This PR touches the workflow file, so it triggers it.
- Same-repo PRs only: forks cannot push back.
