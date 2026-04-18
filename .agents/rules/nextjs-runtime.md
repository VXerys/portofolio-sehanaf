---
trigger: model_decision
---

# Next.js Runtime & Performance Rules

Rules for Implementing App Router pages/layouts, Server vs Client component boundaries, caching, and loading behavior.

## Context & Triggers

- **When**: Creating or editing files in `app/**/*`, `components/sections/**/*`, or shared layouts.
- **Why**: To maintain a high-performance portfolio with strict RSC (React Server Component) architecture and efficient caching.

---

## 1. RSC-First Architecture

- **Rule of Thumb**: Route shells, layout composition, and primary data orchestration MUST stay in Server Components.
- **Data Flow**: Fetch data in Server Components, then pass _serializable_ props to Client Components.
- **Client Boundaries**: Client Components (`'use client'`) should only own interaction, state-heavy UI, and motion logic.

## 2. Fetching & Hydration

- **No Client Fetching**: Do not use client-side `useEffect` for primary portfolio data. Use `async/await` in RSC.
- **Waterfall Prevention**: Use `Promise.all` for parallel server fetches in multi-section pages.
- **Parallel Fetching**: Section composition in segments should prefer parallel fetches to minimize Time to First Byte (TTFB).

## 3. Caching & Revalidation

- **Caching Strategy**: Use explicit revalidation windows or cached query wrappers (`unstable_cache` if appropriate).
- **Tag-Based Invalidation**: Use stable tags for portfolio datasets to ensure predictable manual revalidation.
- **Invalidation Ownership**: On-demand invalidation must be server-side. Never replace it with client refetch loops.

## 4. Route Segment Behavior

- **Error Handling**: Implement segment-level `loading.tsx` and `not-found.tsx`. Avoid using client-side fallback redirects (e.g., `router.push` in a `useEffect`).
- **Static Params**: For dynamic routes (`[slug]`), use `generateStaticParams()` with typed query functions. Keep this logic in Server Components.
- **Docs First**: For framework API changes (e.g., Next.js 15+ changes), consult `node_modules/next/dist/docs` before implementation.

---

## Meticulous Checklist

- [ ] Is this page/layout using RSC for data fetching?
- [ ] Are props passed to Client Components serializable?
- [ ] Did I implement `loading.tsx` for async segments?
- [ ] Are multiple queries wrapped in `Promise.all`?
- [ ] Is there an explicit revalidation strategy defined?
- [ ] Did I avoid `router.push('/404')` in favor of `notFound()` from `next/navigation`?
