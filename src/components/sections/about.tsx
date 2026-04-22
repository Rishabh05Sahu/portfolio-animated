import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.75, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.95, 1, 1, 1.03]);
  const y = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [60, 0, 0, -40]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="min-h-screen flex items-center py-32 relative z-20"
    >
      <motion.div
        className="container mx-auto px-6 max-w-6xl"
        style={{ opacity, scale, y }}
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual Element */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-2xl opacity-50"></div>
            <div className="glass-panel p-8 rounded-2xl relative glowing-border aspect-square flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000')] bg-cover bg-center opacity-30 mix-blend-overlay group-hover:scale-110 transition-transform duration-700"></div>
              <div className="relative z-10 text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full border-2 border-primary/50 flex items-center justify-center text-4xl font-display text-primary shadow-[0_0_15px_rgba(0,240,255,0.5)]">
                  RS
                </div>
                <h3 className="text-2xl font-display font-bold mb-2">Rishabh Sahu</h3>
                <p className="text-muted-foreground uppercase tracking-widest text-sm">Based in India</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient inline-block">
              Building the future.
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                I am a Full Stack Developer specializing in building scalable and beautiful applications. I don't just write code; I craft digital experiences that leave a lasting impression.
              </p>
              <p>
                With expertise across the modern stack, from deep database architecture to highly interactive frontend interfaces, I bridge the gap between complex logic and stunning visual design.
              </p>
              <p>
                When I'm not pushing pixels or optimizing queries, I'm exploring new technologies and refining my craft to build products that matter.
              </p>
            </div>

            <div className="pt-6 grid grid-cols-2 gap-8 border-t border-border/50">
              <div>
                <h4 className="text-3xl font-display font-bold text-foreground mb-2">10+</h4>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Projects Delivered</p>
              </div>
              <div>
                <h4 className="text-3xl font-display font-bold text-foreground mb-2">100%</h4>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Commitment</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
