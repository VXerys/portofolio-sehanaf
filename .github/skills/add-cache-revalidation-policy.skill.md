---
name: "add-cache-revalidation-policy"
description: "Use when: introducing or revising App Router cache and revalidation behavior for server-owned portfolio datasets."
---
# add-cache-revalidation-policy

## Purpose and Trigger

Call this skill when data freshness behavior changes for pages, segments, or query wrappers.
Expected result: explicit server-side cache policy with predictable invalidation paths.

## Primary Executor Agent

Next App Router Boundary Architect

## Workflow

1. Classify data path by freshness requirement (static-like, periodic revalidate, or explicit tag invalidation).
2. Apply cache and revalidation policy in server query or route-level export path.
3. Keep invalidation events on server mutation paths and avoid client polling fallback.
4. Confirm page composition still uses parallel fetching to avoid waterfall regressions.
5. Re-check behavior under missing data and loading boundaries.
