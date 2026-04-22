import { useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { ExternalLink, Github, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: "Finexa",
    description: "Full-stack finance tracker with Groq AI for multi-intent queries and automated spending summaries. Integrates multiple API endpoints for comprehensive financial overview.",
    tech: ["Next.js", "Tailwind", "Shadcn", "Groq API"],
    image: "/finexa-preview.png",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Cafe Ordering System",
    description: "Comprehensive admin dashboard handling 100+ daily orders. Features seat-level tracking, 10+ REST APIs, and seamless real-time updates.",
    tech: ["React", "Material UI", "Node.js", "Express", "MongoDB"],
    image: "/cafe-preview.png",
    liveUrl: "#",
    githubUrl: "#",
    videoUrl: "#"
  },
  {
    title: "Build Streak",
    description: "Daily streak tracking application with auto continuation/reset logic, dynamic leaderboard APIs, and modular component architecture.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    image: "/streak-preview.png",
    liveUrl: "#",
    githubUrl: "#"
  }
];

export default function ProjectsSection() {
  const targetRef = useRef<HTMLDivElement>(null);

  // Horizontal scroll internal to the section
  const { scrollYProgress: horizontalProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(horizontalProgress, [0, 1], ["0%", "-66.66%"]); // For 3 items
  const opacity = useTransform(horizontalProgress, [0, 0.05, 0.95, 1], [0.3, 1, 1, 0.3]);

  return (
    <motion.section
      id="projects"
      ref={targetRef}
      className="h-[300vh] relative z-40"
      style={{ opacity }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute top-10 left-10 md:left-20 z-10">
          <h2 className="text-5xl md:text-7xl font-display font-bold text-gradient">Selected Work</h2>
        </div>

        <motion.div 
          className="flex gap-10 px-10 md:px-20 pt-20 w-[300vw] h-[70vh]"
          style={{ x }}
        >
          {projects.map((project, idx) => (
            <div key={idx} className="w-[100vw] max-w-4xl h-full flex-shrink-0 flex items-center justify-center">
              <div className="w-full h-full glass-panel rounded-3xl overflow-hidden border border-white/10 group relative flex flex-col md:flex-row">
                
                {/* Image Side */}
                <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden bg-background">
                  <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent z-10 md:hidden" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-80"
                  />
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 mix-blend-overlay" />
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-20">
                  <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">{project.title}</h3>
                  <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-10">
                    {project.tech.map(t => (
                      <span key={t} className="text-xs font-mono text-secondary px-3 py-1 bg-secondary/10 rounded-full border border-secondary/20">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap gap-4">
                    <Button variant="default" className="rounded-full px-6 glow-shadow-hover" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noreferrer">
                        Live Site <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                    <Button variant="outline" className="rounded-full px-6" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noreferrer">
                        GitHub <Github className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                    {project.videoUrl && (
                      <Button variant="ghost" className="rounded-full px-6 text-primary hover:text-primary" asChild>
                        <a href={project.videoUrl} target="_blank" rel="noreferrer">
                          Watch Demo <PlayCircle className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
