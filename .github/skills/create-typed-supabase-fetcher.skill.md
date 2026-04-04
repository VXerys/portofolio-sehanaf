---
name: "create-typed-supabase-fetcher"
description: "Use when: adding a new Supabase query utility with explicit return types and server-first consumption in App Router."
---
# create-typed-supabase-fetcher

## Purpose and Trigger

Call this skill when introducing a new data fetch path from Supabase.
Expected result: strongly typed query function consumed by Server Components without any leakage to client fetch logic.

## Primary Executor Agent

Supabase Query and Type Engineer

## Workflow

1. Define the target return shape using generated Supabase types and domain-facing aliases.
2. Implement query in lib/supabase/queries.ts with explicit return type annotation.
3. Handle error cases with predictable typed output contract.
4. Consume the query from a Server Component and pass serializable props to any client island.
5. Verify no any usage and no privileged environment variables are exposed to client code.
