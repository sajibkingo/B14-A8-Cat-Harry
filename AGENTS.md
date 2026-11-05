<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# cat-harry (StudioSpace)

Next.js 16.4.5 App Router, plain JavaScript (no TypeScript), `src/` directory, single package (no monorepo/workspace). Import alias `@/*` → `src/*` (`jsconfig.json`).

## Commands

- `npm run dev` — Turbopack dev server (Next 16 uses Turbopack by default for dev *and* build; `--webpack` opts out). Also (re)writes the agent-rules block above in this file.
- `npm run lint` — bare `eslint` against the flat config (`eslint-config-next/core-web-vitals`). Clean except 3 pre-existing `no-img-element` warnings (`HostGuarantee`, `Navbar`, `StudioCard`).
- `npm run build` — passes; `/` shows as ◐ Partial Prerender (static shell + streamed dynamic content).
- There is no test runner and no typecheck script. Don't invent `npm test`.

## cacheComponents gotchas (bit us once, cost an hour)

`next.config.mjs` sets `cacheComponents: true`: the prerender **hard-fails** on any sync IO outside a `<Suspense>` boundary — uncached `fetch(..., { cache: "no-store" })`, plus `new Date()` / `Date.now()` / `Math.random()` anywhere (including inside libraries). Two places already solved by wrapping in `<Suspense>` in `src/app/page.js`:
- `<HeroSlider />` — swiper-react constructs `new Swiper()` **in its render body**, and Swiper's autoplay/core read `new Date()` during SSR.
- `<FeaturedStudios />` — uncached fetch of the external `:5000` API.

If you add another: wrap that part in `<Suspense>` (preferred), cache with `"use cache"`, or last resort `export const instant = false`. Note `instant = false` does **not** clear `new Date()`-style sync IO errors — only Suspense/`"use cache"` do. Debug with `npx next build --debug-prerender` for full component stacks.

## Architecture

- Entry points: `src/app/layout.js` (root layout: `Navbar` + react-hot-toast `<Toaster>`), `src/app/page.js` (home), `src/app/api/auth/[...all]/route.js` (better-auth catch-all). Existing routes: `/`, `/login`, `/register` — `Navbar` links to `/studios` and home links `/add-studio`, but those routes don't exist yet.
- Auth is [better-auth](https://www.better-auth.com): server config in `src/lib/auth.js`, client in `src/lib/auth-client.js` (exports `signIn`, `signUp`, `useSession`, `signOut` from `better-auth/react`). Adapter is better-auth's built-in `mongodbAdapter` (not `@better-auth/mongo-adapter`), storing users in MongoDB database `Cat-Harry`. Session is consumed via `useSession()` in `src/components/Navbar.jsx`.
- Featured studios come from an **external backend not in this repo**: `src/app/page.js` fetches `${NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/studios?limit=6` and swallows failures, rendering a "No featured studios found" fallback. An empty featured section locally is expected unless something serves that API.

## Environment

- Env file is `.env` (matched by `.env*` in `.gitignore` — never committed; a fresh clone has none). Keys read by code:
  - `MONGO_URI` — **required at runtime**; `src/lib/auth.js` throws at module scope when unset, so any import of it (e.g. the `/api/auth/*` route) fails.
  - `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` — optional, hardcoded fallbacks in `src/lib/auth.js`.
  - `NEXT_PUBLIC_API_URL` — optional, falls back to `http://localhost:5000/api`.
  - `NEXT_PUBLIC_APP_URL` exists in `.env` but is currently unused; the auth client `baseURL` is hardcoded to `http://localhost:3000` in `src/lib/auth-client.js` — serving the app on another origin will break auth calls until that changes.

## Styling & UI

- Tailwind **v4** + daisyUI 5, CSS-first — there is no `tailwind.config.*`. `src/app/globals.css` is just `@import "tailwindcss"; @plugin "daisyui";`, and Tailwind is wired in as a Turbopack loader rule under `turbopack.rules` in `next.config.mjs`. Don't move it to a PostCSS/webpack setup.
- Theme = daisyUI `data-theme` on `<html>` (default `dark`); `src/components/ThemeToggle.jsx` toggles it and persists to localStorage key `studiospace-theme`.
- Toasts: use `react-hot-toast` (`<Toaster>` is already mounted in the root layout). `react-toastify` is installed but unused — don't introduce it.
