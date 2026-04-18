---
trigger: model_decision
---

# Advanced Motion & Scroll Rules

Rules for GSAP plugin registration, Lenis smooth-scroll bridging, mobile degradation, and performance optimization.

## Context & Triggers

- **When**: Creating animations in `components/sections/**/*`, `components/blocks/**/*`, or editing `components/anim/**/*`.
- **Why**: To ensure silky-smooth performance (60+ FPS) while maintaining stability across mobile and desktop.

---

## 1. GSAP Plugin Registration

- **Module Scope Only**: Register GSAP plugins (e.g., `ScrollTrigger`, `ScrollToPlugin`) ONCE at the module scope or in a centralized provider.
- **No Dynamic Registration**: NEVER register plugins inside component bodies or `useGSAP` callbacks.
- **Provider Centralization**: Prefer `components/anim/gsap-provider.tsx` for shared registration to avoid duplication drift.

## 2. Lenis & ScrollTrigger Bridge

- **Centralized Ticker**: Drive Lenis RAF (Request Animation Frame) via the GSAP ticker bridge.
- **Cleanup**: Always tear down both Lenis instances and GSAP ticker callbacks on component unmount.
- **Synchronization**: Ensure `ScrollTrigger.update()` is called on every Lenis scroll event to maintain trigger accuracy.
- **No Parallel RAF**: Do not introduce additional `requestAnimationFrame` loops that compete with the shared Lenis+GSAP system.

## 3. Mandatory Mobile Degradation

- **gsap.matchMedia**: Using `gsap.matchMedia()` is MANDATORY for all complex animations.
- **Branching Logic**:
  - **Desktop**: Full parallax, 3D tilt, and scrubbed scroll animations allowed.
  - **Mobile**: Remove heavy effects. Fallback to simple reveals (opacity + simple transforms).
- **Cleanup Boundaries**: Always revert `matchMedia` listeners to prevent stale triggers after resize.

## 4. Performance Gates

- **Property Safety**: Only animate `transform` and `opacity`. Avoid animating layout properties like `width`, `height`, `top`, or `margin` unless absolutely necessary.
- **Viewport Optimization**: Triggers should only start when elements are nearing the viewport. Use `start`, `end`, and `toggleActions` wisely.
- **Memory Safety**: Use the `useGSAP` hook with a `scope` reference to automate most cleanup, but manually kill any `ScrollTrigger` instances created outside the scope.

---

## Meticulous Checklist

- [ ] Registered GSAP plugins at module scope?
- [ ] Using `gsap.matchMedia` for mobile branching?
- [ ] animating only `transform`/`opacity`?
- [ ] Lenis and ScrollTrigger synchronized?
- [ ] Is there a `scope` defined in `useGSAP`?
- [ ] Heavy parallax removed on mobile branch?
