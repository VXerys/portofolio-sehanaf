---
name: "orchestrate-agent-instruction-skill-routing"
description: "Use when: coordinating multi-domain work and selecting specialist agents, instruction packs, and skills automatically by intent."
---

# orchestrate-agent-instruction-skill-routing

## Purpose and Trigger

Call this skill when a request spans multiple architecture domains and must be routed with deterministic ownership.
Expected result: each phase has one owner agent, explicit instruction selection, and explicit skill selection.

## Primary Executor Agent

- Portfolio Workflow Coordinator

## Workflow

1. Parse user intent and classify each requested outcome by domain.
2. Split work into phases and assign exactly one specialist agent per phase.
3. For each phase, select matching prompt templates from .github/prompts.
4. For each phase, select relevant instruction packs from .github/instructions.
5. For each phase, select one or two reusable skills from .github/skills.
6. Build a handoff packet per phase with owner agent, selected prompts, selected instructions, selected skills, input artifacts, and done criteria.
7. Delegate phase work with the handoff packet and require completion evidence against done criteria.
8. Consolidate results and list residual risks or unowned concerns.

## Handoff Packet Template

- phase_id: short ID such as DATA-1, UI-2, or QA-1.
- domain: routing-and-rsc, motion-and-scroll, ui-and-blocks, supabase-data-and-schema, or quality-and-release.
- owner_agent: exactly one specialist agent.
- selected_prompts: explicit prompt file list or none.
- selected_instructions: explicit instruction file list.
- selected_skills: explicit skill file list or none.
- input_artifacts: touched files, assumptions, and constraints.
- done_criteria: deterministic checks for phase completion.
- next_handoff_target: next specialist owner or finalization.

## Domain-to-Asset Reference

- Routing and RSC: audit-rsc-client-boundary.prompt.md, refactor-to-rsc-island.prompt.md, next-rsc-boundary.instructions.md, next-route-segment-behavior.instructions.md, scaffold-app-router-route.skill.md, scaffold-rsc-client-island.skill.md
- Motion and Scroll: audit-gsap-performance-safety.prompt.md, audit-lenis-scroll-bridge.prompt.md, gsap-lenis-motion.instructions.md, lenis-scroll-bridge.instructions.md, scaffold-gsap-component.skill.md, build-scrolltrigger-timeline.skill.md, wire-lenis-scroll-bridge.skill.md
- UI and Blocks: standardize-ui-tailwind-cn.prompt.md, adapt-21st-shadcn-wrapper.prompt.md, ui-tailwind-cn.instructions.md, twentyfirst-block-integration.instructions.md, adapt-21st-shadcn-component.skill.md, responsive-device-slicing/SKILL.md
- Supabase Data and Schema: enforce-supabase-type-safety.prompt.md, review-cache-revalidation.prompt.md, supabase-data-typing.instructions.md, supabase-schema-type-sync.instructions.md, create-typed-supabase-fetcher.skill.md, sync-supabase-types.skill.md
- Quality and Release: strict-portfolio-pr-review.prompt.md, run-customization-healthcheck.prompt.md, motion-performance-gate.instructions.md, run-instructions-healthcheck.skill.md
