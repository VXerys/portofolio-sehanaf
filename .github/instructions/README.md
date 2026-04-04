# Instruction Pack Overview

This folder contains file-specific instruction packs loaded by relevance and applyTo patterns.

## Active Instruction Files

- agent-orchestration-autoselection.instructions.md - Focus: intent-based auto-selection of specialist agents, instruction packs, and skills per phase.
- next-rsc-boundary.instructions.md - Focus: RSC-first architecture, Server vs Client boundaries, route loading and not-found handling.
- next-route-segment-behavior.instructions.md - Focus: dynamic segment behavior, route-level async boundaries, and server-owned param/data flow.
- app-router-cache-revalidation.instructions.md - Focus: cache strategy, revalidate policies, and server-side invalidation discipline.
- gsap-lenis-motion.instructions.md - Focus: GSAP lifecycle, ScrollTrigger behavior, Lenis synchronization, and responsive degradation.
- gsap-plugin-registration.instructions.md - Focus: single-source plugin registration and provider-based animation bootstrap.
- lenis-scroll-bridge.instructions.md - Focus: Lenis initialization, GSAP ticker bridge, ScrollTrigger sync, and teardown hygiene.
- motion-mobile-degradation.instructions.md - Focus: mandatory gsap.matchMedia branching and mobile-safe fallback behavior.
- motion-performance-gate.instructions.md - Focus: pre-merge animation performance checklist and regression prevention.
- ui-tailwind-cn.instructions.md - Focus: cn class composition, responsive utility discipline, and presentational boundaries.
- shadcn-wrapper-governance.instructions.md - Focus: wrapper-first extension model for shadcn primitives.
- twentyfirst-block-integration.instructions.md - Focus: 21st.dev style block integration aligned with RSC, motion lifecycle, and cn rules.
- supabase-data-typing.instructions.md - Focus: typed query centralization, server-first fetching, and strict TypeScript contracts.
- supabase-schema-type-sync.instructions.md - Focus: schema changes, generated type sync, and domain interface alignment.
- supabase-rls-env-boundary.instructions.md - Focus: RLS-safe environment boundaries and secret handling in Supabase access paths.
- naming-conventions.instructions.md - Focus: Rule 7 naming consistency across components, hooks, queries, CSS selectors, and env vars.

## Usage

- For complex tasks, start from Portfolio Workflow Coordinator agent.
- Let coordinator delegate to specialist agents and enforce per-phase auto-selection of matching instructions and skills.
- The instruction packs will be attached automatically based on touched files.
- Global always-on guidance is defined in .github/copilot-instructions.md.

## Maintenance Notes

- Keep one concern per instruction file.
- Keep description fields keyword-rich for on-demand discovery.
- Avoid broad applyTo patterns unless the rule truly applies everywhere.
- Prefer adding narrowly scoped files over broad edits when a new domain appears.
- Revisit applyTo patterns when new folders are introduced so loading stays accurate.
