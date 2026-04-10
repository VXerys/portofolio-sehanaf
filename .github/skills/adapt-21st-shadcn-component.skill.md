---
name: "adapt-21st-shadcn-component"
description: "Use when: adapting a 21st.dev inspired block into shadcn-compatible, accessible portfolio section components with strict mobile fallback."
---

# adapt-21st-shadcn-component

## Purpose and Trigger

Call this skill when integrating visual blocks into the existing UI system.
Expected result: component matches design language, uses cn utility consistently, and preserves accessibility and responsive behavior.

## Primary Executor Agent

- 21st.dev Block Integration Engineer

## Workflow

1. Read .github/instructions/portofolio-md/TECHNICAL_GUIDELINES.md Rule 4 and Rule 7 before adapting the block.
2. Map incoming primitives to local shadcn wrappers and keep class composition centralized with cn.
3. Align spacing, typography, and color tokens to existing globals without introducing conflicting one-off patterns.
4. For color mapping, use DaisyUI semantic tokens from app/globals.css (for example bg-base-100, text-base-content, text-primary, border-base-300) and avoid hardcoded hex values.
5. For typography mapping, use Maghfirea for display-level heading hierarchy and Inter for body/secondary text via shared theme variables.
6. Add semantic markup, focus states, keyboard support, and aria labeling for interactive regions.
7. Verify responsive behavior and degrade heavy visuals on mobile to keep interaction stable.
