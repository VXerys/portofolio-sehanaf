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
  },
  {
    color: "#8C8C8C",
    remoteSrc:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80",
    title: "Fluxa",
    category: "Smart Finance Tracker",
  },
  {
    color: "#EFE8D3",
    remoteSrc:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    title: "Marketiv",
    category: "Creator Marketplace",
  },
  {
    color: "#706D63",
    remoteSrc:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80",
    title: "Mangkasir",
    category: "POS Mobile App",
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

export const Component = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={cn("flex flex-col items-center gap-4 rounded-lg p-4")}>
      <h1 className="mb-2 text-2xl font-bold">Component Example</h1>
      <h2 className="text-xl font-semibold">{count}</h2>
      <div className="flex gap-2">
        <button
          className="rounded-md border border-base-300 px-3 py-1"
          onClick={() => setCount((prev) => prev - 1)}
          type="button"
        >
          -
        </button>
        <button
          className="rounded-md border border-base-300 px-3 py-1"
          onClick={() => setCount((prev) => prev + 1)}
          type="button"
        >
          +
        </button>
      </div>
    </div>
  );
};

function Project({
  index,
  activeIndex,
  isTouchDevice,
  isTouchPreviewOpen,
  setIsTouchPreviewOpen,
  subtitle,
  title,
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
      setModal((prev) => ({ ...prev, active: false }));
      return;
    }

    setModal({ active: true, index });
    setIsTouchPreviewOpen(true);
  };

  return (
    <button
      className={cn(
        "group flex w-full cursor-pointer items-center justify-between border-t border-[rgb(201,201,201)] px-6 py-8 text-left transition-all duration-200 last:border-b md:px-[6.25rem] md:py-[3.125rem] hover:opacity-50",
        isActiveTouchItem && "bg-white/70",
      )}
      onClick={handleTouchPreview}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      type="button"
    >
      <h2 className="m-0 font-display text-3xl font-normal transition-all duration-300 group-hover:translate-x-2.5 md:text-6xl">
        {title}
      </h2>
      <p className="text-xs font-light transition-all duration-300 group-hover:translate-x-2.5 md:text-base">
        {subtitle}
      </p>
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
    <div className="overflow-hidden bg-[#f9f9f9] py-16 text-black">
      <div className="mx-auto max-w-7xl px-5 md:px-0">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <h2 className="font-display text-5xl tracking-tight md:text-7xl">Services.</h2>
          <p className="max-w-md text-sm font-medium text-neutral-500 md:text-base">
            End-to-end products crafted for speed, polish, and conversion. Hover on desktop or tap
            on mobile to preview each project instantly.
          </p>
        </div>
        <div className="relative mt-8 flex min-h-[70vh] items-center justify-center md:h-screen">
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
