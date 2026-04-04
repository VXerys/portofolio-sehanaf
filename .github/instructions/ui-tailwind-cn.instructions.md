---
name: "UI Tailwind and cn Rules"
description: "Use when: building UI sections/components, composing Tailwind classes, extending shadcn components, and maintaining responsive accessibility-safe styling."
applyTo:
  - "app/**/*.tsx"
  - "components/**/*.tsx"
  - "app/globals.css"
---
# UI Tailwind and cn Rules

- Use cn for dynamic class composition to avoid Tailwind utility conflicts.
- Do not use raw template-string class interpolation for variant logic.
- Keep reusable component APIs typed and minimal.
- Preserve design token consistency and avoid random one-off values.
- Extend base shadcn primitives through wrappers when customization is needed.
- Keep responsive behavior explicit for mobile, tablet, and desktop states.
- Avoid mixing data-fetching logic into presentational components.
