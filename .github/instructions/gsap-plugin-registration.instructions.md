---
name: "GSAP Plugin Registration Rules"
description: "Use when: registering GSAP plugins, introducing new GSAP plugin usage, or modifying shared GSAP bootstrap providers."
applyTo:
  - "components/anim/gsap-provider.tsx"
  - "components/anim/**/*.tsx"
  - "components/sections/**/*.tsx"
---
# GSAP Plugin Registration Rules

- Register GSAP plugins once at module scope as defined by Rule 1 in docs/TECHNICAL_GUIDELINES.md.
- Centralize plugin registration in shared animation provider paths to avoid duplicate registration drift.
- Never register plugins inside component bodies or inside useGSAP callbacks.
- Section-level animation code should assume provider registration is already complete and only build timelines/triggers.
- Re-check plugin usage against Rule 6 performance checklist before enabling heavyweight behavior.
