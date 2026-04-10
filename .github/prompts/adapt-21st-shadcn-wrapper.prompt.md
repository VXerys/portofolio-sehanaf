---
name: adapt-21st-shadcn-wrapper
description: Adapt 21st.dev inspired UI blocks into local shadcn wrappers without breaking architecture.
argument-hint: Paste source block snippet and target section requirements.
---

# Goal

Transform an incoming block into a maintainable component aligned with local UI and motion rules.

## Mandatory Rules

Do not override these rules.
1. Follow `.github/instructions/twentyfirst-block-integration.instructions.md` and `.github/instructions/portofolio-md/TECHNICAL_GUIDELINES.md` Rule 4.
2. Map primitives to local wrappers and utility patterns.
3. Keep accessibility, keyboard support, and responsive behavior intact.
4. Degrade heavy interactions on mobile devices.

## Input Template

- Source block link or snippet: [PASTE_SOURCE]
- Target section path: [PASTE_PATH]
- Constraints: [PASTE_CONSTRAINTS]

## Output Contract

1. Explain integration mapping from source block to local components.
2. Provide final component code adapted to local patterns.
3. Provide mobile fallback behavior notes.
4. Provide a quick QA checklist.
5. Ensure styling maps to DaisyUI semantic tokens in app/globals.css (for example bg-base-100, text-base-content, text-primary, border-base-300) and avoids hardcoded hex colors.
6. Ensure typography mapping uses Maghfirea for display-level headings and Inter for body-level readability.
