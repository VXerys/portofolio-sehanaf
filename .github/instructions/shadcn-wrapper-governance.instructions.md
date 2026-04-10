---
name: "shadcn Wrapper Governance Rules"
description: "Use when: customizing shadcn primitives, creating wrapper components, or extending base UI behavior for portfolio sections."
applyTo:
  - "components/ui/**/*.tsx"
  - "components/blocks/**/*.tsx"
  - "components/sections/**/*.tsx"
---
# shadcn Wrapper Governance Rules

- Follow Rule 4 in docs/TECHNICAL_GUIDELINES.md: do not edit base shadcn primitive internals directly.
- Build custom behavior through typed wrapper components in blocks or sections.
- Wrapper class composition must use cn and avoid raw template-string class merging.
- Keep accessibility semantics from primitives intact while applying visual or motion enhancements.
- Keep component variants deterministic and token-driven to prevent styling drift.
- Wrapper variants and responsive slicing states must map to DaisyUI semantic tokens from app/globals.css, such as bg-base-100, text-base-content, text-primary, and border-base-300.
