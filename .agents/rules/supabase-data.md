---
trigger: model_decision
---

# Supabase Data & Type Safety Rules

Rules for editing Supabase clients, query functions, generated types, domain interfaces, and server-side data access patterns.

## Context & Triggers

- **When**: Editing `lib/supabase/**/*.ts`, `types/**/*.ts`, or performing data fetching in `app/**/*.tsx`.
- **Why**: To ensure absolute type safety, security (RLS), and performance in portfolio data paths.

---

## 1. Centralization & Pattern

- **Query Hub**: ALL Supabase query functions MUST be centralized in `lib/supabase/queries.ts`.
- **Explicit Types**: Always define explicit return types for query functions. Use typed projections for partial selects to avoid `any` or loose objects.
- **Server-First**: Portfolio read paths MUST remain server-first. Do not use client-side `useEffect` for primary data fetching unless it's for user-specific interactive data.

## 2. Server vs Client Boundaries

- **Default Client**: Use the server client (`createClient` from `@/lib/supabase/server`) for Server Component data fetching.
- **Secret Safety**: NEVER expose service role secrets (`SUPABASE_SERVICE_ROLE_KEY`) to client-side paths or public environment variables.
- **RLS Bypassing**: Do not bypass RLS policies with privileged client mutations. Public read behavior must rely strictly on RLS posture.

## 3. Performance & Caching

- **Waterfall Prevention**: Use `Promise.all` in Server Components for independent queries.
- **Stable Keys**: Keep cache keys and tags stable for portfolio datasets.
- **No Client Loops**: On-demand cache invalidation must be server-side. Avoid client-side refetch loops.

## 4. Type Synchronization

- **Strict Sync**: Generated Supabase types and domain interfaces MUST be synchronized after any schema changes.
- **Regeneration First**: Run type regeneration BEFORE landing new query logic if the schema has changed.
- **No Temporary Bridges**: Avoid using `any` as a temporary bridge during schema migrations.

---

## Meticulous Checklist

- [ ] Are query functions centralized in `queries.ts`?
- [ ] Is `createClient` from `@/lib/supabase/server` used for RSC?
- [ ] Are there any service role keys in client components?
- [ ] Did I use `Promise.all` for parallel queries?
- [ ] are return types explicitly defined?
