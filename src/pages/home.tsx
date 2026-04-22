import { useEffect, useRef, useState } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { Loader } from "@/components/ui/loader";
import { Cursor } from "@/components/ui/cursor";

import HeroSection from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";
import SkillsSection from "@/components/sections/skills";
import ProjectsSection from "@/components/sections/projects";
import ExperienceSection from "@/components/sections/experience";
import ContactSection from "@/components/sections/contact";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    document.documentElement.classList.add("dark");

    // Skip Lenis on touch devices — native momentum scrolling feels better on
    // mobile and Lenis can fight the browser's gesture handling.
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    if (isTouch) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div
      className="relative bg-background min-h-screen text-foreground selection:bg-primary/30 overflow-x-hidden"
      ref={containerRef}
    >
      <AnimatePresence mode="wait">
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <Cursor />
      <div className="noise-overlay" />

      {/* Scroll progress indicator (desktop only) */}
      <motion.div
        className="fixed right-6 top-1/2 -translate-y-1/2 w-1 h-32 bg-white/10 rounded-full z-50 overflow-hidden hidden md:block"
        style={{ opacity: isLoading ? 0 : 1 }}
      >
        <motion.div
          className="w-full bg-gradient-to-b from-primary to-secondary"
          style={{
            height: "100%",
            scaleY: scrollYProgress,
            transformOrigin: "top",
          }}
        />
      </motion.div>

      {!isLoading && (
        <main className="relative">
          <HeroSection scrollYProgress={scrollYProgress} />

          <div className="relative z-10">
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ExperienceSection />
            <ContactSection />

            <footer className="w-full py-8 border-t border-white/5 bg-background text-center relative z-50">
              <p className="text-sm text-muted-foreground font-mono px-4">
                &copy; {new Date().getFullYear()} Rishabh Sahu. Built with
                purpose.
              </p>
            </footer>
          </div>
        </main>
      )}
    </div>
  );
}
