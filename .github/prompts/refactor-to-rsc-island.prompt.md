---
name: refactor-to-rsc-island
description: Refactor mixed component code into a Server shell and focused Client island.
argument-hint: Paste existing file and desired interactive behavior.
---

# Goal

Refactor code into a strict Server-first route with a minimal Client island.

## Mandatory Rules

Do not override these rules.
1. Follow `.github/instructions/next-rsc-boundary.instructions.md` and `.github/instructions/portofolio-md/TECHNICAL_GUIDELINES.md` Rule 5.
2. Keep data fetching in server code paths.
3. Pass only serializable typed props from Server shell to Client island.
4. Preserve route-level loading and not-found behavior when relevant.

## Input Template

- Current file path: [PASTE_PATH]
- Current code:

```tsx
[PASTE_CODE]
```

- Required interactivity to keep in client: [PASTE_REQUIREMENTS]

## Output Contract

1. Show target file split list.
2. Explain what remains server-owned and why.
3. Provide updated code for each new or changed file.
4. Include a hydration risk checklist.
