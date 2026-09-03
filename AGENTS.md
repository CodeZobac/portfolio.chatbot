# Repository Guide for Agents

## Purpose

This repository is Afonso Caboz's conversational portfolio. Recruiters and technical peers can chat with an AI assistant, which answers from curated portfolio content and renders project, experience, skills, education, contact, CV, and resume interfaces when relevant.

Treat portfolio facts as user-owned data. Do not invent experience, metrics, links, technologies, or project claims.

## Stack

- Next.js 16 App Router, React 19, and strict TypeScript.
- Tailwind CSS 4 through `app/globals.css`, with shared semantic tokens in `tokens.css`.
- Vercel AI SDK 5 with an OpenAI-compatible Manifest endpoint.
- Framer Motion and GSAP for intentional motion; Lucide for interface icons.
- Zod for runtime content validation.
- Vitest for unit tests and ESLint for static checks.
- npm is the canonical package manager; preserve `package-lock.json`.

## Application Map

- `app/page.tsx`: main conversational portfolio, streaming chat state, tool-result routing, and lazy-loaded portfolio surfaces.
- `app/api/chat/route.ts`: streaming chat endpoint. It uses `MANIFEST_API_KEY`, the portfolio system prompt, and the tools exported from `lib/ai/tools.ts`.
- `app/admin/`: password-protected owner workbench for editing and publishing portfolio content.
- `app/api/admin/`: admin session, content retrieval, and GitHub publishing endpoints.
- `components/ai-elements/`: reusable chat, message, reasoning, source, conversation, and prompt primitives.
- `components/portfolio/`: project, experience, skills, CV, contact, and detail-modal interfaces.
- `components/intro/`: initial portfolio animation and visual stack.
- `components/ui/`: reusable low-level UI primitives.
- `content/portfolio-content.json`: canonical published portfolio content.
- `lib/content/`: content loading, validation, and YouTube helpers.
- `lib/ai/`: system prompt, tool descriptions, and tool implementations.
- `lib/admin/`: admin authentication and GitHub Contents API publishing.
- `lib/types.ts`: shared application and tool-output contracts.
- `public/projects/`: managed project artwork. Admin uploads belong under `public/projects/admin/`.
- `tests/`: Vitest coverage for content, authentication, GitHub publishing, AI tools, and portfolio cards.
- `specs/`: historical implementation specifications. Verify claims against current code and `package.json`; some version/provider notes are stale.

## Runtime and Data Flow

1. `app/page.tsx` sends UI messages to `/api/chat` through `DefaultChatTransport`.
2. The chat route streams a response from Manifest and exposes bounded portfolio tools.
3. Tool results use the discriminated unions in `lib/types.ts`.
4. `ToolOutputRenderer` maps those results to pre-built portfolio components.
5. Portfolio data is loaded from the validated JSON content layer; tool-facing skills deliberately omit arbitrary proficiency percentages.
6. The admin workbench validates edits and publishes the content file plus approved project media to the configured GitHub branch.

## Environment

Never expose or commit secrets. Relevant server-side variables include:

- `MANIFEST_API_KEY` for portfolio chat.
- `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` for the owner workbench.
- `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO`, and `GITHUB_BRANCH` for admin publishing.

Use a repository-scoped, fine-grained GitHub token with only the required Contents permission.

## Design and Implementation Conventions

- Preserve the warm paper/amber visual system and consume semantic values from `tokens.css` instead of adding one-off colours.
- Keep global CSS append-only and retain its Tailwind imports at the top.
- Use responsive, mobile-first layouts; both `html` and `body` must retain `overflow-x: clip`.
- Interactive controls require visible `:focus-visible`, hover, active, and disabled states with at least 44px touch targets.
- Respect `prefers-reduced-motion`. Animate transforms and opacity, not layout properties.
- Use Lucide consistently rather than mixing icon libraries.
- Do not place viewport-fixed modals inside transformed/animated ancestors. Portal them to `document.body`, lock background scrolling while open, support Escape/backdrop/explicit close, and restore state on cleanup.
- Streaming chat may follow new output only while the reader remains near the bottom. Upward wheel, touch, keyboard, or scrollbar movement must immediately cancel pending/smooth scrolling; reaching the bottom re-enables following.
- Preserve semantic heading order and accessible labels for icons, dialogs, iframes, and controls.
- When generating copy for CVs, resumes, or Cover Letters, never use dashes (- or — or –) or semicolons (;). Always adopt The Alchemical Writer voice (detailed in `mem:alchemical_writer`).
- Avoid broad rewrites. Keep changes scoped and preserve unrelated user modifications in a dirty worktree.

## Commands and Completion Checks

```bash
npm install
npm run dev
npm run lint
npm test
npx tsc --noEmit
npm run build
```

For focused work, lint the changed TypeScript files first. A task is complete when relevant tests pass, lint is clean, TypeScript is valid, and a production build is run for routing, dependency, rendering, or deployment-sensitive changes. `next/font` may require network access during production builds.

Generated `.next/dev/types` can become stale or malformed after an interrupted dev process. Do not edit generated validators. Use a clean production build as the authoritative Next.js type check and only clear generated output when it is safe and necessary.

## Required Serena MCP Workflow

Serena MCP is mandatory for repository understanding and durable project documentation.

1. At the beginning of every user request, use Serena MCP before other repository investigation or edits: call `initial_instructions` if it has not already been read in the current conversation, ensure this repository is activated, list the project memories, and read the memories relevant to the request. This applies to coding, review, documentation, diagnosis, and commit requests.
2. Prefer Serena symbol overviews, symbol lookup, reference search, and diagnostics over reading entire source files.
3. After every major change, use Serena MCP to update the relevant project memory/documentation with stable architectural decisions, commands, invariants, or conventions introduced by the change. Do not record volatile line-level details or one-off task notes.
4. Keep `mem:core` as the memory graph root and follow Serena's `mem:memory_maintenance` conventions. Run or recommend `serena memories check` after memory restructuring.
5. If Serena is unavailable, state that clearly and update repository documentation directly; do not silently skip the documentation step.

## Commit and PR Workflow

When the user asks for a commit, completing the request requires all of the following:

1. Inspect the branch, status, and diff before staging.
2. Stage only files belonging to the requested work. Never absorb unrelated user changes.
3. Split changes into logical groups and create one clear commit per group. Use concise imperative commit subjects.
4. Run the appropriate completion checks before the final commit.
5. If the current branch is not `main`, populate a root `PR.md` with the current branch's title, summary, logical change groups, and verification performed. If an existing `PR.md` describes different changes, delete it and recreate it for the current work; otherwise update it in place. Include `PR.md` in the appropriate logical commit.
6. If the current branch is `main`, do not create `PR.md` solely for the commit request.
7. Report the created commit hashes. Do not push or open a remote pull request unless the user explicitly asks.

## Safety

- Do not modify or publish portfolio content through the admin/GitHub path unless explicitly requested.
- Do not weaken authentication, content validation, upload limits, or managed-path checks.
- Never commit `.env*`, tokens, credentials, generated build output, or Serena local cache files.
- Preserve unrelated work and avoid destructive Git commands.
