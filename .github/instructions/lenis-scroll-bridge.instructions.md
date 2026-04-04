---
name: "Lenis Scroll Bridge Rules"
description: "Use when: adding or changing Lenis provider setup, GSAP ticker integration, or ScrollTrigger synchronization logic."
applyTo:
  - "components/anim/lenis-provider.tsx"
  - "components/anim/**/*.tsx"
  - "app/layout.tsx"
---
# Lenis Scroll Bridge Rules

- Lenis initialization is client-only and must run in lifecycle-safe hooks per Rule 2 in docs/TECHNICAL_GUIDELINES.md.
- Keep ScrollTrigger synchronized through Lenis scroll updates so animation triggers track smooth scroll state.
- Drive Lenis RAF via GSAP ticker bridge and tear down both Lenis and ticker callbacks on unmount.
- Do not introduce parallel RAF loops that compete with the shared Lenis plus GSAP timing system.
- Any provider edit must preserve SSR safety and App Router server layout compatibility.
