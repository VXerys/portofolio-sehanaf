---
name: "Motion Mobile Degradation Rules"
description: "Use when: implementing parallax, 3D tilt, scrubbed scroll animation, or any effect that needs desktop-mobile branching."
applyTo:
  - "components/sections/**/*.tsx"
  - "components/blocks/**/*.tsx"
  - "components/anim/**/*.tsx"
---
# Motion Mobile Degradation Rules

- gsap.matchMedia branching is mandatory per Rule 3 in docs/TECHNICAL_GUIDELINES.md.
- Desktop and mobile branches must define separate motion scope and cleanup behavior.
- Mobile branch removes heavy parallax and 3D tilt and falls back to transform plus opacity-safe reveals.
- Always revert matchMedia listeners on cleanup to avoid stale triggers across resize boundaries.
- Keep breakpoints aligned with documented mobile and tablet and desktop thresholds in Rule 3.
