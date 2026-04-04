# docs/FEATURES.md — UX Flow, Content & Animation Mapping

> **Navigation:** [README.md](README.md) · [FEATURES.md](FEATURES.md) · [DATABASE.md](DATABASE.md) · [TECHNICAL_GUIDELINES.md](TECHNICAL_GUIDELINES.md)

---

## Overview

The portfolio is structured as a **single long-scroll experience**. All six sections live on `app/page.tsx`. The narrative arc is intentional:

```
Hook (Hero) → Proof (Works) → Person (About) → Journey (Experience) → Depth (Archive) → Connection (Footer)
```

Every section transition is choreographed. Lenis keeps scroll momentum smooth throughout. GSAP ScrollTrigger fires section-specific animations at the precise viewport moment.

---

NOTE: The following 6 sections are just a rough sketch/baseline. I will finalize and determine the exact sections myself during development. However, for the sake of this documentation, meticulously detail the functional and visual flow of these 6 sections as the primary blueprint. Explain the GSAP triggers and 21st.dev components for each:

## Section 1 — `HeroSection` (The Hook)

**File:** `components/sections/hero-section.tsx`

### Purpose
The first impression. Must be impossible to ignore. The developer's name fills the viewport in massive type, establishing visual identity before any content is read.

### Visual Composition

```
┌─────────────────────────────────────────────────────┐
│  [Animated Gradient Background — full viewport]      │
│                                                      │
│   ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·   │
│                                                      │
│   YOUR                                               │
│   NAME                         ← fluid-hero type    │
│                                                      │
│   Crafting Mobile & Web        ← fluid-lg, muted    │
│   Experiences that Matter.                           │
│                                                      │
│                    [ View Work ↘ ]  ← magnetic CTA  │
│                                                      │
│   Scroll ↓                     ← animated indicator │
└─────────────────────────────────────────────────────┘
```

### 21st.dev Components Used

| Component | Role | File |
|-----------|------|------|
| `AnimatedGradientBg` | Full-viewport living background (aurora/mesh gradient that slowly shifts hue) | `components/blocks/animated-gradient-bg.tsx` |
| `MagneticButton` | CTA "View Work" — pulls toward cursor within a 100px radius | `components/blocks/magnetic-button.tsx` |
| `TextRevealMask` | Character-by-character clip-path reveal on page load | `components/blocks/text-reveal-mask.tsx` |

### GSAP Animation Sequence

```
Timeline: heroTl (fires once on mount, no ScrollTrigger)

Step 1 (t=0):     Background gradient fades in from opacity 0 — duration 1.2s, ease: 'power2.out'
Step 2 (t=0.3):   First name word slides up from y:80 + opacity 0 — duration 0.9s, ease: 'expo.out'
Step 3 (t=0.5):   Second name word slides up — staggered 0.15s after step 2
Step 4 (t=0.9):   Tagline fades + slides from y:30 — duration 0.7s
Step 5 (t=1.1):   Magnetic CTA button scales from 0.8 + opacity 0 — duration 0.5s, ease: 'back.out(1.7)'
Step 6 (t=1.3):   Scroll indicator bounces in — infinite bounce animation begins
```

```tsx
// components/sections/hero-section.tsx
'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import AnimatedGradientBg from '@/components/blocks/animated-gradient-bg'
import MagneticButton from '@/components/blocks/magnetic-button'
import { cn } from '@/lib/utils'

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

    tl.from('.hero-word', {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.12,
    })
    .from('.hero-tagline', { y: 30, opacity: 0, duration: 0.7 }, '-=0.4')
    .from('.hero-cta', { scale: 0.85, opacity: 0, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.3')
    .from('.scroll-indicator', { opacity: 0, duration: 0.4 }, '-=0.1')
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative h-screen flex flex-col justify-center overflow-hidden">
      <AnimatedGradientBg />
      <div className="relative z-10 px-6 md:px-16 lg:px-24">
        {/* Name split into words for stagger */}
        <h1 className="font-display leading-none tracking-tighter">
          <span className="hero-word block text-fluid-hero">YOUR</span>
          <span className="hero-word block text-fluid-hero">NAME</span>
        </h1>
        <p className="hero-tagline mt-6 text-fluid-lg text-muted max-w-2xl">
          Crafting Mobile & Web<br />Experiences that Matter.
        </p>
        <div className="hero-cta mt-12">
          <MagneticButton href="#works" label="View Work" />
        </div>
      </div>
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2">
        {/* Animated scroll chevron */}
      </div>
    </section>
  )
}
```

### Responsive Behaviour
- Mobile (`< 768px`): Gradient background renders as static (no JS animation). `AnimatedGradientBg` accepts a `reducedMotion` prop. Typography scales down via `clamp()`. Magnetic effect disabled.
- Desktop: Full animated gradient + magnetic button active.

---

## Section 2 — `SelectedWorks` (Main Showcase)

**Files:** `components/sections/selected-works.tsx` · `components/sections/project-card.tsx`

### Purpose
The proof of craft. Display the top 3–4 projects in a Bento Grid that rewards exploration — each card feels alive on hover.

### Projects to Feature

| Project | Brief | Link |
|---------|-------|------|
| **VoiceCart** | AI-powered voice commerce app | `/projects/voicecart` |
| **Fluxa** | Smart personal finance tracker | `/projects/fluxa` |
| **Mangkasir** | Point-of-sale mobile application | `/projects/mangkasir` |
| **Marketiv** | UMKM–Creator hybrid marketplace | `/projects/marketiv` |

### Visual Composition — Bento Grid

```
┌──────────────────────┬─────────────────┐
│                      │    FLUXA        │
│   VOICECART          │    (tall card)  │
│   (wide, featured)   ├─────────────────┤
│                      │   MANGKASIR     │
├──────────────────────┴─────────────────┤
│         MARKETIV (full-width)           │
└─────────────────────────────────────────┘
```

Each card contains: thumbnail image, project name, 2-3 tech stack badges, year, and a subtle "→" arrow that scales on hover.

### 21st.dev Components Used

| Component | Role |
|-----------|------|
| `BentoGrid` | The grid layout system with variable column spans |
| `ProjectCard` | Individual bento cell with 3D tilt effect on mouse move |

### GSAP & Lenis Animation

**On scroll into view (ScrollTrigger):**
```
Trigger: when section top hits 80% of viewport height
Animation: Cards stagger in from y:60, opacity:0
  - Duration: 0.8s per card, stagger: 0.15s
  - Ease: 'power3.out'
```

**Lenis Parallax on scroll (per card):**
```
Each card has a data-speed attribute (0.95 to 1.05).
On Lenis scroll event, GSAP sets y position = scrollVelocity * (1 - dataSpeed) * 50
This creates a subtle depth differential between cards.
```

**Hover (3D Tilt — ClientComponent):**
```
onMouseMove on card container:
  rotateX = (mouseY - cardCenterY) / cardHeight * 12   (max ±12deg)
  rotateY = (mouseX - cardCenterX) / cardWidth  * 12
  gsap.to(card, { rotateX, rotateY, duration: 0.4, ease: 'power2.out' })
  gsap.to(cardGlare, { opacity: 0.15, x: mouseX, y: mouseY })

onMouseLeave:
  gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1, 0.8)' })
  gsap.to(cardGlare, { opacity: 0 })
```

### Data Fetching (RSC)

```tsx
// components/sections/selected-works.tsx
// This is a SERVER Component — no 'use client'
import { getFeaturedProjects } from '@/lib/supabase/queries'
import BentoGrid from '@/components/blocks/bento-grid'
import ProjectCard from '@/components/sections/project-card'

export default async function SelectedWorks() {
  // Fetches directly in RSC — no useEffect, no loading state needed here
  const projects = await getFeaturedProjects()

  return (
    <section id="works" className="px-6 md:px-16 lg:px-24 py-32">
      <h2 className="font-display text-fluid-xl mb-16">Selected Works</h2>
      <BentoGrid>
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </BentoGrid>
    </section>
  )
}
```

### `app/projects/[slug]/page.tsx` — Case Study Deep Dive

```tsx
// app/projects/[slug]/page.tsx
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/supabase/queries'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

// Static params for ISR/SSG
export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug)
  if (!project) notFound()

  return (
    <article className="max-w-4xl mx-auto px-6 py-32">
      <h1 className="font-display text-fluid-xl mb-4">{project.title}</h1>
      <p className="text-muted mb-12">{project.description}</p>
      {/* Tech stack badges */}
      <div className="flex flex-wrap gap-2 mb-16">
        {project.tech_stack.map((tech) => (
          <span key={tech} className="px-3 py-1 bg-foreground text-background text-sm rounded-full">
            {tech}
          </span>
        ))}
      </div>
      {/* Markdown case study content */}
      <ReactMarkdown className="prose prose-neutral max-w-none">
        {project.content_md ?? ''}
      </ReactMarkdown>
    </article>
  )
}
```

---

## Section 3 — `About & Philosophy`

**File:** `components/sections/about-section.tsx`

### Purpose
Humanize the developer. Move from proof to person. This section combines a personal bio with a kinetic display of technical breadth.

### Visual Composition

```
┌─────────────────────────────────────────────────────┐
│  ABOUT                            [masked portrait]  │
│                                                      │
│  I'm a mobile & web developer     ← running text    │
│  based in Sukabumi, Indonesia,                       │
│  studying Informatics Engineering                    │
│  at Universitas Nusa Putra.                          │
│                                                      │
│  I build with intention — ...                        │
│                                                      │
│ ─────────────────────────────────────────────────── │
│  → Flutter  Next.js  React Native  Supabase  GSAP ← │
│  ← Flutter  Next.js  React Native  Supabase  GSAP → │
│ ─────────────────────────────────────────────────── │
└─────────────────────────────────────────────────────┘
```

### 21st.dev Components Used

| Component | Role |
|-----------|------|
| `MarqueeText` | Two rows of tech stack names: row 1 moves right, row 2 moves left (CSS + GSAP speed control tied to Lenis scroll velocity) |
| Profile image | Organic blob mask applied via CSS `clip-path: path(...)` — shape morphs slightly on hover via GSAP |

### Organic Image Mask

```css
/* In globals.css or a module */
.profile-mask {
  clip-path: path("M 0,100 C 30,120 70,120 100,100 C 130,80 130,20 100,0 C 70,-20 30,-20 0,0 C -30,20 -30,80 0,100 Z");
  transition: clip-path 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.profile-mask:hover {
  clip-path: path("M 0,110 C 40,130 60,130 100,110 C 140,90 140,10 100,-10 C 60,-30 40,-30 0,-10 C -40,10 -40,90 0,110 Z");
}
```

### GSAP Animation

**Marquee speed tied to Lenis scroll velocity:**
```tsx
// In about-section.tsx (Client island)
'use client'
import { useLenis } from 'lenis/react'

export function MarqueeSpeed() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useLenis(({ velocity }) => {
    // Speed up marquee proportional to scroll speed
    gsap.to(marqueeRef.current, {
      '--marquee-duration': `${Math.max(20 - Math.abs(velocity) * 2, 8)}s`,
      duration: 0.4,
    })
  })

  return <div ref={marqueeRef} className="marquee-track">...</div>
}
```

**Bio text reveal (ScrollTrigger):**
```
Trigger: when bio paragraph enters viewport
Animation: Each line reveals from behind a clip-path mask
  - clipPath from 'inset(0 100% 0 0)' to 'inset(0 0% 0 0)'
  - Duration: 0.9s, stagger: 0.1s per line
  - Ease: 'power4.inOut'
```

---

## Section 4 — `ExperienceJourney` (Timeline)

**File:** `components/sections/experience-journey.tsx`

### Purpose
Show growth and context. Not a static list — the timeline draws itself as the user scrolls through it.

### Experiences to Populate

```
2022 – Present   Informatics Engineering Student
                 Universitas Nusa Putra, Sukabumi
                 Focus: Mobile Dev, AI integrations, software architecture

2025             P2MW (Program Pembinaan Mahasiswa Wirausaha)
                 Marketiv — Hybrid Marketplace Platform
                 National-level university entrepreneurship program

2025             Mobile Developer Intern
                 Mangcoding, Remote
                 Built production Flutter features for client apps
```

### Visual Composition

```
┌─────────────────────────────────────────────────────┐
│  EXPERIENCE                                          │
│                                                      │
│  ●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ (line draws)    │
│  │                                                   │
│  ├─● 2022 — Informatics Engineering Student          │
│  │         Universitas Nusa Putra                    │
│  │         [description fades in]                   │
│  │                                                   │
│  ├─● 2025 — P2MW Program                             │
│  │         Marketiv · National Competition           │
│  │                                                   │
│  └─● 2025 — Mobile Developer Intern                  │
│             Mangcoding                               │
└─────────────────────────────────────────────────────┘
```

### GSAP ScrollTrigger

```tsx
// components/sections/experience-journey.tsx
'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ExperienceJourney({ experiences }: { experiences: Experience[] }) {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    // 1. Draw the vertical line
    gsap.from('.timeline-line', {
      scaleY: 0,
      transformOrigin: 'top center',
      duration: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.timeline-line',
        start: 'top 70%',
        end: 'bottom 30%',
        scrub: 1.5,   // Line draws smoothly as user scrolls
      },
    })

    // 2. Each experience node pops in
    gsap.utils.toArray<HTMLElement>('.timeline-node').forEach((node) => {
      gsap.from(node, {
        x: -40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: node,
          start: 'top 80%',
        },
      })
    })

    // 3. Each description fades in after node
    gsap.utils.toArray<HTMLElement>('.timeline-content').forEach((content) => {
      gsap.from(content, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: content,
          start: 'top 82%',
        },
      })
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative px-6 md:px-16 lg:px-24 py-32">
      <h2 className="font-display text-fluid-xl mb-24">Experience</h2>
      <div className="relative">
        <div className="timeline-line absolute left-0 top-0 bottom-0 w-px bg-foreground origin-top" />
        <div className="pl-12 space-y-24">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative">
              <div className="timeline-node absolute -left-12 w-3 h-3 rounded-full bg-accent mt-1.5" />
              <div className="timeline-content">
                <span className="text-sm text-muted font-mono">{exp.start_date} — {exp.end_date ?? 'Present'}</span>
                <h3 className="text-2xl font-display mt-1">{exp.role}</h3>
                <p className="text-muted mt-1">{exp.company}</p>
                <p className="mt-4 max-w-xl leading-relaxed">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## Section 5 — `AllProjects` (Archive)

**Files:** `components/sections/all-projects.tsx` · `components/sections/project-row.tsx`

### Purpose
Full breadth of work. Every project — including campus projects, experiments, and side builds — in a minimal, scannable list. The interaction rewards curiosity.

### Visual Composition

```
┌─────────────────────────────────────────────────────┐
│  ALL PROJECTS                           [2022–2025]  │
│                                                      │
│  ─────────────────────────────────────────────────  │
│  01  VoiceCart        Flutter · AI      2025  →      │
│  02  Fluxa            Flutter · BaaS    2025  →      │
│  03  Marketiv         Next.js · AI      2025  →      │
│  04  Mangkasir        Flutter · GetX    2024  →      │
│  05  [campus project] React · Firebase  2023  →      │
│  06  [campus project] ...               2022  →      │
│  ─────────────────────────────────────────────────  │
│                     [cursor near row triggers image] │
│                     [image floats next to cursor]    │
└─────────────────────────────────────────────────────┘
```

### 21st.dev Components Used

| Component | Role |
|-----------|------|
| `HoverRevealRow` | Each table row: on cursor enter, a project thumbnail image floats and follows the cursor within the row's bounds. On leave, image fades and scales down |

### Hover Reveal Implementation

```tsx
// components/sections/project-row.tsx
'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/types'

export default function ProjectRow({ project, index }: { project: Project; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const row = rowRef.current
    const image = imageRef.current
    if (!row || !image) return

    const handleMouseEnter = () => {
      gsap.to(image, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' })
      // Also highlight row text
      gsap.to(row.querySelectorAll('.row-text'), { color: '#0A0A0A', duration: 0.2 })
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = row.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      // Image follows cursor but clamped to row bounds
      gsap.to(image, {
        x: Math.min(Math.max(x - 80, -20), rect.width - 140),
        y: y - 80,
        duration: 0.5,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(image, { opacity: 0, scale: 0.9, duration: 0.25, ease: 'power2.in' })
    }

    row.addEventListener('mouseenter', handleMouseEnter)
    row.addEventListener('mousemove', handleMouseMove)
    row.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      row.removeEventListener('mouseenter', handleMouseEnter)
      row.removeEventListener('mousemove', handleMouseMove)
      row.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, { scope: rowRef })

  return (
    <Link href={`/projects/${project.slug}`}>
      <div
        ref={rowRef}
        className="relative flex items-center justify-between py-6 border-b border-border group overflow-hidden"
      >
        {/* Floating image — hidden by default */}
        <div
          ref={imageRef}
          className="pointer-events-none absolute z-10 w-40 h-28 opacity-0 scale-90 rounded-lg overflow-hidden shadow-2xl"
          style={{ top: 0, left: 0 }}
        >
          <Image src={project.thumbnail_url} alt={project.title} fill className="object-cover" />
        </div>

        {/* Row content */}
        <div className="flex items-center gap-8">
          <span className="row-text font-mono text-sm text-muted w-8">{String(index + 1).padStart(2, '0')}</span>
          <span className="row-text font-display text-2xl">{project.title}</span>
        </div>
        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-2">
            {project.tech_stack.slice(0, 2).map((tech) => (
              <span key={tech} className="row-text text-sm text-muted">{tech}</span>
            ))}
          </div>
          <span className="row-text font-mono text-sm text-muted">
            {new Date(project.created_at).getFullYear()}
          </span>
          <span className="row-text text-muted group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </Link>
  )
}
```

---

## Section 6 — `Footer` (Let's Connect)

**File:** `components/sections/footer-section.tsx`

### Purpose
The payoff. A dramatic full-screen footer that emerges from behind the content above (pinned reveal effect). Contains all contact and social links, with the custom cursor expanding on hover.

### Visual Composition

```
┌─────────────────────────────────────────────────────┐
│                                                      │
│  LET'S          ← massive display text              │
│  CONNECT.                                            │
│                                                      │
│  hello@yourdomain.com   ← email (cursor expands)    │
│                                                      │
│  ─────────────────────────────────────────────────  │
│  GitHub      LinkedIn      Twitter/X      Dribbble   │
│                                                      │
│  Built with Next.js 15 & ♥     © 2025 Your Name    │
└─────────────────────────────────────────────────────┘
```

### 21st.dev Custom Cursor Interaction

The global `CustomCursor` component tracks mouse position via `useMousePosition()`. On hovering over social links and the email:

```tsx
// Social link hover → cursor expands and changes label
<a
  href="https://github.com/yourusername"
  data-cursor="GitHub"           // ← Custom data attribute read by CustomCursor
  data-cursor-size="80"          // ← Cursor inflates to 80px diameter
  data-cursor-color="#0A0A0A"    // ← Cursor background changes
  className="text-fluid-lg font-display hover:text-accent transition-colors"
>
  GitHub
</a>
```

`CustomCursor` reads these `data-cursor-*` attributes via `document.querySelectorAll('[data-cursor]')` event listeners and animates the cursor circle with GSAP.

### Pinned Reveal Effect (GSAP ScrollTrigger)

The footer "slides up" from underneath as if the page peels away:

```tsx
useGSAP(() => {
  gsap.fromTo('.footer-container', {
    yPercent: -30,
    opacity: 0,
  }, {
    yPercent: 0,
    opacity: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: '.footer-trigger',  // Empty div above footer
      start: 'top bottom',
      end: 'bottom bottom',
      scrub: true,
    },
  })
}, { scope: footerRef })
```

### Social Links

```tsx
const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/yourusername', cursorColor: '#24292e' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/yourprofile', cursorColor: '#0077b5' },
  { label: 'Instagram', href: 'https://instagram.com/yourhandle', cursorColor: '#e1306c' },
] as const
```

---

## Page Composition (`app/page.tsx`)

```tsx
// app/page.tsx — Server Component shell
import HeroSection from '@/components/sections/hero-section'
import SelectedWorks from '@/components/sections/selected-works'
import AboutSection from '@/components/sections/about-section'
import ExperienceJourney from '@/components/sections/experience-journey'
import AllProjects from '@/components/sections/all-projects'
import FooterSection from '@/components/sections/footer-section'
import { getExperiences, getAllProjects } from '@/lib/supabase/queries'

export default async function HomePage() {
  // Parallel RSC data fetching — no waterfalls
  const [experiences, allProjects] = await Promise.all([
    getExperiences(),
    getAllProjects(),
  ])

  return (
    <main>
      <HeroSection />
      <SelectedWorks />
      <AboutSection />
      <ExperienceJourney experiences={experiences} />
      <AllProjects projects={allProjects} />
      <FooterSection />
    </main>
  )
}
```

---

*Continue reading: [DATABASE.md](DATABASE.md)*
