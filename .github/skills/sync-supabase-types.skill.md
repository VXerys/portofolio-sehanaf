---
name: "sync-supabase-types"
description: "Use when: schema changes require regenerating Supabase types and propagating signature updates through query and domain layers."
---

# sync-supabase-types

## Purpose and Trigger

Call this skill after schema migration or table shape updates.
Expected result: generated types, query signatures, and domain interfaces stay synchronized with zero stale fields.

## Primary Executor Agent

- Supabase Query and Type Engineer

## Workflow

1. Regenerate Supabase types from the latest schema source of truth.
2. Update all impacted query functions for renamed columns, nullability shifts, and new constraints.
3. Align domain interfaces and mapping utilities with current row shapes.
4. Audit call sites for broken signatures and update selectors, guards, and empty-state handling.
5. Run typecheck and verify no stale references to removed columns remain.
