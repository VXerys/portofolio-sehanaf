---
name: "run-instructions-healthcheck"
description: "Use when: validating instruction, skill, and prompt files before merge to prevent broken agent customization behavior."
---

# run-instructions-healthcheck

## Purpose and Trigger

Call this skill before shipping instruction, skill, or prompt edits.
Expected result: metadata and markdown formatting are valid across customization files in this workspace.

## Primary Executor Agent

- Performance and QA Guardian

## Workflow

1. Run diagnostics for .github/instructions, .github/skills, and .github/prompts scopes.
2. Fix frontmatter issues first: name, description, applyTo format, and malformed YAML blocks.
3. Fix markdown issues: heading spacing, list spacing, fence language labels, and table formatting.
4. Re-run diagnostics until no relevant errors remain in edited customization files.
5. Summarize changed files and impacted workflows so reviewers can verify behavior quickly.
