import { useEffect, useState } from "react";

export function useResponsive() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(true);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  useEffect(() => {
    // Media queries covering standard Tailwind breakpoints
    const mobileQuery = window.matchMedia("(max-width: 639px)"); // Mobile (sm and below)
    const tabletQuery = window.matchMedia("(min-width: 640px) and (max-width: 1023px)"); // Tablet (sm to lg)
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)"); // Desktop mouse

    const updateStates = () => {
      setIsMobile(mobileQuery.matches);
      setIsTablet(tabletQuery.matches);
      setIsDesktop(!mobileQuery.matches && !tabletQuery.matches);
      setIsTouchDevice(!pointerQuery.matches);
    };

    // Initial check
    updateStates();

    // Listeners handling dynamic resizing
    mobileQuery.addEventListener("change", updateStates);
    tabletQuery.addEventListener("change", updateStates);
    pointerQuery.addEventListener("change", updateStates);

    return () => {
      mobileQuery.removeEventListener("change", updateStates);
      tabletQuery.removeEventListener("change", updateStates);
      pointerQuery.removeEventListener("change", updateStates);
    };
  }, []);

  return { isMobile, isTablet, isDesktop, isTouchDevice };
}
