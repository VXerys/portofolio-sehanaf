"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type GSAPProviderProps = {
  children: React.ReactNode;
};

export default function GSAPProvider({ children }: GSAPProviderProps) {
  return <>{children}</>;
}
