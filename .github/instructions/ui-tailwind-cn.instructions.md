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
- Use DaisyUI semantic tokens from app/globals.css as the canonical theme source for slicing states, for example bg-base-100, text-base-content, text-primary, and border-base-300.
- Avoid hardcoded hex palette classes when semantic DaisyUI tokens already cover the UI intent.
- Typography default must use Maghfirea for display/headings and Inter for body/secondary text through theme variables, not random font-family overrides.
- Extend base shadcn primitives through wrappers when customization is needed.
- Keep responsive behavior explicit for mobile, tablet, and desktop states.
- Avoid mixing data-fetching logic into presentational components.
