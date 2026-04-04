---
name: "run-instructions-healthcheck"
description: "Use when: validating .github/instructions frontmatter and markdown quality before merge."
---
# run-instructions-healthcheck

## Purpose and Trigger

Call this skill after editing instruction packs.
Expected result: no diagnostics in .github/instructions and discovery metadata remains valid.

## Primary Executor Agent

Performance and QA Guardian

## Workflow

1. Run diagnostics for .github/instructions and collect compile/lint errors.
2. Validate frontmatter keys and types, especially description and applyTo.
3. Fix markdown list and heading spacing issues in instruction index files.
4. Re-run diagnostics until the folder reports no errors.
5. Summarize changed files and remaining risk notes, if any.
