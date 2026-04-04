---
name: "Agent Orchestration Auto-Selection Rules"
description: "Use when: orchestrating multi-step tasks across custom agents and automatically selecting matching instruction files and skill workflows by intent."
---

# Agent Orchestration Auto-Selection Rules

Use this instruction to make orchestration deterministic across custom agents.

## Required Flow

1. Classify the request into one primary domain before delegating work.
2. Select exactly one primary specialist agent per phase.
3. Select matching instruction packs from .github/instructions based on domain and touched files.
4. Select one or two skills from .github/skills when a reusable workflow exists.
5. If a request spans multiple domains, split into phases and repeat the same selection process per phase.
6. In every phase summary, state which agent, instructions, and skills were selected.

## Domain Routing Matrix

### Routing and RSC

- Agent: Next App Router Boundary Architect
- Instructions:
  - next-rsc-boundary.instructions.md
  - next-route-segment-behavior.instructions.md
  - app-router-cache-revalidation.instructions.md
- Skills:
  - scaffold-app-router-route.skill.md
  - scaffold-rsc-client-island.skill.md
  - add-cache-revalidation-policy.skill.md

### Motion and Scroll

- Agent: GSAP Motion Engineer or Lenis Scroll Systems Engineer
- Instructions:
  - gsap-lenis-motion.instructions.md
  - gsap-plugin-registration.instructions.md
  - lenis-scroll-bridge.instructions.md
  - motion-mobile-degradation.instructions.md
  - motion-performance-gate.instructions.md
- Skills:
  - scaffold-gsap-component.skill.md
  - build-scrolltrigger-timeline.skill.md
  - wire-lenis-scroll-bridge.skill.md

### UI and Block Composition

- Agent: UI System Engineer or 21st.dev Block Integration Engineer
- Instructions:
  - ui-tailwind-cn.instructions.md
  - shadcn-wrapper-governance.instructions.md
  - twentyfirst-block-integration.instructions.md
  - naming-conventions.instructions.md
- Skills:
  - adapt-21st-shadcn-component.skill.md

### Supabase Data and Schema

- Agent: Supabase Query and Type Engineer or Supabase Schema and RLS Engineer
- Instructions:
  - supabase-data-typing.instructions.md
  - supabase-schema-type-sync.instructions.md
  - supabase-rls-env-boundary.instructions.md
  - naming-conventions.instructions.md
- Skills:
  - create-typed-supabase-fetcher.skill.md
  - sync-supabase-types.skill.md

### Quality and Release

- Agent: Performance and QA Guardian or Deploy and Release Engineer
- Instructions:
  - motion-performance-gate.instructions.md
  - app-router-cache-revalidation.instructions.md
  - supabase-rls-env-boundary.instructions.md
- Skills:
  - run-instructions-healthcheck.skill.md

## Fallback Rule

If no skill matches exactly, continue with instruction-only execution and keep ownership with one specialist agent for that phase.
