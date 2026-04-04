# docs/DATABASE.md — Supabase Schema & Type Safety

> **Navigation:** [README.md](README.md) · [FEATURES.md](FEATURES.md) · [DATABASE.md](DATABASE.md) · [TECHNICAL_GUIDELINES.md](TECHNICAL_GUIDELINES.md)

---

## 1. Schema Design Overview

The database is intentionally minimal. This is a read-heavy portfolio — data is written by the owner (admin) via Supabase Studio or a lightweight admin panel, and read publicly by visitors.

```
public schema
│
├── projects          ← All portfolio projects (featured + archive)
└── experiences       ← Career/education timeline entries
```

No auth tables needed — Supabase Auth is used only to protect write operations.

---

## 2. DDL — Table Definitions

### 2.1 `projects`

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE public.projects (
  -- Identity
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug          TEXT NOT NULL UNIQUE,           -- URL-safe identifier e.g. 'voicecart'

  -- Display
  title         TEXT NOT NULL,                  -- e.g. 'VoiceCart'
  tagline       TEXT,                           -- One-liner e.g. 'AI-powered voice commerce'
  description   TEXT NOT NULL,                  -- 2-3 sentence summary for cards
  thumbnail_url TEXT NOT NULL,                  -- Supabase Storage public URL
  cover_url     TEXT,                           -- Full-width header image for case study page

  -- Metadata
  tech_stack    TEXT[] NOT NULL DEFAULT '{}',   -- e.g. ['Flutter', 'Supabase', 'GetX']
  role          TEXT,                           -- e.g. 'Lead Developer'
  year          SMALLINT,                       -- e.g. 2025
  status        TEXT DEFAULT 'completed'        -- 'completed' | 'in-progress' | 'archived'
                  CHECK (status IN ('completed', 'in-progress', 'archived')),

  -- Visibility
  is_featured   BOOLEAN NOT NULL DEFAULT FALSE, -- Show in SelectedWorks bento grid
  sort_order    SMALLINT DEFAULT 0,             -- Manual ordering for featured grid

  -- Case study content
  content_md    TEXT,                           -- Full Markdown for /projects/[slug] page
  live_url      TEXT,                           -- Production URL (optional)
  github_url    TEXT,                           -- GitHub repo (optional)

  -- Timestamps
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_projects_updated
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Indexes for common query patterns
CREATE INDEX idx_projects_is_featured ON public.projects (is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_projects_slug       ON public.projects (slug);
CREATE INDEX idx_projects_year_desc  ON public.projects (year DESC);
```

### 2.2 `experiences`

```sql
CREATE TABLE public.experiences (
  -- Identity
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Content
  role          TEXT NOT NULL,       -- e.g. 'Mobile Developer Intern'
  company       TEXT NOT NULL,       -- e.g. 'Mangcoding'
  company_url   TEXT,                -- Optional link to company website
  location      TEXT,                -- e.g. 'Remote' or 'Sukabumi, Indonesia'
  description   TEXT NOT NULL,       -- 2-4 sentences about the role/achievement

  -- Dates (stored as text for flexibility — e.g. "2025", "Jan 2025")
  start_date    TEXT NOT NULL,       -- e.g. '2022' or 'Jan 2022'
  end_date      TEXT,                -- NULL means 'Present'

  -- Type
  type          TEXT DEFAULT 'work'
                  CHECK (type IN ('work', 'education', 'competition', 'volunteer')),

  -- Display
  sort_order    SMALLINT DEFAULT 0,  -- Ascending order = oldest first in timeline

  -- Timestamps
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_experiences_sort ON public.experiences (sort_order ASC);
```

---

## 3. Seed Data

```sql
-- Insert featured projects
INSERT INTO public.projects (slug, title, tagline, description, thumbnail_url, tech_stack, is_featured, sort_order, year, status) VALUES
(
  'voicecart',
  'VoiceCart',
  'AI-powered voice commerce app',
  'A Flutter app enabling users to shop hands-free using natural voice commands. Integrates speech recognition with LLM-based intent parsing to fill shopping carts automatically.',
  'https://your-project.supabase.co/storage/v1/object/public/thumbnails/voicecart.jpg',
  ARRAY['Flutter', 'Supabase', 'GetX', 'OpenAI'],
  TRUE, 1, 2025, 'completed'
),
(
  'fluxa',
  'Fluxa',
  'Smart personal finance tracker',
  'A freemium finance app with AI receipt scanning, voice recording, and offline-first sync. Built with Clean Architecture and a robust sqflite + Supabase dual-layer.',
  'https://your-project.supabase.co/storage/v1/object/public/thumbnails/fluxa.jpg',
  ARRAY['Flutter', 'Supabase', 'GetX', 'sqflite', 'AI'],
  TRUE, 2, 2025, 'in-progress'
),
(
  'marketiv',
  'Marketiv',
  'UMKM–Creator hybrid marketplace',
  'A hybrid marketplace connecting local MSMEs with micro creators through a campaign (pay-per-view) and rate card model. Built for the P2MW 2025 national entrepreneurship program.',
  'https://your-project.supabase.co/storage/v1/object/public/thumbnails/marketiv.jpg',
  ARRAY['Next.js', 'Supabase', 'Midtrans', 'OpenAI', 'TypeScript'],
  TRUE, 3, 2025, 'in-progress'
),
(
  'mangkasir',
  'Mangkasir',
  'Point-of-sale mobile application',
  'A Flutter-based POS system built during internship at Mangcoding. Features real-time inventory, transaction management, and offline capability with background sync.',
  'https://your-project.supabase.co/storage/v1/object/public/thumbnails/mangkasir.jpg',
  ARRAY['Flutter', 'GetX', 'REST API', 'sqflite'],
  TRUE, 4, 2024, 'completed'
);

-- Insert experiences
INSERT INTO public.experiences (role, company, location, description, start_date, end_date, type, sort_order) VALUES
(
  'Informatics Engineering Student',
  'Universitas Nusa Putra',
  'Sukabumi, Indonesia',
  'Pursuing a degree in Informatics Engineering with a focus on mobile development, software architecture, and AI integration. Building production-grade apps as coursework and side projects.',
  '2022', NULL, 'education', 1
),
(
  'P2MW Participant — Marketiv',
  'Kemdiktisaintek RI',
  'National Program',
  'Led the development of Marketiv, a hybrid marketplace platform, under the national Program Pembinaan Mahasiswa Wirausaha (P2MW) 2025. Responsible for full-stack architecture, Supabase backend, and AI integrations.',
  '2025', '2025', 'competition', 2
),
(
  'Mobile Developer Intern',
  'Mangcoding',
  'Remote',
  'Developed production Flutter features for client-facing applications. Implemented Clean Architecture patterns, offline-first strategies with sqflite, and integrated REST APIs with proper error handling.',
  '2025', '2025', 'work', 3
);
```

---

## 4. Row Level Security (RLS)

**Principle:** All portfolio data is public-read. Only the authenticated owner can write.

```sql
-- Enable RLS on both tables
ALTER TABLE public.projects    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;

-- ─── PROJECTS ───────────────────────────────────────────────────────────────

-- Policy 1: Anyone can read projects (public portfolio data)
CREATE POLICY "Public can read projects"
  ON public.projects
  FOR SELECT
  TO anon, authenticated          -- Both anonymous visitors and logged-in users
  USING (TRUE);

-- Policy 2: Only the authenticated owner can insert
CREATE POLICY "Owner can insert projects"
  ON public.projects
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);  -- Simplified: any authenticated user = owner (single-user portfolio)

-- Policy 3: Only the authenticated owner can update
CREATE POLICY "Owner can update projects"
  ON public.projects
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- Policy 4: Only the authenticated owner can delete
CREATE POLICY "Owner can delete projects"
  ON public.projects
  FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- ─── EXPERIENCES ────────────────────────────────────────────────────────────

CREATE POLICY "Public can read experiences"
  ON public.experiences
  FOR SELECT
  TO anon, authenticated
  USING (TRUE);

CREATE POLICY "Owner can insert experiences"
  ON public.experiences
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Owner can update experiences"
  ON public.experiences
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Owner can delete experiences"
  ON public.experiences
  FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);
```

> **Important:** The Supabase `ANON` key is safe to expose in `NEXT_PUBLIC_*` env vars because RLS prevents all write operations from unauthenticated requests. The `SERVICE_ROLE_KEY` must NEVER be exposed client-side.

---

## 5. TypeScript Interfaces

### 5.1 Raw Supabase Types (`types/supabase.ts`)

This file is auto-generated. Run `npx supabase gen types typescript ...` and do not edit manually.

```ts
// types/supabase.ts — AUTO-GENERATED, DO NOT EDIT MANUALLY
// Run: npx supabase gen types typescript --project-id YOUR_ID > types/supabase.ts

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          slug: string
          title: string
          tagline: string | null
          description: string
          thumbnail_url: string
          cover_url: string | null
          tech_stack: string[]
          role: string | null
          year: number | null
          status: 'completed' | 'in-progress' | 'archived'
          is_featured: boolean
          sort_order: number
          content_md: string | null
          live_url: string | null
          github_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['projects']['Insert']>
      }
      experiences: {
        Row: {
          id: string
          role: string
          company: string
          company_url: string | null
          location: string | null
          description: string
          start_date: string
          end_date: string | null
          type: 'work' | 'education' | 'competition' | 'volunteer'
          sort_order: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['experiences']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['experiences']['Insert']>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
```

### 5.2 Domain Interfaces (`types/index.ts`)

Use these in component props and function signatures. They extract from the Supabase types for clean usage:

```ts
// types/index.ts
import type { Database } from './supabase'

// ─── Projects ───────────────────────────────────────────────────────────────

/** Full project record as returned from Supabase */
export type Project = Database['public']['Tables']['projects']['Row']

/** Minimal data needed for the bento grid cards */
export type ProjectCard = Pick<
  Project,
  'slug' | 'title' | 'tagline' | 'thumbnail_url' | 'tech_stack' | 'year' | 'is_featured' | 'sort_order'
>

/** Minimal data needed for the archive table rows */
export type ProjectRow = Pick<
  Project,
  'slug' | 'title' | 'tech_stack' | 'year' | 'thumbnail_url' | 'created_at'
>

/** Full data for the case study page */
export type ProjectDetail = Project  // Use the full Row type

// ─── Experiences ─────────────────────────────────────────────────────────────

/** Full experience record */
export type Experience = Database['public']['Tables']['experiences']['Row']

/** Minimal data for timeline display */
export type ExperienceItem = Pick<
  Experience,
  'id' | 'role' | 'company' | 'company_url' | 'location' | 'description' | 'start_date' | 'end_date' | 'type'
>
```

---

## 6. Supabase Query Functions (`lib/supabase/queries.ts`)

All data fetching is centralized here. These functions are called exclusively from **Server Components**.

```ts
// lib/supabase/queries.ts
import { createClient } from '@/lib/supabase/server'
import type { Project, ProjectCard, ProjectRow, ProjectDetail, Experience } from '@/types'

// ─── Projects ───────────────────────────────────────────────────────────────

/** Fetch top featured projects for the bento grid (max 4) */
export async function getFeaturedProjects(): Promise<ProjectCard[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select('slug, title, tagline, thumbnail_url, tech_stack, year, is_featured, sort_order')
    .eq('is_featured', true)
    .order('sort_order', { ascending: true })
    .limit(4)

  if (error) {
    console.error('[getFeaturedProjects]', error.message)
    return []
  }
  return data
}

/** Fetch all projects for the archive table */
export async function getAllProjects(): Promise<ProjectRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select('slug, title, tech_stack, year, thumbnail_url, created_at')
    .order('year', { ascending: false })

  if (error) {
    console.error('[getAllProjects]', error.message)
    return []
  }
  return data
}

/** Fetch a single project by slug for the case study page */
export async function getProjectBySlug(slug: string): Promise<ProjectDetail | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null  // Not found
    console.error('[getProjectBySlug]', error.message)
    return null
  }
  return data
}

/** Fetch all slugs for generateStaticParams() */
export async function getAllProjectSlugs(): Promise<string[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select('slug')

  if (error) return []
  return data.map((p) => p.slug)
}

// ─── Experiences ─────────────────────────────────────────────────────────────

/** Fetch all experiences ordered chronologically */
export async function getExperiences(): Promise<Experience[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('[getExperiences]', error.message)
    return []
  }
  return data
}
```

---

## 7. Supabase Client Setup

### `lib/supabase/server.ts` (for RSC and Server Actions)

```ts
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/supabase'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch {
            // In RSC, setAll may be called from a Server Component (read-only context)
            // This is safe to ignore for portfolio (no auth mutations in RSC)
          }
        },
      },
    }
  )
}
```

### `lib/supabase/client.ts` (for Client Components — rarely needed in this portfolio)

```ts
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/supabase'

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
```

### `lib/utils.ts`

```ts
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind classes safely. Always use this instead of string interpolation. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

*Continue reading: [TECHNICAL_GUIDELINES.md](TECHNICAL_GUIDELINES.md)*
