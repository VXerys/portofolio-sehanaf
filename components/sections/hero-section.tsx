"use client";

import { MinimalistHero } from "@/components/ui/minimalist-hero";

export default function HeroSection() {
  return (
    <section id="home" className="overflow-hidden">
      <MinimalistHero
        logoText="sehanaf."
        navLinks={[]}
        mainText="Saya membangun pengalaman digital yang clean, cepat, dan berfokus pada hasil untuk brand dan produk modern."
        readMoreLink="#projects"
        imageSrc="/images/projects/foto-saya.png"
        imageAlt="Portrait placeholder for hero section"
        overlayText={{
          part1: "less is",
          part2: "more.",
        }}
        imageCircleClassName="h-[330px] w-[330px] md:h-[470px] md:w-[470px] lg:h-[560px] lg:w-[560px]"
        imageWrapperClassName="w-[17.5rem] scale-[1.12] md:w-[23rem] md:scale-[1.2] lg:w-[26rem] lg:scale-[1.24]"
        imageClassName="object-contain object-bottom"
        socialLinks={[]}
        locationText=""
        className="h-[92svh] bg-base-100"
      />
    </section>
  );
}
