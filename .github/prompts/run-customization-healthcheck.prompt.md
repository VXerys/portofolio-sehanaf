---
name: run-customization-healthcheck
description: Validate instruction, skill, and prompt packs for metadata and markdown health.
argument-hint: Specify folders to check and whether only touched files should be validated.
---

# Goal

Run and report a full customization healthcheck before merge.

## Mandatory Rules

Do not override these rules.
1. Validate `.github/instructions`, `.github/skills`, and `.github/prompts`.
2. Fix frontmatter and markdown issues in changed files.
3. Re-run diagnostics and report remaining issues explicitly.
4. Keep fixes minimal and avoid unrelated rewrites.

## Input Template

- Scope: [PASTE_SCOPE]
- Recently edited files: [PASTE_FILES]
- Validation mode: [FULL or TOUCHED_ONLY]

## Output Contract

1. Report diagnostics before fixes.
2. Show files changed and why.
3. Report diagnostics after fixes.
4. Confirm merge readiness.
