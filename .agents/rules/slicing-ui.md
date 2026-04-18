---
trigger: always_on
glob: "app/**/*.tsx, components/**/*.tsx, app/globals.css"
description: "Rules for premium UI slicing, maintaining design consistency across fonts, colors, spacing, and animations while following Next.js 15+ and GSAP best practices."
---

# UI Slicing & Visual Consistency Rules

You are a **Senior Creative Frontend Engineer**. When slicing UI components or sections, you must adhere to these meticulous standards to ensure the project remains premium, high-performance, and maintainable.

## 1. Design DNA & Tokens

### Typography (Mandatory)
- **Display/Headings (h1-h6)**: MUST use `var(--font-maghfirea)` (Maghfirea).
- **Body & Metadata**: MUST use `var(--font-inter)` (Inter).
- **Font Rendering**: Always use `antialiased` on the root or body.
- **Responsive Sizing**: Use fluid typography or Tailwind's responsive prefixes (`text-4xl md:text-6xl lg:text-8xl`).

### Color System (DaisyUI v5 + oklch)
- **NEVER** use hardcoded hex or RGB values in Tailwind classes.
- **ALWAYS** use semantic DaisyUI tokens:
  - `bg-base-100` (Main background)
  - `bg-base-200` / `bg-base-300` (Surface levels)
  - `text-base-content` (Primary text)
  - `text-primary`, `text-secondary`, `text-accent` (Brand highlights)
  - `border-base-300` (Standard borders)
- **Reference**: `app/globals.css` @plugin "daisyui/theme".

### Radii & Spacing
- **Buttons/Selectors**: `rounded-[--radius-selector]` (0.5rem)
- **Input Fields**: `rounded-[--radius-field]` (2rem)
- **Cards/Boxes**: `rounded-[--radius-box]` (1rem)
- **Containers**: Use `container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl` for standard sections.

---

## 2. Architecture: The "Slicing" Contract

### RSC vs Client Boundary (Next.js 15+)
- **Sections**: Usually created as Server Components in `components/sections/` to fetch data via Supabase.
- **Interactions**: Animation logic, hover effects, and forms MUST be extracted into Client Islands (`'use client'`).
- **Composition Pattern**:
  ```tsx
  // Server Component shell
  export default async function FeatureSection() {
    const data = await getData();
    return <FeatureClient data={data} />;
  }
  ```

### Class Composition
- **ALWAYS** use the `cn()` utility from `@/lib/utils` for merging classes.
- Avoid ternary operations inside raw template strings for classes.

---

## 3. High-Performance Animation (GSAP & Lenis)

### The useGSAP Rule
- **BAN**: Never use `useEffect` for GSAP.
- **MANDATORY**: Use `useGSAP(() => { ... }, { scope: containerRef })`.
- **Cleanup**: `useGSAP` handles basic cleanup, but always kill manual `ScrollTrigger` instances if created outside the scope.

### Responsive Animations (MatchMedia)
- **MANDATORY**: Use `gsap.matchMedia()` within `useGSAP` to degrade animations gracefully for mobile.
- **Breakpoint Mapping**:
  - `(min-width: 1024px)` -> Desktop (Full Parallax/3D)
  - `(max-width: 1023px)` -> Tablet/Mobile (Clean transitions, no heavy parallax)

### Easing & Motion
- **Preferred Easing**: `expo.out` for entry animations, `power3.inOut` for smooth transitions.
- **GSAP & Lenis**: Ensure `ScrollTrigger.update` is called on Lenis scroll (handled by root provider, but be aware of it).

---

## 4. Folder & File Governance

- `components/ui/`: Primitive components (shadcn). **DO NOT MODIFY DIRECTLY**.
- `components/blocks/`: Reusable UI blocks/wrappers (e.g., `magnetic-button.tsx`).
- `components/sections/`: High-level page sections.
- `components/anim/`: Animation providers and global motion helpers.

---

## 5. Meticulous Review Checklist
Before finishing a UI task, verify:
- [ ] Is there any `any` type? (If yes, fix it).
- [ ] Are animations functional on mobile? (Check `matchMedia`).
- [ ] Does it use DaisyUI tokens instead of hex?
- [ ] Is the GSAP scope correctly defined?
- [ ] Did you avoid modification of `components/ui/`?
- [ ] Are custom variations built as wrappers in `components/blocks/`?

## 6. Integration Rules

### shadcn Wrapper Governance
- **DO NOT** edit base shadcn primitives in `components/ui/` directly.
- Build custom behavior or visual tweaks through typed **wrapper components** in `components/blocks/` or `components/sections/`.
- Maintain accessibility semantics of the underlying primitive while applying motion or visual enhancements.

### 21st.dev & External Block Integration
- Blocks MUST consume typed props from Server Component parents (No direct fetching in client islands).
- Any GSAP logic inside external blocks must be refactored to follow Rule 1 lifecycle (scoped `useGSAP`, deterministic cleanup).
- Ensure external blocks are themed using DaisyUI semantic tokens to match the portfolio DNA.

## 7. Project Intelligence (GitHub Integration)
- Refer to `.github/instructions/ui-tailwind-cn.instructions.md` for class composition deep-dives.
- Refer to `.github/instructions/gsap-lenis-motion.instructions.md` for lifecycle standards.
- Refer to `.github/prompts/standardize-ui-tailwind-cn.prompt.md` to normalize complex UI.
