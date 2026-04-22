import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.75, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.95, 1, 1, 1.03]);
  const y = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [60, 0, 0, -40]);

  // Timeline draw effect
  const { scrollYProgress: timelineProgress } = useScroll({
    target: targetRef,
    offset: ["start center", "end center"]
  });

  return (
    <section
      id="experience"
      ref={containerRef}
      className="min-h-screen py-32 relative z-30 flex items-center"
    >
      <motion.div
        className="container mx-auto px-6 max-w-4xl"
        ref={targetRef}
        style={{ opacity, scale, y }}
      >
        <div className="mb-20 text-center md:text-left">
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-4">Experience</h2>
          <p className="text-muted-foreground text-lg">My professional journey</p>
        </div>

        <div className="relative pl-8 md:pl-0">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />
          <motion.div 
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-secondary to-transparent md:-translate-x-1/2 origin-top"
            style={{ scaleY: timelineProgress }}
          />

          {/* Timeline Item */}
          <div className="relative flex flex-col md:flex-row items-center md:justify-between w-full mb-16 group">
            <div className="absolute left-[-37px] md:left-1/2 w-5 h-5 rounded-full bg-background border-2 border-primary md:-translate-x-1/2 shadow-[0_0_10px_rgba(0,240,255,0.5)] z-10" />
            
            <div className="w-full md:w-[45%] md:pr-12 md:text-right mb-6 md:mb-0">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-display font-bold text-foreground group-hover:text-primary transition-colors">Frontend Developer</h3>
                <h4 className="text-xl text-muted-foreground mb-2">Great Kapital (R.K. Group)</h4>
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-mono mb-4">
                  Apr 2025 – Present
                </div>
              </motion.div>
            </div>

            <div className="w-full md:w-[45%] md:pl-12">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="glass-panel p-6 md:p-8 rounded-2xl hover:border-primary/30 transition-colors"
              >
                <ul className="space-y-3 text-muted-foreground text-sm md:text-base list-disc list-outside ml-4 mb-6">
                  <li>Architected 5+ modular dashboards using Next.js and Shadcn with scalable, component-driven architecture</li>
                  <li>Implemented AG Grid tables (sorting, filtering, pagination, row selection, bulk actions) for large datasets</li>
                  <li>Integrated Recoil state management across 6 modules</li>
                  <li>Standardized reusable components, reducing duplicated UI logic</li>
                  <li>Collaborated in daily stand-ups and design reviews</li>
                </ul>

                <div className="flex flex-wrap gap-2">
                  {["Next.js", "TypeScript", "Shadcn", "Material UI", "Recoil"].map(tech => (
                    <span key={tech} className="text-xs font-mono text-secondary px-2.5 py-1 bg-secondary/10 rounded-full border border-secondary/20">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
