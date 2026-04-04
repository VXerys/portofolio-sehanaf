---
name: enforce-supabase-type-safety
description: Enforce typed Supabase query design, domain mapping, and server-only data access.
argument-hint: Paste query function, caller code, and expected return shape.
---

# Goal

Audit and refactor Supabase access for strict type safety and server boundary compliance.

## Mandatory Rules

Do not override these rules.
1. Follow `.github/instructions/supabase-data-typing.instructions.md` and `.github/instructions/portofolio-md/TECHNICAL_GUIDELINES.md` Rule 5.
2. Keep read-fetching in server code paths.
3. Use generated Supabase types and explicit domain interfaces.
4. Remove implicit `any`, unsafe casting, and nullable blind spots.

## Input Template

- Query file path: [PASTE_PATH]
- Current query code:

```ts
[PASTE_CODE]
```

- Expected return model: [PASTE_EXPECTED_SHAPE]

## Output Contract

1. List type-safety issues first.
2. Provide corrected typed query and mapping logic.
3. Provide updated caller usage if signature changes.
4. Provide a short regression checklist.
