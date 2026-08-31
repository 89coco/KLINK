# Klink

A mobile-first habit-tracking app. See `klink-prd.md` (shared directly, not in this
public repo - ask Carolin or David for a copy) for the product spec, and
`CLAUDE.md` for how this repo is worked on.

## Getting it running on your machine

1. Install [Node.js](https://nodejs.org) (LTS).
2. Install the [Expo Go](https://expo.dev/go) app on your phone.
3. Clone this repo, then from inside it:

   ```bash
   npm install
   npx expo start
   ```

4. Scan the QR code that appears with your phone (Camera app on iOS, Expo Go's
   built-in scanner on Android). Make sure your phone and computer are on the same
   Wi-Fi.

**Before you start:** open Expo Go on your phone, go to its Profile tab, and check
which SDK version it supports. This project is pinned to **SDK 54** (see
`docs/decisions.md`). If your Expo Go supports a different SDK, say so before doing
any work - the mismatch will block the app from opening at all.

## Other useful commands

```bash
npm run web        # Run in a browser instead of on a phone
npx tsc --noEmit   # Type-check without building
npm run lint       # Lint
```
