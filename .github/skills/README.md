# Skills Index

This folder contains reusable .skill.md workflows aligned to the portofolio-md instruction set.
All skills are designed to enforce constraints from .github/instructions/portofolio-md/TECHNICAL_GUIDELINES.md.

## Route and RSC Skills

- scaffold-app-router-route.skill.md: scaffold Next.js 16 App Router segments with server-first boundaries.
- scaffold-rsc-client-island.skill.md: split mixed pages into Server shell and Client island safely.

## Motion Skills

- scaffold-gsap-component.skill.md: build GSAP components with useGSAP lifecycle and cleanup discipline.
- build-scrolltrigger-timeline.skill.md: compose ScrollTrigger timelines with desktop-mobile branching.
- wire-lenis-scroll-bridge.skill.md: keep Lenis, GSAP ticker, and ScrollTrigger synchronized.

## UI System Skills

- adapt-21st-shadcn-component.skill.md: adapt 21st.dev inspired blocks into local shadcn wrappers and cn patterns.

## Supabase Skills

- create-typed-supabase-fetcher.skill.md: implement typed Supabase query functions on server paths.
- sync-supabase-types.skill.md: synchronize generated schema types with queries and domain interfaces.

## Cache and Quality Skills

- add-cache-revalidation-policy.skill.md: define revalidate and tag or path invalidation policy with minimal over-invalidation.
- run-instructions-healthcheck.skill.md: validate instruction, skill, and prompt files before merge.

## Orchestration Skill

- orchestrate-agent-instruction-skill-routing.skill.md: route multi-domain requests to the right specialist agent, instruction packs, and reusable skills.

## Suggested Execution Order

1. Use orchestrate-agent-instruction-skill-routing.skill.md when the request spans multiple domains.
2. Use route, UI, motion, and data skills to implement the feature.
3. Apply cache policy if data freshness requirements changed.
4. Run the healthcheck skill before opening or updating a PR.
