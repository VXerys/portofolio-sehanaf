---
name: "adapt-21st-shadcn-component"
description: "Use when: adapting a raw 21st.dev or shadcn-based component into project-safe wrappers with cn and token-consistent Tailwind classes."
---
# adapt-21st-shadcn-component

## Purpose and Trigger

Call this skill when importing a creative UI block and standardizing it for this portfolio system.
Expected result: wrapper-safe component with typed props, cn composition, and token-aligned styling.

## Primary Executor Agent

21st.dev Block Integration Engineer

## Workflow

1. Place imported creative component in blocks/sections layer and keep primitive source untouched.
2. Build a wrapper API with explicit TypeScript props and deterministic variants.
3. Replace raw class concatenation with cn utility composition.
4. Align spacing, typography, and color values to Tailwind token system used by the project.
5. If animation exists, isolate lifecycle setup to dedicated client code path and keep mobile fallback behavior explicit.
