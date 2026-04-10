import { CinematicFooter } from "@/components/ui/motion-footer";
import ServicesWithAnimatedHoverModal from "@/components/ui/services-with-animated-hover-modal";
import CurvedMenu from "@/components/ui/curved-menu";
import HomePreloaderGate from "@/components/ui/home-preloader-gate";
import HeroSection from "@/components/sections/hero-section";

export default function Home() {
  return (
    <HomePreloaderGate>
      <div className="relative min-h-screen w-full overflow-x-hidden bg-base-100">
        <CurvedMenu />
        <main className="relative z-10 w-full bg-base-100 pb-10 sm:pb-14">
          <HeroSection />

          <div className="mx-auto w-full max-w-6xl px-4 pt-6 sm:px-8 sm:pt-8 lg:px-12">
            <section id="projects">
              <ServicesWithAnimatedHoverModal />
            </section>
          </div>
        </main>

        <section id="contact">
          <CinematicFooter />
        </section>
      </div>
    </HomePreloaderGate>
  );
}
