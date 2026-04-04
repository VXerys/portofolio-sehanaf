---
name: "Motion Performance Gate Rules"
description: "Use when: reviewing or shipping animation-heavy components, ScrollTrigger timelines, or smooth-scroll interactions."
applyTo:
  - "components/sections/**/*.tsx"
  - "components/blocks/**/*.tsx"
  - "components/anim/**/*.tsx"
---
# Motion Performance Gate Rules

- Treat Rule 6 in docs/TECHNICAL_GUIDELINES.md as a merge gate for all motion work.
- Animate transform and opacity paths only for frequent motion surfaces.
- Ensure triggers start when elements enter viewport and avoid early offscreen animation execution.
- Validate mobile simplification branch before ship to prevent budget-device frame collapse.
- Confirm Lenis and ScrollTrigger synchronization after timeline changes.
