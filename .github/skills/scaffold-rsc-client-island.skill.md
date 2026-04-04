---
name: "scaffold-rsc-client-island"
description: "Use when: splitting mixed data-plus-interaction components into a Server Component shell and Client Component island."
---
# scaffold-rsc-client-island

## Purpose and Trigger

Call this skill when a component currently mixes server data orchestration and client-only interaction.
Expected result: clear RSC boundary, no duplicated fetch logic, and stable typed props.

## Primary Executor Agent

Next App Router Boundary Architect

## Workflow

1. Identify server responsibilities (data fetch, params handling, cache policy) and client responsibilities (events, local state, motion).
2. Extract server logic into an async Server Component shell.
3. Create a dedicated Client Component with use client for interaction and animation only.
4. Pass serializable typed props from server shell to client island and remove client-side primary fetch calls.
5. Re-check the route for loading/not-found behavior after separation.
