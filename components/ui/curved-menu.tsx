"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com",
    iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/linkedin.svg",
  },
  {
    label: "GitHub",
    href: "https://github.com",
    iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/github.svg",
  },
  {
    label: "Dribbble",
    href: "https://dribbble.com",
    iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/dribbble.svg",
  },
  {
    label: "Figma",
    href: "https://www.figma.com",
    iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/figma.svg",
  },
] as const;

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
    <div className="flex w-full items-center justify-between border-t border-base-content/25 px-10 py-5 text-sm text-base-content md:px-24">
      {SOCIAL_LINKS.map((socialLink) => (
        <a
          key={socialLink.label}
          href={socialLink.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={socialLink.label}
          className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-base-content/20 bg-base-100/45 transition-colors hover:border-base-content/50"
        >
          <Image
            src={socialLink.iconUrl}
            alt={`${socialLink.label} logo`}
            width={18}
            height={18}
            className="opacity-80 transition-opacity group-hover:opacity-100"
            unoptimized
          />
        </a>
      ))}
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
            <p>Explore Portfolio</p>
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
          aria-label={isActive ? "Close navigation menu" : "Open navigation menu"}
          className="fixed right-4 top-4 z-[60] grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-base-content/20 bg-base-100/65 text-base-content backdrop-blur-sm transition-colors duration-300 hover:bg-base-100/80 md:right-5 md:top-5"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isActive ? "close" : "menu"}
              initial={{ opacity: 0, rotate: -60, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 60, scale: 0.8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="inline-flex"
            >
              {isActive ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {isActive && <CurvedNavbar setIsActive={setIsActive} navItems={navItems} footer={footer} />}
      </AnimatePresence>
    </>
  );
}