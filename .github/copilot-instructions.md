# Global Workspace Guidance

This is a lightweight, always-on instruction for all agents in this workspace.

## Core Rule Source

- Treat docs/TECHNICAL_GUIDELINES.md as the primary architecture guardrail.
- Keep solutions aligned to docs/FEATURES.md for UX flow and docs/DATABASE.md for data assumptions.
- For Next.js framework behavior, confirm relevant references in node_modules/next/dist/docs before changing framework-level patterns.

## Automatic Orchestration Baseline

- For multi-domain work, start from Portfolio Workflow Coordinator.
- Use .github/instructions/agent-orchestration-autoselection.instructions.md to map domain to specialist agent, instruction packs, and skills.
- Keep one primary owner per phase and use explicit handoff packets between agents.

## Default Normal Agent Auto-Dispatcher

- If user does not explicitly choose a specialist, treat the default agent as an auto-dispatch router.
- Start by classifying intent into one domain or multi-domain.
- For one-domain requests, auto-route directly to the matching specialist agent.
- For multi-domain requests, auto-route to Portfolio Workflow Coordinator.
- Do not require the user to manually choose agent names unless they ask for a specific agent.

## Prompt, Skill, and Instruction Auto-Load

- During request initialization, analyze .github/prompts/README.md, .github/skills/README.md, and .github/instructions/README.md.
- Auto-select one matching prompt template from .github/prompts when a prompt contract fits the task.
- Auto-select relevant instruction packs and reusable skills before implementation.
- Include selected prompt, selected instructions, and selected skills in the phase handoff packet.
- If no prompt or skill is an exact match, continue with instruction-first execution and keep ownership explicit.

## Instruction and Skill Selection

- Load matching instruction packs from .github/instructions before editing domain files.
- Prefer reusable workflows in .github/skills when they match the task intent.
- If no skill is an exact match, continue with instruction-only execution and keep ownership explicit.

## Non-Negotiable Safety

- Keep portfolio read paths server-first and typed.
- Avoid any in domain contracts.
- Keep GSAP and Lenis lifecycle patterns compliant with guideline rules.
