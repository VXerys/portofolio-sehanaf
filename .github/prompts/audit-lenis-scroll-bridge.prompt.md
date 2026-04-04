---
name: audit-lenis-scroll-bridge
description: Audit Lenis provider and GSAP ticker bridge for sync correctness and SSR safety.
argument-hint: Paste provider code and any observed scroll desync symptoms.
---

# Goal

Audit and stabilize Lenis plus GSAP plus ScrollTrigger integration.

## Mandatory Rules

Do not override these rules.
1. Follow `.github/instructions/portofolio-md/TECHNICAL_GUIDELINES.md` Rule 2.
2. Keep a single authoritative Lenis instance at the intended layout scope.
3. Prevent duplicate RAF loops or duplicate ScrollTrigger synchronization bindings.
4. Preserve accessibility and reduced-motion behavior.

## Input Template

- Affected route or layout: [PASTE_PATH]
- Observed issue: [PASTE_ISSUE]
- Current integration code:

```tsx
[PASTE_CODE]
```

## Output Contract

1. Identify root cause candidates first.
2. Provide corrected bridge architecture.
3. Provide concrete patch snippet.
4. Provide validation checks for navigation and anchor behavior.
