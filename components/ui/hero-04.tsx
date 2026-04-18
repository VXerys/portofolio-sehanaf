/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ArrowDownRight } from "lucide-react"; 
import { ButtonHoverReveal } from "@/components/ui/button-5";
import { InfiniteGrid } from "@/components/ui/infinite-grid-integration";
import { ImageSwapStack } from "@/components/ui/image-swap-stack";
  
export function HeroSection04() {
  return (
    <section className="min-h-[85vh] overflow-hidden relative pt-20 pb-2">
      <InfiniteGrid />
      <div className="mx-auto max-w-7xl relative z-20 px-6">
        <div className="relative">
          <p className="text-xs md:text-sm absolute -top-4 left-4 md:left-20 font-medium tracking-wider">
            2026
          </p>
          <h1
            className={`font-display z-20 text-base-content relative font-extrabold text-center tracking-tight md:tracking-[-4px] text-[3.25rem] leading-[1] md:text-9xl xl:tracking-[-8px] md:tracking-[-6px] xl:text-[10rem] uppercase`}
          >
            CREATIVE DEVELOPER
          </h1>
          <p className="text-xl md:text-4xl absolute -bottom-8 md:-bottom-12 left-4 md:left-24 font-thin tracking-[2px] md:tracking-[6px]">
            SEHAN ALFARISI
          </p>
        </div>

        <div className="grid relative mt-8 md:mt-0">
          <div className="space-y-8 pt-6 md:pt-20 flex gap-6 justify-center">
            <div className="flex gap-4 md:gap-6 bg-base-200 text-base-content w-full max-w-xl h-fit p-6 md:p-10 items-end space-y-2 text-lg md:text-xl font-bold md:text-2xl lg:text-3xl rounded-[var(--radius-box)] md:rounded-none mx-4 md:mx-0">
              <div className="font-semibold text-sm md:text-xl">
                <div>/ MOBILE DEVELOPMENT</div>
                <div>/ DIGITAL PRODUCTS</div>
                <div>/ AI-DRIVEN SOLUTIONS</div>
              </div>
              <div className="absolute hidden md:flex left-1/2 -top-10 w-fit overflow-hidden bg-base-200 rounded-[var(--radius-box)] md:rounded-none">
                <img
                  src="/images/projects/foto-saya.png"
                  alt="Sehan Alfarisi"
                  className="h-[400px] w-full object-contain grayscale"
                />
                <div className="text-left p-2 rotate-180 [writing-mode:vertical-rl] text-xs font-medium tracking-widest uppercase bg-base-200 text-base-content/60">
                  BASED IN SUKABUMI, IDN
                </div>
              </div>
            </div>
          </div>
          {/* Mobile safe fallback for the photo, removed absolute so it stacks cleanly instead of overlapping text */}
          <div className="flex md:hidden mx-auto mt-4 w-fit overflow-hidden bg-base-200 rounded-[var(--radius-box)]">
            <img
              src="/images/projects/foto-saya.png"
              alt="Sehan Alfarisi"
              className="max-h-[250px] w-auto object-contain grayscale"
            />
            <div className="text-left p-2 rotate-180 [writing-mode:vertical-rl] text-[10px] font-medium tracking-wide uppercase bg-base-200 text-base-content/60">
              BASED IN SUKABUMI, IDN
            </div>
          </div>
        </div>

        <div className="md:mt-40 mt-10">
          <p className="mx-auto max-w-2xl font-mono text-center text-sm font-medium tracking-wide md:text-base leading-relaxed uppercase">
            I'M A MOBILE DEVELOPER AND TECH ENTHUASIAST FOCUSED ON
            <br className="hidden md:block" />
            BRINGING DIGITAL PRODUCTS TO LIFE, fROM ZERO TO LAUNCH.
            <br className="hidden md:block" />
            I COMBINE CLEAN DEVELOPMENT PRACTICES, INTUITIVE DESIGN,
            <br className="hidden md:block" />
            AND SMART AI SOLUTIONS TO BUILD HIGH-PERFORMANCE
            <br className="hidden md:block" />
            APPLICATIONS THAT TRULLY STAND OUT.
          </p>
        </div>
        <div className="flex justify-center pt-6">
          <ButtonHoverReveal />
        </div>

        <div className="md:flex mt-16 md:mt-20 items-end justify-between px-4 md:px-0">
          <ImageSwapStack 
            images={[
              "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
              "https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/templates/dalim-www.jpg"
            ]}
          />
          <div className="text-center md:text-right flex flex-col items-center md:items-end w-full md:w-auto">
            <div className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
              <span className="text-sm md:text-lg font-medium tracking-wider">
                VIEW PROJECTS
              </span>
              <ArrowDownRight className="size-5 md:size-6" />
            </div>

            <div className="mt-3 md:text-right">
              <h2
                className={`text-[2.5rem] md:text-5xl uppercase tracking-[0px] md:tracking-[-4px] leading-tight`}
              >
                Beyond the Code
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
