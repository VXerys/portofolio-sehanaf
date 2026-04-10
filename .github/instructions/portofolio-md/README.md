# docs/README.md — Architecture & Bootstrapping

> **Navigation:** [README.md](README.md) · [FEATURES.md](FEATURES.md) · [DATABASE.md](DATABASE.md) · [TECHNICAL_GUIDELINES.md](TECHNICAL_GUIDELINES.md)

---

## 1. Executive Summary

This is an **Awwwards/FWA-calibre** developer portfolio built on the Next.js 15 App Router. Every architectural decision is made in service of two non-negotiable objectives: **maximum creative expression** and **uncompromising performance**.

### Design Philosophy

| Principle | Implementation |
|-----------|---------------|
| **Bold Typography First** | Massive viewport-filling type as the primary visual element, not decoration |
| **Motion with Purpose** | Every GSAP animation has a narrative reason — it reveals, guides, or rewards |
| **60fps Guarantee** | GSAP + `will-change`, `transform` only, `gsap.matchMedia()` for mobile degradation |
| **DaisyUI Semantic Theme** | Use semantic tokens from `app/globals.css` (e.g. `bg-base-100`, `text-base-content`, `text-primary`, `border-base-300`) |
| **Progressive Disclosure** | Content reveals as the user scrolls — never overwhelm on first paint |

### Architecture at a Glance

```
Next.js 15 App Router (RSC-first)
│
├─ Server Components fetch data directly from Supabase (no useEffect, no API routes for reads)
├─ GSAP animations are Client Components only, wrapped with useGSAP() hook
├─ Lenis smooth scroll is a global Client Provider injected into the root layout
├─ shadcn/ui provides the accessible base layer (Dialog, Sheet, Tooltip)
└─ 21st.dev components handle all creative/animated UI (gradients, cursors, bento)
```

---

## 2. Directory Tree

```
portfolio/
│
├── app/                                    # Next.js App Router root
│   ├── layout.tsx                          # Root layout: fonts, LenisProvider, custom cursor
│   ├── page.tsx                            # Homepage (all sections composed here)
│   ├── globals.css                         # Tailwind directives + CSS custom properties
│   │
│   └── projects/
│       └── [slug]/
│           ├── page.tsx                    # Dynamic case study page (RSC, fetches from Supabase)
│           └── loading.tsx                 # Skeleton loader for case study
│
├── components/
│   │
│   ├── ui/                                 # shadcn/ui base components (DO NOT modify internals)
│   │   ├── button.tsx                      # shadcn Button primitive
│   │   ├── badge.tsx                       # Tech stack tags
│   │   ├── dialog.tsx                      # Image lightbox base
│   │   ├── separator.tsx                   # Dividers
│   │   └── tooltip.tsx                     # Hover tooltips on project cards
│   │
│   ├── blocks/                             # 21st.dev complex animated UI blocks
│   │   ├── animated-gradient-bg.tsx        # Hero section animated gradient background
│   │   ├── bento-grid.tsx                  # Works section bento grid layout system
│   │   ├── magnetic-button.tsx             # Magnetic CTA "View Work" button
│   │   ├── custom-cursor.tsx               # Global expanding/morphing custom cursor
│   │   ├── marquee-text.tsx                # About section scrolling tech-stack marquee
│   │   ├── hover-reveal-row.tsx            # AllProjects table row with image reveal on hover
│   │   └── text-reveal-mask.tsx            # GSAP clip-path text reveal wrapper
│   │
│   ├── anim/                               # GSAP wrappers & animation utilities (Client only)
│   │   ├── lenis-provider.tsx              # 'use client' — ReactLenis global smooth scroll provider
│   │   ├── gsap-provider.tsx               # GSAP plugin registration (ScrollTrigger, etc.)
│   │   ├── parallax-wrapper.tsx            # Generic GSAP parallax ScrollTrigger wrapper
│   │   ├── stagger-reveal.tsx              # Staggered children reveal on scroll
│   │   └── split-text.tsx                  # Character/word split for GSAP text animations
│   │
│   └── sections/                           # Full page sections (mix of RSC shell + Client islands)
│       ├── hero-section.tsx                # The Hook — name, tagline, magnetic CTA
│       ├── selected-works.tsx              # Bento grid project showcase (RSC, passes data to client)
│       ├── project-card.tsx                # Individual bento card (Client — tilt, hover)
│       ├── about-section.tsx               # Bio + marquee + masked profile image
│       ├── experience-journey.tsx          # Scroll-triggered vertical timeline
│       ├── all-projects.tsx                # Archive table (RSC shell)
│       ├── project-row.tsx                 # Individual archive row (Client — hover reveal)
│       └── footer-section.tsx              # Full-screen footer with social links
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts                       # Browser client (for client components, if needed)
│   │   ├── server.ts                       # Server client (cookies-based, for RSC & Server Actions)
│   │   └── queries.ts                      # All typed Supabase fetch functions
│   │
│   └── utils.ts                            # cn() helper (clsx + tailwind-merge)
│
├── types/
│   ├── supabase.ts                         # Auto-generated Supabase DB types (npx supabase gen types)
│   └── index.ts                            # Domain interfaces (Project, Experience, etc.)
│
├── hooks/
│   ├── use-mouse-position.ts               # Raw mouse XY for magnetic effects
│   └── use-media-query.ts                  # SSR-safe viewport width hook
│
├── public/
│   ├── fonts/                              # Self-hosted variable fonts
│   │   ├── inter/Inter-VariableFont_opsz,wght.ttf                # Secondary/body variable font
│   │   ├── inter/Inter-Italic-VariableFont_opsz,wght.ttf         # Secondary/body italic variable font
│   │   └── maghfirea/Maghfirea.ttf                                 # Primary display font
│   └── images/
│       └── profile.jpg                     # Developer portrait (organic mask applied in CSS)
│
├── tailwind.config.ts                      # Extended theme: fonts, colors, animation keyframes
├── next.config.ts                          # Image domains (Supabase Storage), etc.
├── tsconfig.json                           # Strict mode: true
└── docs/
    ├── README.md                           # ← This file
    ├── FEATURES.md
    ├── DATABASE.md
    └── TECHNICAL_GUIDELINES.md
```

---

## 3. Core Setup Commands

Execute in order. Do not skip steps.

### 3.1 — Bootstrap Next.js 15 with TypeScript & Tailwind

```bash
npx create-next-app@latest portfolio \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd portfolio
```

> **Note:** When prompted, choose `App Router: Yes`. This is non-negotiable for RSC data fetching.

### 3.2 — Initialize shadcn/ui

```bash
npx shadcn@latest init
```

When prompted:
- Style: **Default**
- Base color: **Neutral** (we override with custom tokens)
- CSS variables: **Yes**

Install only the components we need:

```bash
npx shadcn@latest add button badge dialog separator tooltip
```

### 3.3 — Install GSAP (Club Member Build recommended for commercial use)

```bash
# Standard (public build)
npm install gsap @gsap/react

# If you have GSAP Club membership (for SplitText, Flip, etc.):
# Follow GSAP's private registry setup, then:
# npm install gsap@npm:@gsap/shockingly-green
```

Register plugins in `components/anim/gsap-provider.tsx` (see TECHNICAL_GUIDELINES.md for exact pattern).

### 3.4 — Install Lenis for Smooth Scrolling

```bash
npm install lenis
```

> Lenis replaces native scroll. It must be initialized as a Client Component provider in `layout.tsx`. See `components/anim/lenis-provider.tsx` and TECHNICAL_GUIDELINES.md for the exact SSR-safe implementation.

### 3.5 — Install Supabase

```bash
npm install @supabase/supabase-js @supabase/ssr
```

Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
# Server-only (never expose to client):
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3.6 — Install Utility Libraries

```bash
npm install clsx tailwind-merge
```

### 3.7 — Generate Supabase Types (run after schema is set up)

```bash
npx supabase gen types typescript \
  --project-id your-project-id \
  --schema public \
  > types/supabase.ts
```

Re-run this command every time you change the database schema.

### 3.8 — Root Layout Setup

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import LenisProvider from '@/components/anim/lenis-provider'
import CustomCursor from '@/components/blocks/custom-cursor'
import './globals.css'

const inter = localFont({
  src: [
    {
      path: '../public/fonts/inter/Inter-VariableFont_opsz,wght.ttf',
      style: 'normal',
      weight: '100 900',
    },
    {
      path: '../public/fonts/inter/Inter-Italic-VariableFont_opsz,wght.ttf',
      style: 'italic',
      weight: '100 900',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
})

const maghfirea = localFont({
  src: '../public/fonts/maghfirea/Maghfirea.ttf',
  variable: '--font-maghfirea',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Your Name — Mobile & Web Developer',
  description: 'Crafting mobile and web experiences that matter.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${maghfirea.variable}`}>
      <body className="bg-base-100 text-base-content antialiased cursor-none">
        <LenisProvider>
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
```

---

## 4. Environment & Config

### `app/globals.css` — DaisyUI Semantic Theme Source

```css
@plugin "daisyui" {
  themes: light --default;
}

@plugin "daisyui/theme" {
  name: "light";
  default: true;
  --color-base-100: oklch(96.96% 0.016 293.756);
  --color-base-content: oklch(20% 0.042 265.755);
  --color-primary: oklch(71.772% 0.133 239.443);
  --color-border-base-300: oklch(87.61% 0.006 286.286);
}
```

Gunakan kelas semantik seperti `bg-base-100`, `text-base-content`, `text-primary`, dan `border-base-300` agar slicing konsisten lintas komponen.
Gunakan Maghfirea sebagai font display utama dan Inter sebagai font secondary/body melalui variabel global di root layout.

### `next.config.ts`

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  // Enable React compiler (Next.js 15)
  experimental: {
    reactCompiler: true,
  },
}

export default nextConfig
```

---

*Continue reading: [FEATURES.md](FEATURES.md)*
