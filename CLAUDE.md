@AGENTS.md

# Klink

Klink is a mobile-first habit-tracking app built around one ritual: **tap to log** a
habit and watch a streak grow. The whole product is engineered around the
cue → craving → response → reward loop — every screen makes the cue obvious, the
ritual attractive and easy, and the payoff satisfying, with or without money involved.
MVP is solo habit-building only (gym, reading, meditation); shared habits and money
incentives exist as opt-in toggles that never gate or compete with the core loop. No
hardware, no real bank connection in this release — see the PRD for full scope.

Two people work on this repo: Carolin Donata Schmidt and David Kunz (GitHub:
schmededemann). Both are learning git, so explain what you are doing when you touch
branches, commits or PRs rather than just doing it.

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| App | Expo (React Native) + TypeScript, **SDK 54** | One codebase runs on iOS, Android **and** web. Pinned to SDK 54 to match the team's Expo Go app — see docs/decisions.md before bumping it. |
| Routing | expo-router (v6, matches SDK 54) | File-based routes - a file in `src/app/` is a screen. |
| Styling | NativeWind (Tailwind for React Native) | Lets us define design tokens once (`tailwind.config.js`) and reuse them everywhere, matching the PRD's "one signal per meaning" rule. **Color values (`ember`, `moss`, `slate`) are placeholders — not final.** They need to be settled with David against the design system storyboard before they're treated as real. |
| Data | None yet | Add a backend only when a screen genuinely needs saved or shared data. See "Adding a backend" below. |

**Mobile-first is a real constraint, not a preference.** Design for a phone screen and
touch first. Check the web build still renders before merging, but never let the web
layout drive a mobile decision.

## Repo structure

```
src/app/          # Screens. One file = one route (expo-router)
src/components/    # Reusable UI. Anything used on 2+ screens lives here
src/hooks/         # Reusable logic hooks
src/constants/     # Theme tokens (spacing, layout) - color tokens live in tailwind.config.js
assets/            # Images, fonts, icons
```

No `lib/` yet. Add it for non-UI logic (streak math, formatting, API calls) the first
time a piece of business logic needs a home outside a component.

Keep this section accurate. If you add a top-level folder, add its row in the same commit.

## Keeping the Expo SDK in sync

Both people's Expo Go app can only open a project on the SDK version it supports
(check: Expo Go → Profile tab). A mismatch here blocks the other person from testing
entirely - it already cost a full afternoon once. Before bumping the `expo` package
version, both people check their Expo Go's supported SDK and only upgrade to a version
both support. Currently pinned to **SDK 54** - see docs/decisions.md.

## Before starting any task

1. **Read the task** - work comes from GitHub Issues in this repo. If no issue exists,
   ask whether to create one before writing code.
2. **Start on a fresh branch off the latest `main`** (see Git workflow).
3. **UI work needs clarification first.** Before building any new screen or component,
   list the design decisions you are about to make and get an answer. Do not guess a
   layout, a colour, or a piece of copy and build it - a wrong guess costs a rebuild.
   This especially applies to color - the design system is not finalized yet.
4. **Check what already exists** before writing a new component. Search
   `src/components/` first; extending an existing one beats adding a near-duplicate.

## Git workflow

`main` is the only long-lived branch, and it must always run. Nobody pushes to it directly.

1. `git checkout main && git pull` - start from what is already there.
2. `git checkout -b <type>/<short-description>` - e.g. `feat/signup-screen`, `fix/keyboard-covers-input`.
   Types: `feat`, `fix`, `chore`, `docs`.
3. Commit as you go. One commit per coherent change, present tense: "add signup screen",
   not "added stuff".
4. `git push -u origin <branch>` then open a Pull Request.
5. The other person looks at it, then it gets **squash-merged** into `main`.
6. `git checkout main && git pull` before starting the next thing.

**Rules that matter:**

- Never commit directly to `main`.
- Never commit a `.env` file, an API key, or a password. If one is needed, add its name
  to `.env.example` with a blank value and tell the human to fill in their own copy.
- If both people touched the same files, the second PR pulls `main` in and resolves the
  conflict on its own branch - never on `main`.
- Never merge a PR on the human's behalf. Open it, say it is ready, and stop.

## Code standards

| Thing | Target | Split it by |
| --- | --- | --- |
| Screen / component file | 150 lines | 300 lines |
| Logic module in `src/lib/` | 100 lines | 200 lines |
| Test file | 300 lines | 500 lines |

These are a habit to apply while you are already in a file, not a queue of work to go
and do. A split invented purely to satisfy a number makes the code worse.

- **Tests sit beside their source**: `formatDate.test.ts` next to `formatDate.ts`. No
  test runner is installed yet - add one (e.g. Jest) the first time a test is written.
- **Validate anything typed by a user or returned by a network call** before trusting it.
- **Name things for what they are** in this app's language, not generic
  (`HabitCard`, not `ListItem`).

## Found a problem while doing something else?

It takes one of three exits, never a list:

1. **Fix it now** if writing it up would cost more than fixing it.
2. **A GitHub Issue with a trigger in the title** - "when we next touch the signup flow",
   "before the first real user". No trigger means it is a wish, not a task.
3. **Drop it deliberately**, and say so in the PR description so the decision is findable later.

**Explaining _why_ code is the way it is is not an issue - it is a comment in that file**,
where the next person hits it whether or not they went looking.

## Adding a backend

Not yet. When a screen needs data that must survive a reload or be seen by another
person, that is the trigger - and the answer is a hosted database (Supabase free tier),
never one running on someone's laptop, because a laptop database cannot be shared
between two developers.

When that day comes, this file gains: how auth works, where the schema lives, and the
rule that **every query is scoped to the signed-in user**. Do not add user accounts
without adding that rule at the same time.

## Commands

```bash
npm install         # Install dependencies
npx expo start       # Run the app - scan the QR code with Expo Go on a phone
npm run web          # Run in a browser
npx tsc --noEmit     # Type-check without building
npm run lint         # Lint
```

## Docs

| File | What it holds |
| --- | --- |
| `README.md` | How a new person gets the app running on their machine |
| `docs/decisions.md` | Choices we made and why, newest first - one short entry each |
| `klink-prd.md` | Product requirements (draft v0.1 - being refined with David). **Not in git** - it's business-sensitive and this repo is public. It's git-ignored; if it's missing from your checkout, ask the human for a copy rather than recreating it from memory. |
