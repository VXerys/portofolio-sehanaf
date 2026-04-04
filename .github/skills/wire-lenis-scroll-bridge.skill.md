---
name: "wire-lenis-scroll-bridge"
description: "Use when: configuring Lenis provider setup and synchronizing Lenis with GSAP ScrollTrigger in App Router."
---
# wire-lenis-scroll-bridge

## Purpose and Trigger

Call this skill when adding or changing global smooth-scroll behavior.
Expected result: SSR-safe Lenis setup, synchronized scroll state, and reliable teardown.

## Primary Executor Agent

Lenis Scroll Systems Engineer

## Workflow

1. Implement or update a client-only Lenis provider and mount it from root layout.
2. Initialize Lenis inside lifecycle-safe client code only.
3. Link Lenis scroll events to ScrollTrigger updates.
4. Bridge Lenis RAF through GSAP ticker in a single shared timing loop.
5. On cleanup, destroy Lenis instance and remove ticker callbacks to prevent leaks.
