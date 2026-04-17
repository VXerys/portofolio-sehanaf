import Image from "next/image";
import { ArrowDownRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const PORTRAIT_IMAGE =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80";

const STACKED_IMAGES = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
] as const;

export function HeroSection04() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-base-100 py-16 text-base-content md:py-20">
      <div className="relative z-20 mx-auto max-w-7xl px-6">
        <div className="relative">
          <p className="absolute -top-4 left-6 text-xs font-medium tracking-[0.35em] text-base-content/70 md:left-20 md:text-sm">
            2026
          </p>
          <h1 className="relative z-20 text-center font-display text-[2.65rem] font-bold uppercase tracking-[-0.06em] text-base-content sm:text-6xl md:text-8xl md:tracking-[-0.09em] xl:text-[10rem] xl:tracking-[-0.1em]">
            Creative Developer
          </h1>
          <p className="absolute -bottom-10 left-8 text-xl font-light tracking-[0.38em] text-base-content/80 md:left-auto md:right-20 md:text-3xl">
            SEHANAF
          </p>
        </div>

        <div className="relative grid">
          <div className="flex justify-center gap-6 pt-16 md:pt-20">
            <div className="relative h-fit w-full max-w-3xl bg-base-200/70 p-6 text-base-content md:p-10">
              <div className="space-y-1 font-sans text-sm font-semibold md:text-xl">
                <div>/ ART DIRECTION</div>
                <div>/ WEB DESIGN (UX/UI)</div>
                <div>/ WEB DEVELOPMENT</div>
              </div>

              <div className="absolute -top-8 left-1/2 hidden w-fit -translate-x-1/2 overflow-hidden border border-base-300 bg-base-200 md:flex">
                <Image
                  src={PORTRAIT_IMAGE}
                  alt="Portrait of Sehan Alfarisi"
                  width={340}
                  height={420}
                  className="h-[16.5rem] w-[12rem] object-cover grayscale"
                  priority
                />
                <div className="rotate-180 p-2 text-left text-[10px] font-medium tracking-[0.3em] text-base-content/80 [writing-mode:vertical-rl]">
                  BASED IN SUKABUMI, INDONESIA
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-6 flex w-full max-w-[16rem] overflow-hidden border border-base-300 bg-base-200 md:hidden">
            <Image
              src={PORTRAIT_IMAGE}
              alt="Portrait of Sehan Alfarisi"
              width={320}
              height={420}
              className="h-[15rem] w-[11rem] object-cover grayscale"
              priority
            />
            <div className="rotate-180 p-2 text-left text-[10px] font-medium tracking-[0.25em] text-base-content/80 [writing-mode:vertical-rl]">
              BASED IN SUKABUMI, INDONESIA
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-36">
          <p className="mx-auto max-w-3xl text-center font-mono text-xs font-medium tracking-[0.2em] text-base-content/85 md:text-base">
            I BUILD MEMORABLE DIGITAL EXPERIENCES
            <br />
            THAT ARE CLEAN, FAST, AND CONVERSION-ORIENTED
            <br />
            FOR BRANDS AND MODERN PRODUCTS.
          </p>
        </div>

        <div className="flex justify-center pt-7">
          <Button size="lg" asChild>
            <a href="#projects">Book a Call</a>
          </Button>
        </div>

        <div className="mt-16 md:mt-20 md:flex md:items-end md:justify-between">
          <div className="relative mx-auto h-52 w-72 md:mx-0 md:h-44 md:w-64">
            {STACKED_IMAGES.map((imageSrc, index) => (
              <div
                key={imageSrc}
                className="absolute h-36 w-60 overflow-hidden rounded-md border border-base-300 bg-base-100 shadow-lg"
                style={{
                  left: `${index * 1.35}rem`,
                  top: `${(2 - index) * 1.25}rem`,
                  zIndex: index + 1,
                }}
              >
                <Image
                  src={imageSrc}
                  alt="Selected portfolio work preview"
                  fill
                  sizes="240px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="mt-6 md:mt-0">
            <div className="flex items-center justify-center gap-2 md:justify-end">
              <span className="text-base font-medium tracking-[0.24em] text-base-content/80 md:text-lg">
                RECENT WORK
              </span>
              <ArrowDownRight className="h-6 w-6" aria-hidden="true" />
            </div>

            <div className="mt-3 text-center md:text-right">
              <h2 className="font-display text-4xl uppercase tracking-[-0.08em] text-base-content md:text-5xl">
                Design Without Limits
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-0 block dark:hidden"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e5e5e5 1px, transparent 1px),
            linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-0 hidden dark:block"
        style={{
          backgroundImage: `
            linear-gradient(to right, #404040 1px, transparent 1px),
            linear-gradient(to bottom, #404040 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />
    </section>
  );
}
