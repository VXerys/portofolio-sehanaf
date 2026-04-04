---
name: "scaffold-app-router-route"
description: "Use when: creating a new App Router route segment with server-first defaults, loading boundary, and typed data flow."
---
# scaffold-app-router-route

## Purpose and Trigger

Call this skill when creating a new route segment in App Router.
Expected result: route has server-first page shell, loading fallback, and clean server/client separation.

## Primary Executor Agent

Next App Router Boundary Architect

## Workflow

1. Create route folder and add page.tsx as a Server Component (do not add use client by default).
2. Add loading.tsx in the same segment for async rendering fallback.
3. Move primary data fetching to server code path and keep return types explicit.
4. If interactivity is needed, create a separate client island component and pass serializable props from page.tsx.
5. Validate that missing data uses not-found behavior instead of client redirect logic.
