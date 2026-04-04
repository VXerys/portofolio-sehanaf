---
name: "sync-supabase-types"
description: "Use when: schema changes require regenerating Supabase types and updating domain interfaces plus query signatures."
---
# sync-supabase-types

## Purpose and Trigger

Call this skill after schema or policy changes that affect query shape.
Expected result: generated types, domain interfaces, and query usage updated in one consistent pass.

## Primary Executor Agent

Supabase Schema and RLS Engineer

## Workflow

1. Finalize schema-level changes and list affected tables/columns/enums.
2. Regenerate Supabase TypeScript definitions.
3. Update domain interfaces and query return signatures to match the regenerated schema types.
4. Refactor call sites to remove stale fields and ensure strict typing without any bridge casts.
5. Validate server-first data flows still compile and match current RLS-safe access paths.
