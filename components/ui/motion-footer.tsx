"use client";

import * as React from "react";
import { useRef } from "react";
import { ArrowUp, Briefcase, Heart, Mail, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

const STYLES = `
.cinematic-footer-wrapper {
  font-family: var(--font-inter), system-ui, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  --destructive: var(--color-error);

  --pill-bg-1: color-mix(in oklch, var(--foreground) 3%, transparent);
  --pill-bg-2: color-mix(in oklch, var(--foreground) 1%, transparent);
  --pill-shadow: color-mix(in oklch, var(--background) 50%, transparent);
  --pill-highlight: color-mix(in oklch, var(--foreground) 10%, transparent);
  --pill-inset-shadow: color-mix(in oklch, var(--background) 80%, transparent);
  --pill-border: color-mix(in oklch, var(--foreground) 8%, transparent);

  --pill-bg-1-hover: color-mix(in oklch, var(--foreground) 8%, transparent);
  --pill-bg-2-hover: color-mix(in oklch, var(--foreground) 2%, transparent);
  --pill-border-hover: color-mix(in oklch, var(--foreground) 20%, transparent);
  --pill-shadow-hover: color-mix(in oklch, var(--background) 70%, transparent);
  --pill-highlight-hover: color-mix(in oklch, var(--foreground) 20%, transparent);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px color-mix(in oklch, var(--destructive) 50%, transparent)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px color-mix(in oklch, var(--destructive) 80%, transparent)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 60s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

.footer-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    color-mix(in oklch, var(--color-primary) 15%, transparent) 0%,
    color-mix(in oklch, var(--color-secondary) 15%, transparent) 40%,
    transparent 70%
  );
}

.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow:
    0 10px 30px -10px var(--pill-shadow),
    inset 0 1px 1px var(--pill-highlight),
    inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow:
    0 20px 40px -10px var(--pill-shadow-hover),
    inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--foreground);
}

.footer-giant-bg-text {
  font-size: 26vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in oklch, var(--foreground) 5%, transparent);
  background: linear-gradient(180deg, color-mix(in oklch, var(--foreground) 10%, transparent) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

.footer-text-glow {
  background: linear-gradient(180deg, var(--foreground) 0%, color-mix(in oklch, var(--foreground) 40%, transparent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px color-mix(in oklch, var(--foreground) 15%, transparent));
}

@media (prefers-reduced-motion: reduce) {
  .animate-footer-breathe,
  .animate-footer-scroll-marquee,
  .animate-footer-heartbeat {
    animation: none !important;
  }
}
`;

type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement | null>(null);

    useGSAP(
      () => {
        const element = localRef.current;
        if (!element) {
          return;
        }

        const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (!supportsHover || reducedMotion) {
          return;
        }

        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const halfWidth = rect.width / 2;
          const halfHeight = rect.height / 2;
          const x = e.clientX - rect.left - halfWidth;
          const y = e.clientY - rect.top - halfHeight;

          gsap.to(element, {
            x: x * 0.4,
            y: y * 0.4,
            rotationX: -y * 0.15,
            rotationY: x * 0.15,
            scale: 1.05,
            ease: "power2.out",
            duration: 0.4,
            overwrite: true,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "power2.out",
            duration: 0.5,
            overwrite: true,
          });
        };

        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      },
      { scope: localRef },
    );

    return (
      <Component
        ref={(node: HTMLElement | null) => {
          localRef.current = node;
          if (typeof forwardedRef === "function") {
            forwardedRef(node);
          } else if (forwardedRef) {
            (
              forwardedRef as React.MutableRefObject<HTMLElement | null>
            ).current = node;
          }
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

MagneticButton.displayName = "MagneticButton";

const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>Scalable Solutions</span>
    <Sparkles className="h-3 w-3 text-primary/60" aria-hidden="true" />
    <span>Clean Code</span>
    <Sparkles className="h-3 w-3 text-secondary/60" aria-hidden="true" />
    <span>User First</span>
    <Sparkles className="h-3 w-3 text-primary/60" aria-hidden="true" />
    <span>Performance Matters</span>
    <Sparkles className="h-3 w-3 text-secondary/60" aria-hidden="true" />
    <span>Innovation Driven</span>
    <Sparkles className="h-3 w-3 text-primary/60" aria-hidden="true" />
  </div>
);

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!wrapperRef.current) {
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          giantTextRef.current,
          { y: 80, scale: 0.94, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top 88%",
              once: true,
            },
          },
        );

        gsap.fromTo(
          [headingRef.current, linksRef.current],
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top 82%",
              once: true,
            },
          },
        );
      });

      mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
        gsap.fromTo(
          [headingRef.current, linksRef.current],
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top 90%",
              once: true,
            },
          },
        );
      });

      return () => {
        mm.revert();
      };
    },
    { scope: wrapperRef },
  );

  const scrollToTop = () => {
    window.dispatchEvent(new Event("lenis:scroll-top"));

    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div
        ref={wrapperRef}
        className="relative h-screen w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <footer className="cinematic-footer-wrapper fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-background text-foreground">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 h-full w-full bg-cover bg-center opacity-[0.05]"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1920&q=80')",
            }}
          />

          <div className="footer-aurora pointer-events-none absolute left-1/2 top-1/2 z-0 h-[50vh] w-[74vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[40px]" />
          <div className="footer-bg-grid pointer-events-none absolute inset-0 z-0" />

          <div
            ref={giantTextRef}
            className="footer-giant-bg-text pointer-events-none absolute -bottom-[5vh] left-1/2 z-0 -translate-x-1/2 select-none whitespace-nowrap"
          >
            SEHAN
          </div>

          <div className="absolute left-0 top-12 z-10 w-full -rotate-2 scale-105 overflow-hidden border-y border-base-300/50 bg-base-100/55 py-4 shadow-lg">
            <div className="animate-footer-scroll-marquee flex w-max text-xs font-bold uppercase tracking-[0.3em] text-base-content/65 md:text-sm">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          <div className="relative z-10 mx-auto mt-20 flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6">
            <h2
              ref={headingRef}
              className="footer-text-glow mb-12 text-center text-5xl font-black tracking-tighter md:text-8xl"
            >
              Ready to collaborate?
            </h2>

            <div ref={linksRef} className="flex w-full flex-col items-center gap-6">
              <div className="flex w-full flex-wrap justify-center gap-4">
                <MagneticButton
                  as="a"
                  href="/#projects"
                  className="footer-glass-pill group flex items-center gap-3 rounded-full px-10 py-5 text-sm font-bold text-base-content md:text-base"
                >
                  <Briefcase className="h-6 w-6 text-base-content/65 transition-colors group-hover:text-base-content" aria-hidden="true" />
                  View Projects
                </MagneticButton>

                <MagneticButton
                  as="a"
                  href="/#contact"
                  className="footer-glass-pill group flex items-center gap-3 rounded-full px-10 py-5 text-sm font-bold text-base-content md:text-base"
                >
                  <Mail className="h-6 w-6 text-base-content/65 transition-colors group-hover:text-base-content" aria-hidden="true" />
                  Contact Me
                </MagneticButton>
              </div>

              <div className="mt-2 flex w-full flex-wrap justify-center gap-3 md:gap-6">
                <MagneticButton
                  as="a"
                  href="/#projects"
                  className="footer-glass-pill rounded-full px-6 py-3 text-xs font-medium text-base-content/65 hover:text-base-content md:text-sm"
                >
                  Selected Works
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href="/#contact"
                  className="footer-glass-pill rounded-full px-6 py-3 text-xs font-medium text-base-content/65 hover:text-base-content md:text-sm"
                >
                  Contact
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href="https://github.com/VXerys"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-glass-pill rounded-full px-6 py-3 text-xs font-medium text-base-content/65 hover:text-base-content md:text-sm"
                >
                  GitHub
                </MagneticButton>
              </div>
            </div>
          </div>

          <div className="relative z-20 flex w-full flex-col items-center justify-between gap-6 px-6 pb-8 md:flex-row md:px-12">
            <div className="order-2 text-[10px] font-semibold uppercase tracking-widest text-base-content/65 md:order-1 md:text-xs">
              © 2026 Sehan Alfarisi. All rights reserved.
            </div>

            <div className="footer-glass-pill order-1 flex cursor-default items-center gap-2 rounded-full border-base-300/50 px-6 py-3 md:order-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-base-content/65 md:text-xs">
                Crafted with
              </span>
              <Heart className="animate-footer-heartbeat h-4 w-4 text-error md:h-5 md:w-5" aria-hidden="true" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-base-content/65 md:text-xs">
                by
              </span>
              <span className="ml-1 text-xs font-black tracking-normal text-base-content md:text-sm">
                Sehan Alfarisi
              </span>
            </div>

            <MagneticButton
              as="button"
              onClick={scrollToTop}
              className="footer-glass-pill group order-3 flex h-12 w-12 items-center justify-center rounded-full text-base-content/65 hover:text-base-content"
            >
              <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1.5" aria-hidden="true" />
            </MagneticButton>
          </div>
        </footer>
      </div>
    </>
  );
}
