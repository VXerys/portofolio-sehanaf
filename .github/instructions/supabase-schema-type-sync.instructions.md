---
name: "Supabase Schema and Type Sync Rules"
description: "Use when: schema shape changes, generated Supabase types update, or domain interfaces and query signatures are revised."
applyTo:
  - "types/**/*.ts"
  - "lib/supabase/**/*.ts"
  - "docs/DATABASE.md"
---
# Supabase Schema and Type Sync Rules

- Keep generated Supabase types and domain interfaces synchronized per Rule 6 TypeScript constraints in docs/TECHNICAL_GUIDELINES.md.
- Schema updates must be followed by type regeneration before new query logic lands.
- Query return types must be updated in the same change set as schema-driven interface changes.
- Avoid any-based temporary bridges during schema migrations.
- Preserve Rule 5 server-first fetch boundaries while refactoring types.
