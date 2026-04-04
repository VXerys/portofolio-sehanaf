---
name: audit-rsc-client-boundary
description: Audit a route or component for strict Next.js 16 Server vs Client boundaries.
argument-hint: Paste file path, route context, and relevant code.
---

# Goal

Audit pasted code for RSC boundary correctness in this repository.

## Mandatory Rules

Do not override these rules.
1. Follow `.github/instructions/portofolio-md/TECHNICAL_GUIDELINES.md` Rule 5 and Rule 6 exactly.
2. Keep read-fetching in Server Components or server modules unless there is a hard browser-only requirement.
3. Any `"use client"` boundary must be justified by browser APIs, hooks, events, or animation runtime.
4. Do not propose `any` types or untyped data pass-through.

## Input Template

- Target file path: [PASTE_PATH]
- Route purpose: [PASTE_PURPOSE]
- Code snippet:

```tsx
[PASTE_CODE]
```

## Output Contract

1. List violations first, ordered by severity.
2. Provide exact patch plan with Server shell vs Client island split.
3. Provide corrected code snippets only for changed sections.
4. End with a short verification checklist.
