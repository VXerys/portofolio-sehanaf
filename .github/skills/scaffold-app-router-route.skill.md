---
name: "scaffold-app-router-route"
description: "Use when: scaffolding a Next.js 16 App Router route with server-first boundaries, loading and not-found behavior, and typed data flow."
---

# scaffold-app-router-route

## Purpose and Trigger

Call this skill when creating a new route segment in Next.js 16 App Router.
Expected result: route scaffold has server-owned data orchestration, stable loading and not-found boundaries, and clean Server and Client separation aligned to .github/instructions/portofolio-md.

## Primary Executor Agent

- Next App Router Boundary Architect

## Workflow

1. Read .github/instructions/portofolio-md/TECHNICAL_GUIDELINES.md Rule 5 and Rule 6 before creating files.
2. Create page.tsx as a Server Component by default, add loading.tsx for async boundary, and add not-found.tsx when data can be missing.
3. Implement primary data fetching on server paths only with explicit return types and zero any usage.
4. Move interaction or animation behavior into dedicated Client islands and pass serializable typed props from the Server shell.
5. Verify there is no client useEffect read-fetching and that route behavior is deterministic for loading and missing-data cases.
