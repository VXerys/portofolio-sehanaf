---
name: "build-scrolltrigger-timeline"
description: "Use when: building or revising GSAP ScrollTrigger timelines with performance-safe start/end behavior and cleanup."
---
# build-scrolltrigger-timeline

## Purpose and Trigger

Call this skill when implementing scroll-driven animation sequences.
Expected result: stable trigger timing, low-jank animation properties, and responsive timeline behavior.

## Primary Executor Agent

GSAP Motion Engineer

## Workflow

1. Define trigger element, start/end offsets, and timeline intent before adding animation steps.
2. Animate transform and opacity paths only for frequently updated motion frames.
3. Add desktop/mobile branching with gsap.matchMedia and remove heavy motion on mobile.
4. Keep ScrollTrigger instances lifecycle-bound inside useGSAP for auto cleanup.
5. Validate trigger timing with realistic scroll flow and adjust offsets to avoid offscreen pre-activation.
