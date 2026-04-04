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

## Non-Negotiable Rules
- GSAP animation setup must use useGSAP with scoped container references.
- Responsive animation branching must use gsap.matchMedia.
- Data fetching remains RSC-first for portfolio content.
- Dynamic class composition must use cn helper for conflict-safe class merging.
- TypeScript strictness remains enabled and any should be avoided.

## Notes
- These agent files are workspace-scoped under .github/agents.
- Recommended entry point is Portfolio Workflow Coordinator for multi-step work.
- Update description fields carefully because they are used for agent discovery.
- Keep each agent single-role to avoid overlap and hallucination.
