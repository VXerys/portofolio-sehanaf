"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      syncTouch: false,
    });

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    const handleLenisScroll = () => {
      ScrollTrigger.update();
    };

    const handleScrollTop = () => {
      lenis.scrollTo(0, { duration: 1.1 });
    };

    lenis.on("scroll", handleLenisScroll);
    window.addEventListener("lenis:scroll-top", handleScrollTop);

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.removeEventListener("lenis:scroll-top", handleScrollTop);
      lenis.off("scroll", handleLenisScroll);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
