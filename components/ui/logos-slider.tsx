'use client';

import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import { Boxes, Database, PenTool, Rocket } from 'lucide-react';
import Image from 'next/image';
import type { ComponentType } from 'react';
import { useMemo, useState } from 'react';

type LogoItem = {
  id: string;
  description: string;
  image: string;
  className: string;
  fallbackIcon: ComponentType<{ className?: string }>;
};

const logos: LogoItem[] = [
  {
    id: 'logo-2',
    description: 'Figma',
    image: 'https://www.shadcnblocks.com/images/block/logos/figma.svg',
    className: 'h-7 w-auto',
    fallbackIcon: PenTool,
  },
  {
    id: 'logo-3',
    description: 'Next.js',
    image: 'https://www.shadcnblocks.com/images/block/logos/nextjs.svg',
    className: 'h-7 w-auto',
    fallbackIcon: Boxes,
  },
  {
    id: 'logo-6',
    description: 'Supabase',
    image: 'https://www.shadcnblocks.com/images/block/logos/supabase.svg',
    className: 'h-7 w-auto',
    fallbackIcon: Database,
  },
  {
    id: 'logo-8',
    description: 'Vercel',
    image: 'https://www.shadcnblocks.com/images/block/logos/vercel.svg',
    className: 'h-7 w-auto',
    fallbackIcon: Rocket,
  },
];

export function LogosSlider() {
  const [failedLogos, setFailedLogos] = useState<string[]>([]);

  const failedSet = useMemo(() => new Set(failedLogos), [failedLogos]);

  const handleImageError = (id: string) => {
    setFailedLogos((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  return (
    <div className="relative h-[100px] w-full overflow-hidden border-y border-base-300 bg-base-100">
      <InfiniteSlider className="flex h-full w-full items-center" duration={30} gap={48}>
        {logos.map((logo) => {
          const Icon = logo.fallbackIcon;
          const hasFailed = failedSet.has(logo.id);

          return (
            <div key={logo.id} className="flex w-32 items-center justify-center">
              {hasFailed ? (
                <span
                  aria-label={logo.description}
                  className="inline-flex h-7 w-7 items-center justify-center text-base-content/70"
                  role="img"
                >
                  <Icon className="h-6 w-6" />
                </span>
              ) : (
                <Image
                  src={logo.image}
                  alt={logo.description}
                  width={112}
                  height={28}
                  className={logo.className}
                  sizes="112px"
                  loading="lazy"
                  unoptimized
                  onError={() => handleImageError(logo.id)}
                />
              )}
            </div>
          );
        })}
      </InfiniteSlider>
      <ProgressiveBlur
        className="pointer-events-none absolute left-0 top-0 h-full w-[140px] sm:w-[200px]"
        direction="left"
        blurIntensity={1}
      />
      <ProgressiveBlur
        className="pointer-events-none absolute right-0 top-0 h-full w-[140px] sm:w-[200px]"
        direction="right"
        blurIntensity={1}
      />
    </div>
  );
}
