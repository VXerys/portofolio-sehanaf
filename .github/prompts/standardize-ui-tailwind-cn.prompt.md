---
name: standardize-ui-tailwind-cn
description: Standardize component styling with local UI rules, cn composition, and responsive accessibility.
argument-hint: Paste component code and target UI behavior.
---

# Goal

Normalize UI code to this repository's Tailwind and shadcn wrapper conventions.

## Mandatory Rules

Do not override these rules.
1. Follow `.github/instructions/portofolio-md/TECHNICAL_GUIDELINES.md` Rule 4 and Rule 7.
2. Prefer `cn` composition over long duplicated class strings.
3. Maintain semantic HTML and keyboard-focus accessibility.
4. Preserve mobile responsiveness and avoid visual regressions.

## Input Template

- File path: [PASTE_PATH]
- Existing code:

```tsx
[PASTE_CODE]
```

- Visual intent or style target: [PASTE_TARGET]

## Output Contract

1. Identify style and structure issues.
2. Provide normalized class and component composition.
3. Include accessibility improvements.
4. Include responsive checks for key breakpoints.
