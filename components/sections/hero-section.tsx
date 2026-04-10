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
        imageSrc="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80"
        imageAlt="Portrait placeholder for hero section"
        overlayText={{
          part1: "less is",
          part2: "more.",
        }}
        socialLinks={[]}
        locationText=""
        className="h-[92svh] bg-base-100"
      />
    </section>
  );
}
