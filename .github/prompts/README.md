# Prompt Pack Index

This folder provides reusable `.prompt.md` shortcuts for day-to-day engineering work in this repository.

## Core Architecture

- `audit-rsc-client-boundary.prompt.md`: audit Server and Client boundary correctness.
- `refactor-to-rsc-island.prompt.md`: split mixed code into Server shell plus Client island.

## Motion and Scroll

- `audit-gsap-performance-safety.prompt.md`: audit GSAP or ScrollTrigger lifecycle and performance.
- `audit-lenis-scroll-bridge.prompt.md`: validate Lenis provider and GSAP bridge synchronization.

## UI and Composition

- `standardize-ui-tailwind-cn.prompt.md`: normalize Tailwind and cn composition patterns.
- `adapt-21st-shadcn-wrapper.prompt.md`: adapt 21st.dev inspired blocks to local wrappers.

## Supabase and Data Freshness

- `enforce-supabase-type-safety.prompt.md`: enforce typed Supabase query and mapping contracts.
- `review-cache-revalidation.prompt.md`: tune App Router cache and invalidation behavior.

## Review and Hygiene

- `strict-portfolio-pr-review.prompt.md`: run a strict findings-first PR review.
- `run-customization-healthcheck.prompt.md`: validate instruction, skill, and prompt pack diagnostics.

## Usage Pattern

1. Pick one prompt file that matches the task intent.
2. Fill the placeholders in the Input Template section.
3. Run the prompt to enforce repository-specific constraints.
