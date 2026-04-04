---
name: audit-gsap-performance-safety
description: Audit GSAP or ScrollTrigger code for lifecycle safety, cleanup, and mobile degradation.
argument-hint: Paste component code and intended animation behavior.
---

# Goal

Audit animation code for safe GSAP lifecycle and performance in this portfolio.

## Mandatory Rules

Do not override these rules.
1. Follow `.github/instructions/portofolio-md/TECHNICAL_GUIDELINES.md` Rule 1, Rule 3, and Rule 6.
2. Require `gsap.matchMedia` for desktop-mobile branching when behavior differs.
3. Ensure teardown kills timelines and ScrollTriggers on unmount.
4. Add reduced-motion or mobile fallback for heavy effects.

## Input Template

- File path: [PASTE_PATH]
- Animation intent: [PASTE_INTENT]
- Code snippet:

```tsx
[PASTE_CODE]
```

## Output Contract

1. List concrete risks and their runtime impact.
2. Provide corrected timeline setup and cleanup snippets.
3. Provide mobile fallback strategy.
4. End with a quick test matrix for desktop and mobile.
