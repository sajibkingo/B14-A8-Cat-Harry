<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# cat-harry (StudioSpace)

Next.js 16.4.5 App Router, plain JavaScript (no TypeScript), `src/` directory, single package (no monorepo). Import alias `@/*` → `src/*` (`jsconfig.json`). Use **npm** (`package-lock.json` is the only lockfile) — ignore `README.md`, which is untouched create-next-app boilerplate.

## Commands

- `npm run dev` — Turbopack dev server (Next 16 defaults to Turbopack for dev *and* build; `--webpack` opts out). Also (re)writes the agent-rules block above in this file — don't delete it from diffs.
- `npm run lint` — bare `eslint`, flat config (`eslint-config-next/core-web-vitals`). Exits 0 with 8 pre-existing warnings (6 `no-img-element`, 2 `exhaustive-deps` in `my-bookings`/`my-listings`) — don't treat those as your regression; only fix what you introduced unless asked. Note `react-hooks/set-state-in-effect` (react-hooks v6, an **error** by default) flags *any* function that calls `setState` — even one only reached after `await` — when it's invoked directly inside `useEffect`. Load data through a local `async function` declared in the effect (see `my-bookings`/`my-listings`); don't call component-scope fetch helpers straight from the effect.
- `npm run build` — passes (verified): all 12 pages prerender; `/`, `/studios`, `/studios/[id]`, `/studios/edit/[id]` come out ◐ Partial Prerender. If it regresses with `CLIENT_HOOK_DYNAMIC` or sync-IO prerender errors, see the cacheComponents section below; full stacks: `npx next build --debug-prerender`.
- No test runner, no typecheck script, no CI — don't invent `npm test`.

## cacheComponents gotchas (previously cost an hour)

`next.config.mjs` sets `cacheComponents: true` (also `partialPrefetching`, `reactCompiler` — React Compiler is on, so skip manual memoization). Prerender **hard-fails** on dynamic values rendered outside a `<Suspense>` boundary: uncached `fetch(..., { cache: "no-store" })`, `new Date()` / `Date.now()` / `Math.random()` (including inside libraries), and client hooks (`usePathname`, `useSearchParams`, `useSession`) executed during SSR.

- Fixes, in preference order: wrap the offending part in `<Suspense>` (streams), cache it with `"use cache"`, or last resort `export const instant = false` (blocking route — works for client-hook errors but **not** for `new Date()`-style sync IO, which only Suspense/`"use cache"` clear).
- `Navbar` in `src/app/layout.js` is wrapped in `<Suspense>` for exactly this reason: its `usePathname()` value isn't known at build time for dynamic-segment routes, and removing the boundary makes `next build` fail on `/studios/[id]` (this cost an hour once). Keep it; any new dynamic value outside a boundary gets the same failure.
- Next's bundled docs in `node_modules/next/dist/docs/` are the source of truth for this version's behavior — read them before fighting the framework.

## Architecture

- Routes: `/`, `/login`, `/register`, `/studios`, `/studios/[id]`, `/studios/edit/[id]`, `/add-studio`, `/my-listings`, `/my-bookings`, plus `loading.jsx` / `not-found.jsx`. Root layout `src/app/layout.js` mounts react-hot-toast `<Toaster>`, `Navbar`, `Footer`, and sets `data-theme="dark"`.
- **Two separate backends** — don't conflate them:
  - *better-auth → MongoDB* (session/login): server config `src/lib/auth.js` using better-auth's built-in `mongodbAdapter` from `better-auth/adapters/mongodb`, database `Cat-Harry` (the installed `@better-auth/mongo-adapter` package is **unused**); client `src/lib/auth-client.js` exports `signIn`, `signUp`, `useSession`, `signOut`; catch-all route `src/app/api/auth/[...all]/route.js`.
  - *External REST API, not in this repo* at `NEXT_PUBLIC_API_URL` (default `http://localhost:5000/api`): all studio/booking CRUD, called directly from `"use client"` pages. Locally, empty/failing data is expected — pages render fallback UI. Navbar logout POSTs `/auth/logout` on this API **and** calls better-auth `signOut()`.
- Auth-gated pages (`add-studio`, `my-listings`, `my-bookings`, `studios/edit/[id]`) wrap their content in `<PrivateRoute>` (`src/components/PrivateRoute.jsx`) — a **client-side** redirect to `/login` only; there is no server-side protection.
- Dead duplicate: `src/app/EmptyState.jsx` is unused; the real component is `src/components/EmptyState.jsx` (all imports use `@/components/...`).

## Environment

- Env file is `.env` (matched by `.env*` in `.gitignore` — never committed; a fresh clone has none). Keys read by code:
  - `MONGO_URI` — **required at runtime**; `src/lib/auth.js` throws at module scope when unset, so any import of it (e.g. the `/api/auth/*` route, and `next build`'s page-data collection) fails.
  - `NEXT_PUBLIC_API_URL` — **not present in `.env`**; code falls back to `http://localhost:5000/api`.
  - `NEXT_PUBLIC_IMGBB_API_KEY` — read by `add-studio` for image upload; not in `.env`, code uses a hardcoded fallback key.
  - `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` — optional, hardcoded fallbacks in `src/lib/auth.js`.
  - `NEXT_PUBLIC_APP_URL` exists in `.env` but is unused; the auth client `baseURL` is hardcoded to `http://localhost:3000` in `src/lib/auth-client.js` — serving the app on another origin will break auth calls until that changes.

## Styling & UI

- Tailwind **v4** + daisyUI 5, CSS-first — there is no `tailwind.config.*`. `src/app/globals.css` is just `@import "tailwindcss"; @plugin "daisyui";`, and Tailwind is wired in as a Turbopack loader rule under `turbopack.rules` in `next.config.mjs`. Don't move it to a PostCSS/webpack setup.
- Theme = daisyUI `data-theme` on `<html>` (default `dark`); `src/components/ThemeToggle.jsx` toggles it and persists to localStorage key `studiospace-theme`.
- Toasts: use `react-hot-toast` (`<Toaster>` is already mounted in the root layout). `react-toastify` is installed but unused — don't introduce it.
