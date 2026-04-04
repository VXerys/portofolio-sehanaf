# Skills Pack Overview

This folder contains reusable macro workflows for day-to-day portfolio development.

## Available Skills

- scaffold-app-router-route.skill.md - Scaffold App Router segment with server-first page and loading boundary.
- scaffold-rsc-client-island.skill.md - Split mixed components into RSC shell and client island.
- scaffold-gsap-component.skill.md - Add GSAP via useGSAP with scoped lifecycle and mobile branching.
- build-scrolltrigger-timeline.skill.md - Build scroll timelines with trigger hygiene and performance-safe properties.
- wire-lenis-scroll-bridge.skill.md - Configure Lenis provider and GSAP/ScrollTrigger synchronization.
- adapt-21st-shadcn-component.skill.md - Adapt creative blocks to project wrappers, cn, and token-safe styling.
- create-typed-supabase-fetcher.skill.md - Create typed Supabase query utilities for server-first consumption.
- sync-supabase-types.skill.md - Regenerate and propagate schema type changes across queries and consumers.
- add-cache-revalidation-policy.skill.md - Apply App Router cache and revalidation strategy consistently.
- run-instructions-healthcheck.skill.md - Validate instruction frontmatter and markdown diagnostics before merge.

## Usage Notes

- Invoke these skills for repetitive workflows; do not use them for one-off trivial edits.
- Keep Server and Client concerns separated in all generated output.
- When skills touch instructions, run run-instructions-healthcheck.skill.md before merge.
