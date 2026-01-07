# Copilot / AI Agent Instructions for firechat-2025 🔧

Purpose: short, actionable notes to help an AI code agent become productive in this repository quickly.

## Quick summary
- Tech stack: React + TypeScript + Vite + Tailwind CSS. Firebase (modular v9) via reactfire. Form validation uses Zod + react-hook-form. ESLint for linting.
- Entry points: `src/main.tsx` (providers), `src/App.tsx` (routes + layouts).
- Important directories: `src/components`, `src/hooks`, `src/pages`, `src/config`, `src/lib`, `src/schemas`.

## How to run
- Dev server: `npm run dev` (vite)
- Build: `npm run build` (will run `tsc -b` then `vite build`)
- Preview: `npm run preview`
- Lint: `npm run lint`

## Environment / Secrets
- Firebase config is read from environment variables and exported from `src/config/firebase.ts`.
  - Required env keys (Vite): VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID, VITE_FIREBASE_STORAGE_BUCKET, VITE_FIREBASE_MESSAGING_SENDER_ID, VITE_FIREBASE_APP_ID
  - Put them in `.env.local` or similar; access via `import.meta.env.VITE_*`.

## Providers & app wiring
- App root wraps providers in `src/main.tsx`:
  - `<FirebaseAppProvider firebaseConfig={firebaseConfig}>` (reactfire)
  - `<FirebaseServices>` (src/config/firebase.services.tsx) which returns nested `AuthProvider`, `FirestoreProvider`, `StorageProvider` using the initialized SDKs
  - `<BrowserRouter>` and then `<App />`
- Use the provided reactfire providers and hooks (`useAuth`, `useUser`, `useFirestore`, `useFirestoreCollectionData`, `useFirestoreDocData`) instead of manually re-initializing SDKs.

## Data model & Firestore collections
- Schemas: `src/schemas/*.ts` (e.g. `room.schema.ts`, `user.schema.ts`, `task.schema.ts`). Follow the shapes defined there.
- Main collections observed:
  - `users` — stored by uid (see `use-user-actions.ts`)
  - `rooms` — top-level rooms (see `use-room-actions.ts`)
  - `rooms/{roomId}/messages` — messages collection inside a room (see `use-messages-actions.ts`)
  - `tasks` — task data (see `use-task-actions.ts`)

Important note: watch field naming consistency — the Room schema uses `lastMessage` (camelCase), but some code updates `LastMessage` (capitalized) — prefer `lastMessage` to match schema and UI usage.

## Hooks & conventions
- Async data access typically lives in `src/hooks` with names like `useAuthActions`, `UseRoomActions`, `useMessagesActions`, `useTaskActions`. They usually:
  - Use `useFirestore` + `useFirestoreCollectionData` or `useFirestoreDocData`
  - Return a small API object (data + action functions) and sometimes `loading` booleans or `{ success, error }` objects (see `use-auth-actions.ts`)
- Many hooks enable `suspense: true` when using `useFirestoreCollectionData`; components consuming those hooks must be wrapped with `<Suspense fallback={...}>` (see `src/pages/admin/chat.page.tsx`).

## Forms & validation
- Zod schemas live in `src/lib/zod.schemas.ts` and are used with `react-hook-form` + `zodResolver` (see `src/pages/auth/*.tsx`, `src/components/*/form-*.tsx`).
- UI form primitives are in `src/components/ui/form.tsx` (exposes `Form`, `FormField`, `FormLabel`, `FormControl`, `FormMessage`, etc.). Use these to keep consistent styling and accessibility.

## Coding & project conventions
- Path alias `@/*` maps to `src/*` (see `tsconfig.json`) — prefer `@/` imports.
- Use `cn(...)` utility in `src/lib/utils.ts` for class name composition and `tailwind-merge` behavior.
- UI: Tailwind utility classes are used pervasively; components accept `className` props and compose them using `cn`.
- Routes & layouts: `src/App.tsx` organizes routes into `PublicLayout`, `AuthLayout`, `AdminLayout` (admin pages are under `/admin`). Start debugging from `App.tsx` when routing issues appear.

## Debugging tips / gotchas
- Suspense errors: if a component using `useFirestoreCollectionData(..., { suspense: true })` is not wrapped with `<Suspense>`, it will throw — add `<Suspense fallback={'...'}>` at the page level.
- Be cautious about field name mismatches (`lastMessage` vs `LastMessage`). Fixing capitalization may require updating consumers and tests.
- Auth: registration flow updates Firebase Auth profile then calls `createOrUpdateUser` (see `src/hooks/use-auth-actions.ts`). Tests or fixes that touch signup should keep this sequence.
- Some code and comments are in Spanish — read nearby comments to understand intent and messages.

## Good starting tasks for a new contributor or agent
1. Add a `lastMessage` fix: unify update in `useMessagesActions` to update `lastMessage` (not `LastMessage`), ensure UI still reads `lastMessage`.
2. Add small unit/integration tests around `UseRoomActions.findOrCreateRoom` and `useMessagesActions.sendMessage` (currently no tests present).
3. Improve typings for hook return values (many return anonymous objects with `success`/`message` — consider explicit types).

---
If anything here looks off or you want more detail (tests, coding standards, or an expanded contributor checklist), tell me which area to expand and I will iterate. ✅
