# Agent Ownership Matrix

This folder contains specialized Copilot custom agents for this portfolio project.

## Invocation Order
1. Portfolio Workflow Coordinator
2. Supabase Schema and RLS Engineer
3. Supabase Query and Type Engineer
4. Next App Router Boundary Architect
5. UI System Engineer
6. 21st.dev Block Integration Engineer
7. GSAP Motion Engineer
8. Lenis Scroll Systems Engineer
9. Performance and QA Guardian
10. Deploy and Release Engineer

## Scope Matrix

| Agent | Primary Write Scope | Forbidden Core Scope |
|---|---|---|
| Portfolio Workflow Coordinator | phased orchestration and specialist delegation | direct feature implementation across specialist domains |
| Next App Router Boundary Architect | app routes and route-level rendering | schema, RLS, deep GSAP choreography |
| Supabase Schema and RLS Engineer | schema, migration, RLS policy | UI, route rendering, animation |
| Supabase Query and Type Engineer | lib/supabase and types | schema policy, GSAP timeline logic |
| UI System Engineer | design system, reusable UI composition | query logic, schema, Lenis engine |
| 21st.dev Block Integration Engineer | creative block composition | direct backend calls, deploy config |
| GSAP Motion Engineer | GSAP timeline and ScrollTrigger logic | schema/query, route ownership |
| Lenis Scroll Systems Engineer | global smooth scroll engine wiring | section timeline ownership |
| Performance and QA Guardian | validation reports and targeted fixes | broad feature redesign |
| Deploy and Release Engineer | deployment config and release hardening | feature implementation unrelated to release |

## Automatic Selection Matrix

Use this matrix to keep orchestration deterministic.

| Domain | Preferred Agent | Instruction Packs | Skills |
|---|---|---|---|
| Routing and RSC | Next App Router Boundary Architect | next-rsc-boundary.instructions.md, next-route-segment-behavior.instructions.md, app-router-cache-revalidation.instructions.md | scaffold-app-router-route.skill.md, scaffold-rsc-client-island.skill.md, add-cache-revalidation-policy.skill.md |
| Motion and Scroll | GSAP Motion Engineer, Lenis Scroll Systems Engineer | gsap-lenis-motion.instructions.md, gsap-plugin-registration.instructions.md, lenis-scroll-bridge.instructions.md, motion-mobile-degradation.instructions.md, motion-performance-gate.instructions.md | scaffold-gsap-component.skill.md, build-scrolltrigger-timeline.skill.md, wire-lenis-scroll-bridge.skill.md |
| UI and Blocks | UI System Engineer, 21st.dev Block Integration Engineer | ui-tailwind-cn.instructions.md, shadcn-wrapper-governance.instructions.md, twentyfirst-block-integration.instructions.md, naming-conventions.instructions.md | adapt-21st-shadcn-component.skill.md |
| Supabase Data and Schema | Supabase Query and Type Engineer, Supabase Schema and RLS Engineer | supabase-data-typing.instructions.md, supabase-schema-type-sync.instructions.md, supabase-rls-env-boundary.instructions.md, naming-conventions.instructions.md | create-typed-supabase-fetcher.skill.md, sync-supabase-types.skill.md |
| Quality and Release | Performance and QA Guardian, Deploy and Release Engineer | motion-performance-gate.instructions.md, app-router-cache-revalidation.instructions.md, supabase-rls-env-boundary.instructions.md | run-instructions-healthcheck.skill.md, orchestrate-agent-instruction-skill-routing.skill.md |

## Handoff Protocol

For every multi-phase request, handoff between agents must carry a structured packet.

- phase_id: unique phase key.
- owner_agent: exactly one specialist owner.
- selected_instructions: instruction files selected for the phase.
- selected_skills: skill files selected for the phase.
- input_artifacts: files and constraints required by the owner.
- done_criteria: deterministic completion checks.
- next_handoff_target: next owner or final summary.

Coordinator must reject phase completion if done_criteria are not met.

## Non-Negotiable Rules
- GSAP animation setup must use useGSAP with scoped container references.
- Responsive animation branching must use gsap.matchMedia.
- Data fetching remains RSC-first for portfolio content.
- Dynamic class composition must use cn helper for conflict-safe class merging.
- TypeScript strictness remains enabled and any should be avoided.

## Notes
- These agent files are workspace-scoped under .github/agents.
- Global always-on guidance lives in .github/copilot-instructions.md.
- Recommended entry point is Portfolio Workflow Coordinator for multi-step work.
- Update description fields carefully because they are used for agent discovery.
- Keep each agent single-role to avoid overlap and hallucination.
