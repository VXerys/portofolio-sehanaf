---
name: "Next RSC Boundary Rules"
description: "Use when: implementing App Router pages/layouts, deciding Server vs Client component boundaries, loading/not-found handling, and static params behavior."
applyTo: "{app,components/sections}/**/*.tsx"
---
# Next RSC Boundary Rules

- Keep RSC-first architecture for portfolio content. Route shells and data orchestration stay in Server Components.
- Fetch Supabase data in Server Components, then pass serializable props to Client Components.
- Client Components own interaction and motion only. Do not put primary portfolio read fetches in client code.
- Do not add client-side useEffect data fetching for portfolio read paths. Use async/await in RSC and route segments.
- Route segments that can miss data must implement loading and not-found handling instead of client fallback redirects.
- For dynamic routes, generate static params from typed query functions, not inline fetch logic in client components.
- Prefer parallel server fetches with Promise.all for section composition to avoid data waterfalls.
- For framework API choices, read relevant docs in node_modules/next/dist/docs before introducing new patterns.
