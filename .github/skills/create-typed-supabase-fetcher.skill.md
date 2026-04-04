---
name: "create-typed-supabase-fetcher"
description: "Use when: adding or refactoring Supabase query functions with generated types, domain mapping, and server-only data access boundaries."
---

# create-typed-supabase-fetcher

## Purpose and Trigger

Call this skill when implementing a new query function for portfolio data.
Expected result: query is typed end-to-end, mapped to domain shape, and safe for RLS and server boundary expectations.

## Primary Executor Agent

- Supabase Query and Type Engineer

## Workflow

1. Read .github/instructions/portofolio-md/TECHNICAL_GUIDELINES.md Rule 5 and Rule 6 before implementing the query.
2. Start from generated Supabase Database types and define exact select columns to avoid implicit any.
3. Keep query implementation in server modules only and do not expose privileged clients in browser bundles.
4. Map database rows to explicit domain interfaces with nullability and fallback behavior handled intentionally.
5. Validate call sites in Server Components and remove client read-fetch duplication.
