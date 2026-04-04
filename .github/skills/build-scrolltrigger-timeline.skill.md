---
name: "build-scrolltrigger-timeline"
description: "Use when: implementing a ScrollTrigger timeline with strict desktop-mobile branching, cleanup, and motion performance gate."
---

# build-scrolltrigger-timeline

## Purpose and Trigger

Call this skill when orchestrating scroll-synced animation.
Expected result: timeline performs well, trigger lifecycle is stable, and mobile fallback is explicit.

## Primary Executor Agent

- GSAP Motion Engineer

## Workflow

1. Read .github/instructions/portofolio-md/TECHNICAL_GUIDELINES.md Rule 1, Rule 3, and Rule 6 before composing the timeline.
2. Define timeline intent first: enter, scrub, pin, or sequence; then map start and end boundaries with predictable trigger anchors.
3. Implement timeline in useGSAP scope and split desktop-mobile behavior with gsap.matchMedia.
4. Keep ScrollTrigger lifecycle clean by killing triggers on teardown and refreshing after measured layout shifts only.
5. Run a motion performance gate: throttle expensive effects on mobile and disable non-essential scrubbing where frame drops appear.
