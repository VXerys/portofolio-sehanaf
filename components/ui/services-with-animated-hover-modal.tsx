"use client";

import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { X } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ProjectItem = {
  color: string;
  remoteSrc: string;
  localSrc?: string;
  title: string;
  category: string;
  year: string;
};

type ModalState = {
  active: boolean;
  index: number;
};

type ProjectProps = {
  index: number;
  activeIndex: number;
  isTouchDevice: boolean;
  isTouchPreviewOpen: boolean;
  setIsTouchPreviewOpen: (value: boolean) => void;
  subtitle: string;
  title: string;
  year: string;
  setModal: (next: ModalState) => void;
};

type ModalProps = {
  isTouchDevice: boolean;
  onCloseTouchPreview: () => void;
  modal: ModalState;
  projects: ProjectItem[];
  touchPreviewOpen: boolean;
};

const projects: ProjectItem[] = [
  {
    color: "#000000",
    remoteSrc:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=80",
    title: "VoiceCart",
    category: "AI Voice Commerce",
    year: "2024",
  },
  {
    color: "#8C8C8C",
    remoteSrc:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80",
    title: "Fluxa",
    category: "Smart Finance Tracker",
    year: "2025",
  },
  {
    color: "#EFE8D3",
    remoteSrc:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    title: "Marketiv",
    category: "Creator Marketplace",
    year: "2025",
  },
  {
    color: "#706D63",
    remoteSrc:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80",
    title: "Mangkasir",
    category: "POS Mobile App",
    year: "2024",
  },
];

const scaleAnimation = {
  closed: {
    scale: 0,
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
    x: "-50%",
    y: "-50%",
  },
  enter: {
    scale: 1,
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
    x: "-50%",
    y: "-50%",
  },
  initial: { scale: 0, x: "-50%", y: "-50%" },
} as const;

const touchScaleAnimation = {
  closed: {
    opacity: 0,
    scale: 0.92,
    transition: { duration: 0.25, ease: [0.32, 0, 0.67, 0] },
  },
  enter: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] },
  },
  initial: { opacity: 0, scale: 0.92 },
} as const;

function Project({
  index,
  activeIndex,
  isTouchDevice,
  isTouchPreviewOpen,
  setIsTouchPreviewOpen,
  subtitle,
  title,
  year,
  setModal,
}: ProjectProps) {
  const isActiveTouchItem = isTouchDevice && isTouchPreviewOpen && activeIndex === index;

  const handleMouseEnter = () => {
    if (isTouchDevice) {
      return;
    }

    setModal({ active: true, index });
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) {
      return;
    }

    setModal({ active: false, index });
  };

  const handleTouchPreview = () => {
    if (!isTouchDevice) {
      return;
    }

    if (isActiveTouchItem) {
      setIsTouchPreviewOpen(false);
      setModal({ active: false, index });
      return;
    }

    setModal({ active: true, index });
    setIsTouchPreviewOpen(true);
  };

  return (
    <button
      className={cn(
        "group w-full cursor-pointer border-b border-base-300 px-4 py-6 text-left transition-colors duration-300 first:border-t sm:px-6 sm:py-8 lg:px-4 lg:py-10",
        isActiveTouchItem && "bg-base-200/60",
      )}
      onClick={handleTouchPreview}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      type="button"
    >
      <div className="grid items-start gap-2 sm:items-center md:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)_auto] md:gap-6">
        <h2 className="m-0 font-display text-[2.25rem] font-normal leading-[1.1] tracking-tight text-base-content transition-transform duration-300 group-hover:translate-x-1 sm:text-5xl md:text-[3.5rem]">
          {title}
        </h2>
        <p className="font-sans text-sm font-normal text-base-content/85 transition-transform duration-300 group-hover:translate-x-1 sm:text-base md:text-[1.75rem] md:leading-tight">
          {subtitle}
        </p>
        <p className="font-sans text-lg font-semibold text-base-content md:text-[2.1rem] md:leading-tight">
          {year}
        </p>
      </div>
    </button>
  );
}

function Modal({
  isTouchDevice,
  onCloseTouchPreview,
  modal,
  projects,
  touchPreviewOpen,
}: ModalProps) {
  const { active, index } = modal;
  const modalContainer = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLDivElement>(null);
  const activeProject = projects[index] ?? projects[0];

  useGSAP(
    () => {
      if (isTouchDevice || !modalContainer.current || !cursor.current || !cursorLabel.current) {
        return;
      }

      const xMoveContainer = gsap.quickTo(modalContainer.current, "left", {
        duration: 0.8,
        ease: "power3",
      });
      const yMoveContainer = gsap.quickTo(modalContainer.current, "top", {
        duration: 0.8,
        ease: "power3",
      });

      const xMoveCursor = gsap.quickTo(cursor.current, "left", {
        duration: 0.5,
        ease: "power3",
      });
      const yMoveCursor = gsap.quickTo(cursor.current, "top", {
        duration: 0.5,
        ease: "power3",
      });

      const xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", {
        duration: 0.45,
        ease: "power3",
      });
      const yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", {
        duration: 0.45,
        ease: "power3",
      });

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        xMoveContainer(clientX);
        yMoveContainer(clientY);
        xMoveCursor(clientX);
        yMoveCursor(clientY);
        xMoveCursorLabel(clientX);
        yMoveCursorLabel(clientY);
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { dependencies: [isTouchDevice], revertOnUpdate: true },
  );

  if (isTouchDevice) {
    return (
      <motion.div
        animate={touchPreviewOpen ? "enter" : "closed"}
        className="pointer-events-auto absolute inset-x-4 bottom-4 z-[5] rounded-2xl border border-black/10 bg-white p-3 shadow-2xl"
        initial="initial"
        variants={touchScaleAnimation}
      >
        <div
          className="relative overflow-hidden rounded-xl"
          style={{ backgroundColor: activeProject.color }}
        >
          <button
            aria-label="Close preview"
            className="absolute right-2 top-2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white"
            onClick={onCloseTouchPreview}
            type="button"
          >
            <X className="h-4 w-4" />
          </button>

          <Image
            alt={activeProject.title}
            className="h-[11.25rem] w-full object-cover"
            height={360}
            src={activeProject.localSrc ?? activeProject.remoteSrc}
            width={640}
          />
        </div>
        <p className="mt-2 text-sm font-medium text-black">Tap another row to change preview</p>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        animate={active ? "enter" : "closed"}
        className="pointer-events-none fixed left-0 top-0 z-[4] flex h-[21.875rem] w-[25rem] items-center justify-center overflow-hidden bg-white"
        initial="initial"
        ref={modalContainer}
        variants={scaleAnimation}
      >
        <div
          className="absolute h-full w-full transition-[top] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{ top: `${index * -100}%` }}
        >
          {projects.map((project) => (
            <div
              className="flex h-full w-full items-center justify-center"
              key={project.title}
              style={{ backgroundColor: project.color }}
            >
              <Image
                alt={project.title}
                className="h-auto"
                height={300}
                src={project.localSrc ?? project.remoteSrc}
                width={300}
              />
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div
        animate={active ? "enter" : "closed"}
        className="pointer-events-none fixed left-0 top-0 z-[6] flex h-20 w-20 items-center justify-center rounded-full bg-[#455CE9] text-sm font-light text-white"
        initial="initial"
        ref={cursor}
        variants={scaleAnimation}
      />
      <motion.div
        animate={active ? "enter" : "closed"}
        className="pointer-events-none fixed left-0 top-0 z-[6] flex h-20 w-20 items-center justify-center rounded-full bg-transparent text-sm font-light text-white"
        initial="initial"
        ref={cursorLabel}
        variants={scaleAnimation}
      >
        View
      </motion.div>
    </>
  );
}

export default function ServicesWithAnimatedHoverModal() {
  const [modal, setModal] = useState<ModalState>({ active: false, index: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isTouchPreviewOpen, setIsTouchPreviewOpen] = useState(false);

  useEffect(() => {
    const desktopPointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updateTouchDevice = () => {
      const hasDesktopPointer = desktopPointerQuery.matches;
      setIsTouchDevice(!hasDesktopPointer);
      if (hasDesktopPointer) {
        setIsTouchPreviewOpen(false);
      }
    };

    updateTouchDevice();
    desktopPointerQuery.addEventListener("change", updateTouchDevice);

    return () => {
      desktopPointerQuery.removeEventListener("change", updateTouchDevice);
    };
  }, []);

  const closeTouchPreview = () => {
    setIsTouchPreviewOpen(false);
    setModal((prev) => ({ ...prev, active: false }));
  };

  return (
    <div className="overflow-hidden bg-base-100 py-4 text-base-content sm:py-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="relative flex min-h-[55vh] items-center justify-center">
          <div className="flex w-full flex-col items-center justify-center">
            {projects.map((project, index) => (
              <Project
                activeIndex={modal.index}
                index={index}
                isTouchDevice={isTouchDevice}
                isTouchPreviewOpen={isTouchPreviewOpen}
                key={project.title}
                setIsTouchPreviewOpen={setIsTouchPreviewOpen}
                setModal={setModal}
                subtitle={project.category}
                title={project.title}
                year={project.year}
              />
            ))}
          </div>
          <Modal
            isTouchDevice={isTouchDevice}
            modal={modal}
            onCloseTouchPreview={closeTouchPreview}
            projects={projects}
            touchPreviewOpen={isTouchPreviewOpen}
          />
        </div>
      </div>
    </div>
  );
}
