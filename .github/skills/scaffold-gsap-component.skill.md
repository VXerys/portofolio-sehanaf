---
name: "scaffold-gsap-component"
description: "Use when: integrating GSAP animation into a UI component with @gsap/react useGSAP, scoped selectors, and mobile degradation."
---
# scaffold-gsap-component

## Purpose and Trigger

Call this skill when adding GSAP animation to a section, block, or interactive component.
Expected result: lifecycle-safe animation setup with deterministic cleanup and responsive behavior.

## Primary Executor Agent

GSAP Motion Engineer

## Workflow

1. Set the component to use client only when animation is required on that component.
2. Add a container ref and initialize animations inside useGSAP from @gsap/react.
3. Scope all selectors to the container ref and keep timeline/ScrollTrigger creation inside the useGSAP callback.
4. Add gsap.matchMedia branches for desktop and mobile, with simplified mobile effects.
5. Ensure cleanup path reverts media listeners and releases trigger/timeline resources.
