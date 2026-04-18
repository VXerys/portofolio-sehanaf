"use client";

import { type CSSProperties, useEffect, useId, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Sparkles, X } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FloatingConsultButtonProps {
  buttonSize?: number;
  imageSize?: number;
  imageSrc?: string;
  imageAlt?: string;
  revolvingText?: string;
  revolvingSpeed?: number;
  popupHeading?: string;
  popupDescription?: string;
  popupBadgeText?: string;
  ctaButtonText?: string;
  ctaButtonAction?: () => void;
  position?: {
    bottom?: string;
    right?: string;
    left?: string;
    top?: string;
  };
}

export function FloatingConsultButton({
  buttonSize,
  imageSize,
  imageSrc = "/images/projects/foto-saya.png",
  imageAlt = "Foto profile Sehanaf",
  revolvingText = "CHAT WITH MY AI  •  DISCOVER MY JOURNEY  •  LET'S CONNECT",
  revolvingSpeed = 10,
  popupHeading = "Sehanaf AI Chat",
  popupDescription =
    "This AI chat space is designed to help visitors get to know me better. Groq + Llama integration will be connected in the next phase.",
  popupBadgeText = "Beta",
  ctaButtonText = "Start AI Chat",
  ctaButtonAction,
  position = { bottom: "0.5rem", right: "0.5rem" },
}: FloatingConsultButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showPendingMessage, setShowPendingMessage] = useState(false);
  const [imageHasError, setImageHasError] = useState(false);
  const circlePathId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rotationRef = useRef<SVGSVGElement>(null);
  const circleRadius = 78;

  const desktopButtonSize = buttonSize || 152;
  const mobileButtonSize = Math.round(desktopButtonSize * 0.64);

  const desktopImageSize = imageSize || 92;
  const mobileImageSize = Math.round(desktopImageSize * 0.64);

  const wrapperStyle = {
    ...position,
    "--floating-btn-mobile": `${mobileButtonSize}px`,
    "--floating-btn-desktop": `${desktopButtonSize}px`,
    "--floating-img-mobile": `${mobileImageSize}px`,
    "--floating-img-desktop": `${desktopImageSize}px`,
  } as CSSProperties;

  const suggestedPrompts = useMemo(
    () => [
      "Tell me about Sehanaf's career journey",
      "What are Sehanaf's key technical strengths?",
      "Which project was most impactful?",
    ],
    [],
  );

  const circularText = useMemo(() => {
    const text = (revolvingText || "").trim().toUpperCase();
    // If it's the new complex default or already contains separators, just ensure it ends with one
    if (text.includes("•") || text.length > 30) {
      return text.endsWith("•") ? `${text}  ` : `${text}  •  `;
    }
    // For short simple strings, repeat 3 times
    return `${text}  •  ${text}  •  ${text}  •  `;
  }, [revolvingText]);

  useGSAP(
    () => {
      if (!rotationRef.current) return;

      gsap.to(rotationRef.current, {
        rotation: 360,
        duration: revolvingSpeed,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
      });
    },
    { scope: buttonRef },
  );

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleCtaClick = () => {
    if (ctaButtonAction) {
      ctaButtonAction();
      return;
    }

    setShowPendingMessage(true);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[44] bg-base-content/25 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-label="Close Chat AI panel"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.section
            initial={{ opacity: 0, scale: 0.84, y: 22 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.84, y: 22 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-28 left-4 right-4 z-[45] w-auto rounded-3xl border border-base-300 bg-base-100 p-5 shadow-2xl sm:bottom-32 sm:left-auto sm:right-6 sm:max-w-md sm:p-7"
            aria-live="polite"
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-base-300 text-base-content/70 transition-colors hover:text-base-content"
              aria-label="Close popup"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-5">
              <div className="flex items-start justify-between gap-4 pr-12">
                <h3 className="font-display text-3xl leading-tight text-base-content sm:text-4xl">{popupHeading}</h3>
                <span className="rounded-full border border-base-300 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-base-content/80">
                  {popupBadgeText}
                </span>
              </div>

              <p className="text-sm leading-relaxed text-base-content/75 sm:text-base">{popupDescription}</p>

              <div className="rounded-2xl border border-base-300 bg-base-200/60 p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-base-content/85">
                  <Sparkles className="h-4 w-4" />
                  Quick prompts
                </div>

                <div className="flex flex-wrap gap-2">
                  {suggestedPrompts.map((prompt) => (
                    <span
                      key={prompt}
                      className="rounded-full border border-base-300 bg-base-100 px-3 py-1 text-xs text-base-content/80"
                    >
                      {prompt}
                    </span>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleCtaClick}
                className="h-12 w-full rounded-full bg-base-content text-base-100 hover:bg-base-content/90"
              >
                {ctaButtonText}
              </Button>

              <p
                className={cn(
                  "text-center text-xs text-base-content/65 transition-opacity",
                  showPendingMessage ? "opacity-100" : "opacity-0",
                )}
              >
                Chat UI is ready. Groq/Llama model integration will be activated in the next phase.
              </p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <div className="fixed z-[45]" style={wrapperStyle}>
        <motion.button
          ref={buttonRef}
          type="button"
          aria-expanded={isOpen}
          aria-label="Open Chat AI popup"
          className="relative h-[var(--floating-btn-mobile)] w-[var(--floating-btn-mobile)] cursor-pointer sm:h-[var(--floating-btn-desktop)] sm:w-[var(--floating-btn-desktop)]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.25 }}
          onClick={() => {
            setShowPendingMessage(false);
            setIsOpen((currentState) => !currentState);
          }}
        >
          <div className="absolute inset-0">
            <svg ref={rotationRef} viewBox="0 0 200 200" className="h-full w-full text-base-content/70">
              <defs>
                <path
                  id={circlePathId}
                  d={`M 100, 100 m -${circleRadius}, 0 a ${circleRadius},${circleRadius} 0 1,1 ${circleRadius * 2},0 a ${circleRadius},${circleRadius} 0 1,1 -${circleRadius * 2},0`}
                />
              </defs>
              <text
                className="font-sans [font-size:10px] font-bold uppercase tracking-[0.15em] sm:[font-size:12px] sm:tracking-[0.18em]"
                fill="currentColor"
                textAnchor="middle"
              >
                <textPath
                  href={`#${circlePathId}`}
                  startOffset="50%"
                  textLength="490"
                  lengthAdjust="spacing"
                >
                  {circularText}
                </textPath>
              </text>
            </svg>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="relative h-[var(--floating-img-mobile)] w-[var(--floating-img-mobile)] overflow-hidden rounded-full border border-base-300 bg-base-content shadow-xl transition-shadow duration-300 hover:shadow-2xl sm:h-[var(--floating-img-desktop)] sm:w-[var(--floating-img-desktop)]"
            >
              {imageHasError ? (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-secondary text-primary-content">
                  <MessageCircle className="h-8 w-8" />
                </div>
              ) : (
                <>
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    sizes="(min-width: 640px) 92px, 60px"
                    className="object-cover object-[50%_32%]"
                    onError={() => setImageHasError(true)}
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-base-100/30" />
                </>
              )}
            </div>
          </div>
        </motion.button>
      </div>
    </>
  );
}