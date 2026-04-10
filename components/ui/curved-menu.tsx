"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { GitFork, Globe, Palette, PenTool } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface CurvedMenuNavItem {
  heading: string;
  href: string;
  subheading?: string;
  imgSrc?: string;
}

interface NavLinkProps extends CurvedMenuNavItem {
  setIsActive: (isActive: boolean) => void;
  index: number;
}

interface CurvedNavbarProps {
  setIsActive: (isActive: boolean) => void;
  navItems: CurvedMenuNavItem[];
  footer?: React.ReactNode;
}

interface CurvedMenuProps {
  navItems?: CurvedMenuNavItem[];
  footer?: React.ReactNode;
}

const MENU_SLIDE_ANIMATION = {
  initial: { x: "calc(100% + 100px)" },
  enter: { x: "0", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  exit: {
    x: "calc(100% + 100px)",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
} as const;

export const defaultCurvedMenuItems: CurvedMenuNavItem[] = [
  {
    heading: "Home",
    href: "/#home",
    subheading: "Welcome to my portfolio",
    imgSrc:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    heading: "Projects",
    href: "/#projects",
    subheading: "Selected works and experiments",
    imgSrc:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
  },
  {
    heading: "About",
    href: "/#about",
    subheading: "Who I am and how I work",
    imgSrc:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    heading: "Experience",
    href: "/#experience",
    subheading: "My journey and capabilities",
    imgSrc:
      "https://images.unsplash.com/photo-1515378791036-0648a814c963?auto=format&fit=crop&w=1200&q=80",
  },
  {
    heading: "Contact",
    href: "/#contact",
    subheading: "Lets collaborate",
    imgSrc:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  },
];

const CustomFooter = () => {
  return (
    <div className="flex w-full justify-between px-10 py-5 text-sm text-base-content md:px-24">
      <a href="https://example.com/linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <Globe size={24} />
      </a>
      <a href="https://example.com/github" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <GitFork size={24} />
      </a>
      <a href="https://example.com/dribbble" target="_blank" rel="noopener noreferrer" aria-label="Dribbble">
        <Palette size={24} />
      </a>
      <a href="https://example.com/figma" target="_blank" rel="noopener noreferrer" aria-label="Figma">
        <PenTool size={24} />
      </a>
    </div>
  );
};

const NavLink = ({ heading, href, setIsActive, index }: NavLinkProps) => {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!ref.current) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    x.set((mouseX / rect.width - 0.5) * 12);
    y.set((mouseY / rect.height - 0.5) * 8);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = () => {
    setIsActive(false);
  };

  const isExternalLink = href.startsWith("http");
  const linkProps = isExternalLink ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <motion.div
      onClick={handleClick}
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center justify-between border-b border-base-content/30 py-4 uppercase transition-colors duration-500 md:py-8"
    >
      <Link ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} href={href} {...linkProps}>
        <div className="relative flex items-start">
          <span className="mr-2 text-4xl font-thin text-base-content transition-colors duration-500">{index}.</span>
          <div className="flex flex-row gap-2">
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: -16 },
              }}
              transition={{
                type: "spring",
                staggerChildren: 0.075,
                delayChildren: 0.25,
              }}
              style={{ x, y }}
              className="relative z-10 block text-4xl font-extralight text-base-content transition-colors duration-500 md:text-4xl"
            >
              {heading.split("").map((letter, letterIndex) => {
                return (
                  <motion.span
                    key={`${heading}-${letterIndex}`}
                    variants={{
                      initial: { x: 0 },
                      whileHover: { x: 16 },
                    }}
                    transition={{ type: "spring" }}
                    className="inline-block"
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                );
              })}
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const Curve = () => {
  const [viewportHeight, setViewportHeight] = useState(900);

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const initialPath = `M100 0 L200 0 L200 ${viewportHeight} L100 ${viewportHeight} Q-100 ${viewportHeight / 2} 100 0`;
  const targetPath = `M100 0 L200 0 L200 ${viewportHeight} L100 ${viewportHeight} Q100 ${viewportHeight / 2} 100 0`;

  const curve = {
    initial: { d: initialPath },
    enter: {
      d: targetPath,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  } as const;

  return (
    <svg className="absolute -left-[99px] top-0 h-full w-[100px] stroke-none" style={{ fill: "var(--color-base-100)" }}>
      <motion.path variants={curve} initial="initial" animate="enter" exit="exit" />
    </svg>
  );
};

const CurvedNavbar = ({ setIsActive, navItems, footer }: CurvedNavbarProps) => {
  return (
    <motion.div
      variants={MENU_SLIDE_ANIMATION}
      initial="initial"
      animate="enter"
      exit="exit"
      className="fixed right-0 top-0 z-40 h-[100dvh] w-screen max-w-screen-sm bg-base-100"
    >
      <div className="flex h-full flex-col justify-between pt-11">
        <div className="mt-0 flex flex-col gap-3 px-10 text-5xl md:px-24">
          <div className="mb-0 border-b border-base-content/30 text-sm uppercase text-base-content">
            <p>Navigation</p>
          </div>
          <section className="mt-0 bg-transparent">
            <div className="mx-auto max-w-7xl">
              {navItems.map((item, index) => {
                return <NavLink key={item.href} {...item} setIsActive={setIsActive} index={index + 1} />;
              })}
            </div>
          </section>
        </div>
        {footer}
      </div>
      <Curve />
    </motion.div>
  );
};

export default function CurvedMenu({ navItems = defaultCurvedMenuItems, footer = <CustomFooter /> }: CurvedMenuProps) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive((currentState) => !currentState);
  };

  return (
    <>
      <div className="relative">
        <button
          type="button"
          onClick={handleClick}
          aria-expanded={isActive}
          aria-label="Toggle navigation menu"
          className="fixed -right-1 top-0 z-50 m-5 flex h-12 w-12 cursor-pointer items-center justify-center rounded-none bg-base-100 md:-right-1"
        >
          <div className="relative flex h-6 w-8 flex-col items-center justify-between">
            <span
              className={cn(
                "block h-1 w-7 bg-base-content transition-transform duration-300",
                isActive && "translate-y-2 rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-1 w-7 bg-base-content transition-opacity duration-300",
                isActive && "opacity-0",
              )}
            />
            <span
              className={cn(
                "block h-1 w-7 bg-base-content transition-transform duration-300",
                isActive && "-translate-y-3 -rotate-45",
              )}
            />
          </div>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {isActive && <CurvedNavbar setIsActive={setIsActive} navItems={navItems} footer={footer} />}
      </AnimatePresence>
    </>
  );
}