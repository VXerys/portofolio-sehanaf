---
name: "Supabase RLS and Environment Boundary Rules"
description: "Use when: editing Supabase environment variables, server clients, RLS-sensitive data paths, or security-related fetch code."
applyTo:
  - "lib/supabase/**/*.ts"
  - "app/**/*.tsx"
  - "docs/DATABASE.md"
---
# Supabase RLS and Environment Boundary Rules

- Respect Rule 5 server-client boundaries from docs/TECHNICAL_GUIDELINES.md for Supabase access paths.
- Keep service-role credentials server-only and never route them through public environment variables.
- Public read behavior relies on RLS policy posture and should not be bypassed with privileged client mutations.
- Server data access code must keep typed contracts and avoid runtime secret leakage into client bundles.
- Validate environment changes against deployment behavior before merge.
