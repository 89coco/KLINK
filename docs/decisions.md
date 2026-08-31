# Decisions

Newest first. One short entry each: what we chose, and why.

## Made the repo public, and kept the PRD out of it

2026-08-31. GitHub's branch protection (classic rules and the newer Rulesets) isn't
enforced on a *private* repo without a paid Team/Enterprise organization plan. To get
real "no direct pushes to main" enforcement for free, we made the repo public instead.
`klink-prd.md` (business plan details, feature roadmap, pricing thinking) was removed
from git history entirely (via `git filter-repo` + force-push, done before anyone but
Carolin had cloned the repo) and is now `.gitignore`d - it lives locally and gets
shared directly, never pushed. If a screen needs product-spec context and the file
isn't present locally, ask the human for a copy rather than guessing.

## Pinned Expo to SDK 54, not the newest (57)

2026-08-31. Scaffolding started on SDK 57 (the default for new projects), but the
Expo Go build supporting SDK 57 was still in App Store/Play Store review - Carolin's
installed Expo Go only supported SDK 54. Rather than block on an app-store review
queue, we downgraded the project to SDK 54 to match. Bump back up once both people's
Expo Go apps support a newer SDK (check: Expo Go → Profile tab, on both phones,
before bumping) - see `CLAUDE.md` → "Keeping the Expo SDK in sync."

Side effect of the downgrade: `expo-image`, `expo-status-bar` and `expo-web-browser`
were removed from the `plugins` array in `app.json`. On this Node version (24), Expo's
config-plugin resolver hits a real upstream bug
(`ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING` / `expo/expo#37633`) when it tries to
probe a package for a config plugin it doesn't actually have. None of the three needed
one for Expo Go use - they still work as normal JS imports. Revisit if a real native
build (`expo prebuild`) ever needs one of them configured.

## Chose NativeWind for styling

2026-08-31. The PRD's design system reserves specific colors for specific meanings
(ember for the tap ritual, moss for money, slate for shared/social - PRD §5.3, §10).
NativeWind (Tailwind for React Native) lets us define those as named tokens once in
`tailwind.config.js` and reuse them everywhere, instead of restating color values
per-component and risking drift. The actual color values in `tailwind.config.js` are
placeholders - not final until settled with David against the design system
storyboard.

## Chose Expo (React Native + TypeScript + expo-router)

2026-08-31. Klink is mobile-first, but the PRD leaves the door open to a web version
later. Expo gives one codebase that already runs on iOS, Android, and web, so that
door stays open without a rewrite. expo-router gives file-based routing - a file in
`src/app/` is a screen - which keeps the mental model close to Next.js if the project
ever needs it.
