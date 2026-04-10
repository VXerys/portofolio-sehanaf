"use client";

import { useCallback, useEffect, useState } from "react";
import Preloader from "@/components/ui/preloader";

interface HomePreloaderGateProps {
  children: React.ReactNode;
}

export default function HomePreloaderGate({ children }: HomePreloaderGateProps) {
  const [showPreloader, setShowPreloader] = useState(true);

  const handleComplete = useCallback(() => {
    setShowPreloader(false);
  }, []);

  useEffect(() => {
    if (!showPreloader) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showPreloader]);

  return (
    <>
      {showPreloader && <Preloader onComplete={handleComplete} />}
      {children}
    </>
  );
}
