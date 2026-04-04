---
name: review-cache-revalidation
description: Review App Router cache and revalidation policy for stale data or over-invalidation.
argument-hint: Paste data path, mutation flow, and current revalidate or tag usage.
---

# Goal

Tune caching and revalidation to keep portfolio data fresh without over-fetching.

## Mandatory Rules

Do not override these rules.
1. Follow `.github/instructions/app-router-cache-revalidation.instructions.md`.
2. Use tag or path invalidation only where mutation boundaries require it.
3. Avoid global invalidation unless explicitly justified.
4. Keep behavior deterministic across navigation and hard reload.

## Input Template

- Data path or query owner: [PASTE_OWNER]
- Current cache policy: [PASTE_POLICY]
- Current code:

```ts
[PASTE_CODE]
```

## Output Contract

1. Identify stale-data or over-invalidation risks.
2. Recommend final policy with rationale.
3. Provide concrete patch snippets.
4. Provide verification steps.
