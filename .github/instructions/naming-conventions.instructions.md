---
name: "Project Naming Convention Rules"
description: "Use when: creating or renaming components, hooks, query functions, CSS selectors, data attributes, and environment variables."
applyTo:
  - "app/**/*.tsx"
  - "components/**/*.tsx"
  - "hooks/**/*.ts"
  - "lib/**/*.ts"
  - "types/**/*.ts"
---
# Project Naming Convention Rules

- Follow Rule 7 naming conventions in docs/TECHNICAL_GUIDELINES.md for files, symbols, and environment variables.
- Components and types stay PascalCase; utility functions and query helpers stay camelCase.
- Hooks and GSAP selector/data attribute class names stay kebab-case where Rule 7 defines it.
- Keep Supabase query function names action-oriented and domain-specific for readability and consistency.
- Use consistent naming updates across imports, exports, and usage sites in a single change.