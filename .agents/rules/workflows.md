---
trigger: model_decision
---

# Agentic Workflows & Audit Checklists

Use these workflows to standardize code, audit performance, and verify architectural boundaries.

---

## 🎨 Workflow: UI Standardization

**Trigger**: Use when finishing a UI section or when the user asks to "fix the styling".

1.  **Semantic Tokens Check**:
    - Ensure ALL color classes use DaisyUI v5 semantic tokens (e.g., `bg-base-100`, `text-primary`, `border-base-300`).
    - **NO** hardcoded hex (`#ffffff`) or RGB values in Tailwind classes.
2.  **Typography Check**:
    - Headings/Display: `var(--font-maghfirea)` (Maghfirea).
    - Body/Metadata: `var(--font-inter)` (Inter).
3.  **Composition Check**:
    - Use the `cn()` utility for merging classes.
    - Responsive prefixes (`md:`, `lg:`) must be used for fluid layouts.
4.  **Accessibility Check**:
    - Use semantic HTML (`<main>`, `<section>`, `<article>`).
    - Ensure interactive elements are keyboard-accessible (focus states).

---

## ⚡ Workflow: Performance & GSAP Audit

**Trigger**: Use when finishing an animation or when the user asks to "check performance".

1.  **Lifecycle Safety**:
    - Is `useGSAP` used with a correctly scoped `containerRef`?
    - Are ALL GSAP plugins registered at the module scope?
2.  **Mobile Degradation**:
    - Is `gsap.matchMedia` implemented?
    - Are heavy effects (3D, complex parallax) removed/simplified for mobile?
3.  **Property Audit**:
    - Verify only `transform` and `opacity` are animated.
    - Check for `ScrollTrigger` synchronization with Lenis.
4.  **Cleanup**:
    - Ensure timelines and manually created triggers are killed on unmount.

---

## 🏗️ Workflow: RSC Boundary Audit

**Trigger**: Use when creating new pages or data-fetching logic.

1.  **Shell vs island**:
    - Is the root component a Server Component (RSC)?
    - Are fetch calls (`async/await`) inside the RSC?
2.  **Serialization Check**:
    - Are the props passed to Client Components serializable (no functions, no complex non-standard objects)?
3.  **"use client" Justification**:
    - Is `'use client'` strictly necessary (hooks, browser APIs, motion)?
4.  **Error States**:
    - Check for `loading.tsx` and `not-found.tsx` implementation.

---

## 🛡️ Workflow: Supabase Safety Audit

**Trigger**: Use when editing `lib/supabase/queries.ts` or any data contract.

1.  **Any-Free Zone**:
    - Remove all `any` types. Ensure query projections are correctly typed.
2.  **Contract Sync**:
    - If the database schema changed, verify generated types are updated.
3.  **Secret Leakage**:
    - Check that no `SERVICE_ROLE_KEY` is present in client-side code.
4.  **Parallelization**:
    - Check if independent queries are wrapped in `Promise.all`.
