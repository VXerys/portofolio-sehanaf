---
name: "21st.dev Block Integration Rules"
description: "Use when: integrating 21st.dev inspired blocks, custom cursor systems, bento layouts, and interactive section wrappers."
applyTo:
  - "components/blocks/**/*.tsx"
  - "components/sections/**/*.tsx"
  - "app/page.tsx"
---
# 21st.dev Block Integration Rules

- Keep block integration aligned with Rule 5 RSC-first architecture in docs/TECHNICAL_GUIDELINES.md.
- Blocks receiving data must consume typed props from Server Component parents, not fetch directly in client islands.
- Any GSAP logic inside blocks follows Rule 1 lifecycle rules: useGSAP, scoped selectors, deterministic cleanup.
- Dynamic class composition in block wrappers must use cn contract from Rule 4.
- Heavy interaction blocks must define Rule 3 mobile degradation behavior before merge.
