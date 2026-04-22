import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const skills = [
  { category: "Languages", items: ["C++", "JavaScript", "TypeScript", "SQL"] },
  { category: "Frontend", items: ["React.js", "Next.js", "Redux", "Recoil", "Tailwind", "Material UI", "Shadcn", "HTML", "CSS"] },
  { category: "Backend", items: ["Node.js", "Express.js"] },
  { category: "Databases", items: ["Supabase", "MongoDB", "PostgreSQL"] },
  { category: "Tools", items: ["Git", "GitHub", "Postman", "Vercel"] },
];

export default function SkillsSection() {
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
      id="skills"
      ref={containerRef}
      className="min-h-screen flex items-center py-32 relative z-30"
    >
      <motion.div
        className="container mx-auto px-6 max-w-6xl"
        style={{ opacity, scale, y }}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Technical Arsenal</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The tools I use to turn complex problems into elegant solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skillGroup, idx) => (
            <motion.div
              key={skillGroup.category}
              className={`glass-panel rounded-2xl p-8 border border-white/5 hover:border-primary/50 transition-colors duration-500 group ${idx === skills.length - 1 ? 'md:col-span-2 lg:col-span-1' : ''}`}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-display font-semibold mb-6 text-foreground group-hover:text-primary transition-colors">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skillGroup.items.map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 rounded-lg bg-background/50 border border-white/10 text-sm font-medium text-muted-foreground group-hover:border-primary/30 group-hover:text-foreground transition-all duration-300 hover:bg-primary/10 hover:shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
