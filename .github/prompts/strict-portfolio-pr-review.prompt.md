---
name: strict-portfolio-pr-review
description: Run a strict architecture-focused PR review for this portfolio repository.
argument-hint: Paste changed files or diff summary and review scope.
---

# Goal

Perform a strict review focused on architecture, regressions, and missing safeguards.

## Mandatory Rules

Do not override these rules.
1. Report findings first, ordered by severity.
2. Prioritize risks against `.github/instructions/portofolio-md/TECHNICAL_GUIDELINES.md` Rule 1 through Rule 7.
3. Include exact file and line references for each finding.
4. Include testing and performance gaps when no direct bug is found.

## Input Template

- Review scope: [PASTE_SCOPE]
- Changed files or diff snippet:

```diff
[PASTE_DIFF]
```

## Output Contract

1. Findings by severity with concrete impact.
2. Open questions and assumptions.
3. Short change summary after findings.
4. Recommended fixes and test additions.
