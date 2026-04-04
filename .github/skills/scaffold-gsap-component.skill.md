---
name: "scaffold-gsap-component"
description: "Use when: building a GSAP-enabled Client component with useGSAP lifecycle, SSR-safe setup, and portfolio performance constraints."
---

# scaffold-gsap-component

## Purpose and Trigger

Call this skill when adding GSAP animation to a section or component.
Expected result: animation is isolated in a Client component, cleaned up correctly, and follows portfolio-md motion rules.

## Primary Executor Agent

- GSAP Motion Engineer

## Workflow

1. Read .github/instructions/portofolio-md/TECHNICAL_GUIDELINES.md Rule 1 to enforce gsap.matchMedia and desktop-mobile branching.
2. Keep animation code in a "use client" component and use useGSAP with a local scope root to avoid leaking selectors.
3. Build timelines with labels and explicit targets only and avoid global selectors and redundant ScrollTrigger instances.
4. Ensure teardown kills timelines and ScrollTrigger bindings on unmount to prevent memory leaks.
5. Add reduced-motion and low-end fallback behavior so heavy effects degrade gracefully on mobile.
