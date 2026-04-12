"use client";

import { type CSSProperties, useEffect, useId, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Sparkles, X } from "lucide-react";

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
  revolvingText = "GET IN TOUCH - CHAT AI - LET'S TALK - ",
  revolvingSpeed = 10,
  popupHeading = "Chat AI Sehanaf",
  popupDescription =
    "Ruang percakapan AI ini disiapkan agar pengunjung bisa mengenal saya lebih dalam. Integrasi Groq + Llama akan disambungkan pada fase berikutnya.",
  popupBadgeText = "Beta",
  ctaButtonText = "Mulai Chat AI",
  ctaButtonAction,
  position = { bottom: "1.5rem", right: "1.5rem" },
}: FloatingConsultButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showPendingMessage, setShowPendingMessage] = useState(false);
  const [imageHasError, setImageHasError] = useState(false);
  const circlePathId = useId();

  const desktopButtonSize = buttonSize || 152;
  const tabletButtonSize = Math.round(desktopButtonSize * 0.84);
  const mobileButtonSize = Math.round(desktopButtonSize * 0.72);

  const desktopImageSize = imageSize || 92;
  const tabletImageSize = Math.round(desktopImageSize * 0.86);
  const mobileImageSize = Math.round(desktopImageSize * 0.74);

  const wrapperStyle: CSSProperties = {
    ...position,
    "--floating-btn-mobile": `${mobileButtonSize}px`,
    "--floating-btn-tablet": `${tabletButtonSize}px`,
    "--floating-btn-desktop": `${desktopButtonSize}px`,
    "--floating-img-mobile": `${mobileImageSize}px`,
    "--floating-img-tablet": `${tabletImageSize}px`,
    "--floating-img-desktop": `${desktopImageSize}px`,
  };

  const suggestedPrompts = useMemo(
    () => [
      "Ceritakan journey karier Sehanaf",
      "Apa keunggulan teknis utama Sehanaf?",
      "Project mana yang paling impactful?",
    ],
    [],
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
                UI chat sudah siap. Integrasi model Groq/Llama akan kamu aktifkan di tahap berikutnya.
              </p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <div className="fixed z-[45]" style={wrapperStyle}>
        <motion.button
          type="button"
          aria-expanded={isOpen}
          aria-label="Open Chat AI popup"
          className="relative h-[var(--floating-btn-mobile)] w-[var(--floating-btn-mobile)] cursor-pointer sm:h-[var(--floating-btn-tablet)] sm:w-[var(--floating-btn-tablet)] lg:h-[var(--floating-btn-desktop)] lg:w-[var(--floating-btn-desktop)]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.25 }}
          onClick={() => {
            setShowPendingMessage(false);
            setIsOpen((currentState) => !currentState);
          }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{
              duration: revolvingSpeed,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <svg viewBox="0 0 200 200" className="h-full w-full text-base-content/70">
              <defs>
                <path
                  id={circlePathId}
                  d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                />
              </defs>
              <text
                className="[font-size:11.2px] font-semibold uppercase tracking-[0.14em] sm:[font-size:13.1px] sm:tracking-[0.17em] lg:[font-size:15.2px] lg:tracking-[0.2em]"
                fill="currentColor"
              >
                <textPath href={`#${circlePathId}`} startOffset="0%">
                  {revolvingText}
                </textPath>
              </text>
            </svg>
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="relative h-[var(--floating-img-mobile)] w-[var(--floating-img-mobile)] overflow-hidden rounded-full border border-base-300 bg-base-content shadow-xl transition-shadow duration-300 hover:shadow-2xl sm:h-[var(--floating-img-tablet)] sm:w-[var(--floating-img-tablet)] lg:h-[var(--floating-img-desktop)] lg:w-[var(--floating-img-desktop)]"
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
                    sizes="(min-width: 1024px) 96px, 80px"
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