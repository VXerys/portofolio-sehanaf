---
name: "scaffold-rsc-client-island"
description: "Use when: splitting a Next.js 16 route into Server shell and Client island for interactive UI without violating RSC boundaries."
---

# scaffold-rsc-client-island

## Purpose and Trigger

Call this skill when a mixed page needs strict RSC-compliant separation.
Expected result: Server shell keeps data ownership and SEO, while Client island handles browser-only behavior and motion.

## Primary Executor Agent

- Next App Router Boundary Architect

## Workflow

1. Inspect component responsibilities and keep page and layout as Server Components unless browser APIs are required.
2. Create a dedicated island component with "use client" and move hooks, events, refs, and animation setup into that file.
3. Define serializable props contracts only and do not pass closures or non-serializable objects across the boundary.
4. Keep read-fetching and Supabase query calls in server paths as required by .github/instructions/portofolio-md/TECHNICAL_GUIDELINES.md Rule 5.
5. Validate hydration stability and confirm the route still renders meaningful HTML before client hydration.
