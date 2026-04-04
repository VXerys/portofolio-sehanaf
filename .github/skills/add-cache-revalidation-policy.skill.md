---
name: "add-cache-revalidation-policy"
description: "Use when: defining or updating Next App Router cache wrappers, revalidate exports, and tag or path invalidation policy for portfolio data paths."
---

# add-cache-revalidation-policy

## Purpose and Trigger

Call this skill when stale content appears or data freshness policy changes.
Expected result: predictable cache behavior with minimal over-invalidation and stable App Router semantics.

## Primary Executor Agent

- Next App Router Boundary Architect

## Workflow

1. Read .github/instructions/app-router-cache-revalidation.instructions.md before making revalidation edits.
2. Identify the data owner path first: query function, page segment, or shared fetch wrapper.
3. Choose revalidate interval, cache tags, or no-store based on volatility and user-perceived freshness.
4. Apply revalidateTag or revalidatePath only at mutation boundaries and avoid broad invalidation by default.
5. Validate freshness behavior across navigation, hard reload, and repeated route transitions.
