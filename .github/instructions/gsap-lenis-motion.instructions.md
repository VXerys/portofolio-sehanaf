---
name: "GSAP and Lenis Motion Rules"
description: "Use when: adding or editing GSAP timelines, ScrollTrigger behavior, Lenis smooth scroll integration, and responsive animation degradation on mobile."
applyTo:
  - "components/anim/**/*.tsx"
  - "components/sections/**/*.tsx"
  - "app/layout.tsx"
---
# GSAP and Lenis Motion Rules

- Absolute ban: do not set up GSAP animations with useEffect.
- Use useGSAP from @gsap/react and always scope selectors with a container ref.
- Register GSAP plugins once at module scope in a shared provider path (components/anim/gsap-provider.tsx).
- Keep ScrollTrigger and timeline setup inside useGSAP callbacks so cleanup is deterministic.
- Use gsap.matchMedia to separate desktop and mobile behavior, and always revert media listeners on cleanup.
- Mobile branch must simplify expensive effects such as parallax and heavy 3D motion.
- For Lenis, initialize client-side in a provider and keep ScrollTrigger synchronized with Lenis scroll updates.
- Lenis and GSAP ticker bridge must be paired with proper teardown (destroy Lenis and remove ticker callback).
- Favor transform and opacity for animation performance. Avoid layout-thrashing properties during motion.
