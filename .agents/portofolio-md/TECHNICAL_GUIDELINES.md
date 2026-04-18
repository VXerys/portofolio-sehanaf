# docs/TECHNICAL_GUIDELINES.md — Strict Developer SOP

> **Navigation:** [README.md](README.md) · [FEATURES.md](FEATURES.md) · [DATABASE.md](DATABASE.md) · [TECHNICAL_GUIDELINES.md](TECHNICAL_GUIDELINES.md)

---

## Preamble

These are **non-negotiable architectural constraints**. Every line of code in this project must comply. When in doubt, refer back to this document. The goal is to maintain 60fps performance, prevent memory leaks, and ensure the codebase is maintainable as animation complexity grows.

---

## Rule 1 — GSAP: Absolute Ban on `useEffect` for Animations

### ❌ FORBIDDEN — Never Do This

```tsx
// THIS IS BANNED. DO NOT WRITE THIS.
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function BadComponent() {
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // ❌ NO manual cleanup = memory leak every unmount/remount
    // ❌ No scope = selectors are global, will match wrong elements
    // ❌ React StrictMode double-invokes this, creating duplicate animations
    gsap.to(boxRef.current, { x: 100, duration: 1 })
  }, [])

  return <div ref={boxRef} />
}
```

**Why it's banned:**
- No automatic cleanup → GSAP tweens persist after component unmounts → memory leaks
- React 18 Strict Mode double-invokes `useEffect` → duplicate animations fire
- Global GSAP selectors (`.classname`) escape component scope → wrong elements animated

### ✅ MANDATORY — Always Use `useGSAP()`

```tsx
// components/sections/hero-section.tsx
'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'  // ← Import from @gsap/react, NOT gsap
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

// Register plugins ONCE at module level (outside component)
gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // ✅ All animations here are AUTOMATICALLY cleaned up when component unmounts
    // ✅ The `scope` option limits CSS selectors to this component's DOM subtree
    // ✅ React StrictMode compatible

    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

    // Safe to use class selectors — they only match within containerRef's subtree
    tl.from('.hero-word', {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.12,
    })
    .from('.hero-tagline', {
      y: 30,
      opacity: 0,
      duration: 0.7,
    }, '-=0.4')

    // ScrollTrigger instances are also auto-killed on cleanup
    ScrollTrigger.create({
      trigger: '.hero-cta',
      start: 'top 90%',
      onEnter: () => gsap.from('.hero-cta', { scale: 0.9, opacity: 0, duration: 0.5 }),
    })

  }, { scope: containerRef })  // ← ALWAYS pass scope

  return (
    <section ref={containerRef}>
      <h1 className="hero-word">YOUR</h1>
      <h1 className="hero-word">NAME</h1>
      <p className="hero-tagline">Crafting experiences.</p>
      <button className="hero-cta">View Work</button>
    </section>
  )
}
```

### Plugin Registration

Register **all plugins once** in `components/anim/gsap-provider.tsx`:

```tsx
// components/anim/gsap-provider.tsx
'use client'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
// import SplitText from 'gsap/SplitText'    // Club members only
// import Flip from 'gsap/Flip'              // Club members only

gsap.registerPlugin(
  ScrollTrigger,
  ScrollToPlugin,
  // SplitText,
  // Flip,
)

// This component renders nothing — it just ensures plugins are registered
// Import it at the top of app/layout.tsx
export default function GSAPProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
```

---

## Rule 2 — Lenis: SSR-Safe Global Smooth Scroll

### Why Lenis Can Break SSR

Lenis accesses `window` and `document` on initialization. In Next.js App Router, any code that runs during server-side rendering that touches browser APIs will throw. The solution is a `'use client'` provider component initialized inside a `useEffect`.

### ✅ Correct Lenis Provider

```tsx
// components/anim/lenis-provider.tsx
'use client'

import { ReactNode, useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

// Make GSAP aware of Lenis for ScrollTrigger compatibility
gsap.registerPlugin(ScrollTrigger)

interface LenisProviderProps {
  children: ReactNode
}

export default function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    // ✅ Only runs client-side — no SSR access to window
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo ease
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    // ✅ Connect Lenis scroll position to GSAP ScrollTrigger
    // Without this, ScrollTrigger uses native scroll and will de-sync
    lenis.on('scroll', ScrollTrigger.update)

    // ✅ Drive Lenis via GSAP ticker for perfect frame synchronization
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    // ✅ Prevent GSAP from adding its own requestAnimationFrame (Lenis handles it)
    gsap.ticker.lagSmoothing(0)

    // ✅ Cleanup: destroy Lenis and remove ticker on component unmount
    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
    }
  }, [])

  // Provider renders no wrapping DOM element — pure behavior
  return <>{children}</>
}
```

### Inject into Root Layout

```tsx
// app/layout.tsx
import LenisProvider from '@/components/anim/lenis-provider'
// LenisProvider is 'use client' — safe to import in a Server Component layout

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
```

### Accessing Lenis in Child Components

```tsx
// In any Client Component that needs to programmatically scroll
'use client'
import { useLenis } from 'lenis/react'

export function ScrollToTopButton() {
  const lenis = useLenis()

  const scrollToTop = () => {
    lenis?.scrollTo(0, { duration: 1.5, easing: (t) => 1 - Math.pow(1 - t, 4) })
  }

  return <button onClick={scrollToTop}>Back to Top</button>
}
```

---

## Rule 3 — Responsive Animation: `gsap.matchMedia()` is Mandatory

### The Problem

Heavy parallax, 3D tilt, and ScrollTrigger animations that are acceptable on desktop will cause dropped frames and battery drain on mobile. `media queries` in CSS don't affect JavaScript execution — you must guard GSAP code explicitly.

### ❌ FORBIDDEN — Platform-Blind Animation

```tsx
// BAD: This runs the same expensive parallax on a budget Android phone
useGSAP(() => {
  gsap.to('.hero-image', {
    y: '-20%',
    scrollTrigger: { scrub: true }
  })
}, { scope: ref })
```

### ✅ MANDATORY — `gsap.matchMedia()` Guards

```tsx
// components/sections/selected-works.tsx
'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export default function SelectedWorksClient() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    // ─── Desktop (≥ 768px): Full animation suite ─────────────────────────
    mm.add('(min-width: 768px)', () => {
      // Parallax depth differential between bento cards
      gsap.utils.toArray<HTMLElement>('.bento-card').forEach((card, i) => {
        const speed = 1 + (i % 3) * 0.05  // Slight variance per card
        gsap.to(card, {
          yPercent: (speed - 1) * -40,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })

      // 3D perspective tilt on hover (initialized in JS, not inline)
      gsap.set('.bento-card', { transformPerspective: 800 })

      // Stagger card entrance
      gsap.from('.bento-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.bento-grid',
          start: 'top 80%',
        },
      })

      // Return a cleanup function (called when media query stops matching)
      return () => ScrollTrigger.getAll().forEach(t => t.kill())
    })

    // ─── Mobile (< 768px): Simplified, performance-safe version ──────────
    mm.add('(max-width: 767px)', () => {
      // NO parallax on mobile — too expensive
      // NO 3D tilt — no hover on touch devices anyway

      // Simple fade-in only (GPU-friendly: opacity + transform)
      gsap.from('.bento-card', {
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.bento-grid',
          start: 'top 85%',
        },
      })

      return () => ScrollTrigger.getAll().forEach(t => t.kill())
    })

    // ─── Cleanup ──────────────────────────────────────────────────────────
    // useGSAP handles the outer cleanup, but mm.revert() ensures matchMedia
    // listeners are properly removed on resize boundary crossings
    return () => mm.revert()

  }, { scope: containerRef })

  return <section ref={containerRef}>...</section>
}
```

### Breakpoint Reference

| Breakpoint | Tailwind Prefix | `gsap.matchMedia()` |
|------------|-----------------|----------------------|
| Mobile | (default) | `(max-width: 767px)` |
| Tablet | `md:` | `(min-width: 768px) and (max-width: 1023px)` |
| Desktop | `lg:` | `(min-width: 1024px)` |
| Large | `xl:` | `(min-width: 1280px)` |

---

## Rule 4 — Tailwind & shadcn: The `cn()` Contract

### ❌ FORBIDDEN — Raw String Interpolation

```tsx
// BAD: Tailwind class conflicts are silently broken
const className = `px-4 py-2 ${isActive ? 'bg-black text-white' : 'bg-white'} px-6`
// Result: px-4 AND px-6 both in className — last-one-wins in CSS, non-deterministic

// BAD: Looks fine until someone else passes a conflicting class as prop
function Button({ className }: { className?: string }) {
  return <button className={`px-4 py-2 ${className}`} />
  // If caller passes px-6, both px-4 and px-6 exist — undefined behavior
}
```

### ✅ MANDATORY — Always Use `cn()`

```tsx
// lib/utils.ts — already set up
import { cn } from '@/lib/utils'

// ✅ Clean conditional composition
const buttonClass = cn(
  'px-4 py-2 rounded-lg font-medium transition-colors',  // Base
  isActive && 'bg-foreground text-background',           // Conditional
  isDisabled && 'opacity-50 cursor-not-allowed',         // Conditional
  size === 'lg' && 'px-8 py-4 text-lg',                 // Variant — MERGES, not appends
  className,                                              // External override — wins over all above
)
// tailwind-merge ensures 'px-4' is dropped in favor of 'px-8' when size === 'lg'

// ✅ Component with variant system
import { type VariantProps, cva } from 'class-variance-authority'

const magneticButtonVariants = cva(
  // Base classes
  'relative inline-flex items-center justify-center font-display tracking-tight transition-transform',
  {
    variants: {
      size: {
        default: 'px-8 py-4 text-lg',
        sm: 'px-5 py-2.5 text-sm',
        lg: 'px-12 py-6 text-xl',
      },
      intent: {
        primary: 'bg-foreground text-background hover:bg-accent',
        outline: 'border-2 border-foreground text-foreground hover:bg-foreground hover:text-background',
        ghost: 'text-foreground hover:text-accent',
      },
    },
    defaultVariants: {
      size: 'default',
      intent: 'primary',
    },
  }
)

interface MagneticButtonProps extends VariantProps<typeof magneticButtonVariants> {
  className?: string
  children: React.ReactNode
}

export function MagneticButton({ size, intent, className, children }: MagneticButtonProps) {
  return (
    <button className={cn(magneticButtonVariants({ size, intent }), className)}>
      {children}
    </button>
  )
}
```

### shadcn Component Modification Rule

- **Never** edit files inside `components/ui/` directly.
- **Always** extend shadcn components by wrapping them in a new component in `components/blocks/` or `components/sections/`.

```tsx
// ✅ Correct: extend shadcn Badge in a new file
// components/blocks/tech-badge.tsx
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export function TechBadge({ tech, className }: { tech: string; className?: string }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'font-mono text-xs border-border text-muted hover:border-foreground hover:text-foreground transition-colors',
        className
      )}
    >
      {tech}
    </Badge>
  )
}
```

---

## Rule 5 — Data Fetching: Server Components are the Standard

### Hierarchy

```
RSC (Server Component)          — Fetches data, renders initial HTML
└── Client Component island     — Handles animations, interactions, state
    └── Server Component child  — NOT POSSIBLE — Client islands cannot have RSC children
                                  (pass data down as props instead)
```

### ✅ The Correct Pattern

```tsx
// ✅ CORRECT: Server Component fetches, Client Component animates

// Server Component shell (no 'use client')
// components/sections/experience-journey.tsx
import { getExperiences } from '@/lib/supabase/queries'
import ExperienceTimeline from './experience-timeline-client'

export default async function ExperienceJourney() {
  // Direct async/await in RSC — no useEffect, no useState, no loading spinner
  const experiences = await getExperiences()

  // Pass data to Client Component as prop
  return <ExperienceTimeline experiences={experiences} />
}

// Client Component handles GSAP
// components/sections/experience-timeline-client.tsx
'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import type { Experience } from '@/types'

export default function ExperienceTimeline({ experiences }: { experiences: Experience[] }) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // GSAP animations here
  }, { scope: ref })

  return (
    <div ref={ref}>
      {experiences.map(exp => (
        <div key={exp.id} className="timeline-node">
          {/* ... */}
        </div>
      ))}
    </div>
  )
}
```

### ❌ FORBIDDEN — Fetching in Client Components

```tsx
// BAD: Never do this for portfolio data
'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

function BadDataFetcher() {
  const [data, setData] = useState([])

  useEffect(() => {
    // ❌ Runs on client — slower (extra round trip after hydration)
    // ❌ No server-side HTML — bad for SEO/social preview
    // ❌ Shows loading state unnecessarily (data was available at build time)
    createClient().from('projects').select().then(({ data }) => setData(data ?? []))
  }, [])

  return <div>{/* ... */}</div>
}
```

### Caching Strategy

```tsx
// Revalidation for portfolio — data changes rarely
// In each RSC page or query function:

// Option A: On-demand revalidation (recommended for portfolios)
// Tag queries and call revalidateTag() when you update Supabase data
import { unstable_cache } from 'next/cache'

export const getFeaturedProjects = unstable_cache(
  async () => {
    const supabase = await createClient()
    const { data } = await supabase
      .from('projects')
      .select('slug, title, tagline, thumbnail_url, tech_stack, year, is_featured, sort_order')
      .eq('is_featured', true)
      .order('sort_order')
      .limit(4)
    return data ?? []
  },
  ['featured-projects'],                         // Cache key
  { revalidate: 3600, tags: ['projects'] }       // Revalidate hourly or on-demand
)

// Option B: Static generation (best performance, manual redeploy to update)
// In app/page.tsx:
export const revalidate = 86400  // 24 hours
```

---

## Rule 6 — Performance Checklist

Before shipping any new section or component, verify all items:

```
Animation Performance:
☐ All animated properties are ONLY transform and opacity (no width, height, top, left)
☐ Heavy animations guarded with gsap.matchMedia() — disabled/simplified on mobile
☐ will-change: transform applied to elements that animate frequently
☐ No animation fires before the component is in viewport (ScrollTrigger start offsets correct)
☐ ScrollTrigger scrub value ≥ 1 (not scrub: true — too precise, causes jank)

GSAP Rules:
☐ useGSAP() used — NOT useEffect for all GSAP code
☐ scope: containerRef passed to useGSAP
☐ Plugins registered at module level (not inside component body)
☐ All ScrollTrigger instances will be auto-cleaned by useGSAP

Lenis:
☐ LenisProvider wraps the app in layout.tsx
☐ gsap.ticker drives Lenis RAF (see lenis-provider.tsx)
☐ ScrollTrigger.update called on Lenis scroll event

Tailwind & Components:
☐ cn() used for ALL dynamic className composition
☐ No shadcn/ui files in components/ui/ modified directly
☐ No hardcoded color values — use DaisyUI semantic tokens from app/globals.css (for example bg-base-100, text-base-content, text-primary, border-base-300)
☐ Typography policy enforced — Maghfirea for display hierarchy and Inter for body/secondary copy via shared theme variables

Data Fetching:
☐ All Supabase fetches happen in Server Components (async/await directly)
☐ No useEffect-based data fetching in client components
☐ Parallel fetches use Promise.all() (no sequential waterfalls)
☐ Supabase service role key only in server-side code (never NEXT_PUBLIC_*)

TypeScript:
☐ tsconfig.json has strict: true
☐ No `any` types — use the generated Supabase types + domain interfaces
☐ All component props have explicit TypeScript interfaces
☐ Query functions have explicit return types
```

---

## Rule 7 — Naming Conventions

| Entity | Convention | Example |
|--------|------------|---------|
| Components | `PascalCase.tsx` | `HeroSection.tsx` |
| Hooks | `use-kebab-case.ts` | `use-mouse-position.ts` |
| Utility functions | `camelCase` | `cn()`, `formatDate()` |
| Types / Interfaces | `PascalCase` | `type Project`, `interface ExperienceItem` |
| Supabase queries | `camelCase` verb + noun | `getFeaturedProjects()`, `getProjectBySlug()` |
| CSS classes for GSAP | `kebab-case` | `.hero-word`, `.timeline-node` |
| Data attributes | `data-kebab-case` | `data-cursor`, `data-cursor-size` |
| ENV variables | `SCREAMING_SNAKE_CASE` | `NEXT_PUBLIC_SUPABASE_URL` |

---

*End of documentation. For questions on any constraint, re-read this document before making exceptions.*
