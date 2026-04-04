---
name: "Next Route Segment Behavior Rules"
description: "Use when: adding or editing App Router route segments, dynamic route pages, loading states, and not-found behavior."
applyTo:
  - "app/**/page.tsx"
  - "app/**/layout.tsx"
  - "app/**/loading.tsx"
  - "app/**/not-found.tsx"
  - "app/**/[slug]/**/*.tsx"
---
# Next Route Segment Behavior Rules

- Keep route composition RSC-first per Rule 5 in docs/TECHNICAL_GUIDELINES.md.
- Dynamic route params and data retrieval logic stay in Server Components, not client islands.
- Route segments that can miss data must use not-found behavior instead of client fallback redirects.
- Use loading boundaries for segment-level async states and avoid pushing primary fetch logic into client useEffect.
- Prefer parallel server fetch composition with Promise.all for multi-section pages (Rule 6 checklist).
