---
name: "Supabase Data and Typing Rules"
description: "Use when: editing Supabase clients, query functions, generated types, domain interfaces, and server-side data access patterns."
applyTo:
  - "lib/supabase/**/*.ts"
  - "types/**/*.ts"
  - "app/**/*.tsx"
---
# Supabase Data and Typing Rules

- Centralize query functions in lib/supabase/queries.ts.
- Keep explicit return types for all query functions and typed projections for partial selects.
- Use the server client for Server Component data fetching by default.
- Keep TypeScript strict and avoid any in data contracts and query helpers.
- Keep generated Supabase types and domain interfaces synchronized after schema changes.
- Portfolio read paths remain server-first; do not move primary reads to client useEffect fetches.
- Prefer Promise.all in Server Components for independent queries to avoid waterfalls.
- Never expose service role secrets to client paths.
