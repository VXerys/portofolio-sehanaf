---
name: "App Router Cache and Revalidation Rules"
description: "Use when: editing revalidate exports, query cache wrappers, or tag-based invalidation for portfolio data paths."
applyTo:
  - "app/**/page.tsx"
  - "app/**/[slug]/**/*.tsx"
  - "lib/supabase/queries.ts"
  - "lib/supabase/**/*.ts"
---
# App Router Cache and Revalidation Rules

- Follow Rule 5 cache strategy from docs/TECHNICAL_GUIDELINES.md: explicit revalidate windows or cached query wrappers.
- Keep cache keys and tags stable for portfolio datasets so invalidation remains predictable.
- On-demand cache invalidation must be server-side and never replaced by client refetch loops.
- Keep cache policy aligned with Rule 6 performance checklist to prevent duplicate query work and render churn.
- Validate framework-level cache API changes against node_modules/next/dist/docs before adopting new patterns.
