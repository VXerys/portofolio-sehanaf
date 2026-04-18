"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImageSwapStackProps {
  images: string[];
}

export function ImageSwapStack({ images }: ImageSwapStackProps) {
  // Ensure we mount the images internally as local state to loop through
  const [cards, setCards] = useState(images);

  const handleSwap = () => {
    setCards((prev) => {
      const newArray = [...prev];
      // Pop the visual "top" element and push it to the "bottom" index (0)
      const topLevel = newArray.pop();
      if (topLevel) newArray.unshift(topLevel);
      return newArray;
    });
  };

  return (
    <div
      className="relative mx-auto md:mx-0 w-[200px] md:w-60 mb-16 md:mb-0 mt-8 md:mt-0 cursor-pointer group"
      onClick={handleSwap}
      title="Click to interact"
    >
      <div className="w-[200px] h-28 md:w-60 md:h-36 relative mb-8 md:mb-0">
        {cards.map((src, index) => {
          // Compute positions logic dynamically. Using 3 layers standard:
          const isBottom = index === 0;
          const isMiddle = index === cards.length - 2;
          const isTop = index === cards.length - 1;

          return (
            <motion.div
              layout
              key={src}
              initial={false}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 25,
                mass: 0.8, // Ensures snappy physics recalculations without heavy drag on mobile
              }}
              className={cn(
                "w-[200px] h-28 md:w-60 md:h-36 absolute shadow-xl border border-base-300 rounded-[var(--radius-box)] overflow-hidden bg-base-200 will-change-transform",
                isBottom && "left-0 top-0 z-10",
                isMiddle && "left-4 -top-4 md:left-6 md:-top-6 z-20",
                isTop && "left-8 -top-8 md:left-12 md:-top-12 z-30 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform"
              )}
            >
              <img src={src} alt="Portfolio Demo" className="w-full h-full object-cover" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
