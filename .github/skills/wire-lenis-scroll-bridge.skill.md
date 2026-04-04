---
name: "wire-lenis-scroll-bridge"
description: "Use when: enabling or adjusting Lenis smooth scroll provider with SSR-safe initialization and GSAP ticker synchronization."
---

# wire-lenis-scroll-bridge

## Purpose and Trigger

Call this skill when introducing Lenis or fixing scroll desync with GSAP.
Expected result: one authoritative scroll controller, stable synchronization, and no duplicate RAF loops.

## Primary Executor Agent

- Lenis Scroll Systems Engineer

## Workflow

1. Read .github/instructions/portofolio-md/TECHNICAL_GUIDELINES.md Rule 2 before touching provider or ticker wiring.
2. Place Lenis provider once at the intended shared layout boundary and keep initialization SSR-safe.
3. Bridge Lenis RAF to GSAP ticker using one integration path only, then sync ScrollTrigger updates from Lenis events.
4. Guard against duplicate Lenis instances during route transitions and hot reload cycles.
5. Validate anchor behavior, keyboard accessibility, and reduced-motion fallback to preserve usability.
