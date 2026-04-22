import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Phone, Github, Linkedin, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 1], [0.95, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.4, 1], [60, 0, 0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <motion.section 
      id="contact"
      ref={containerRef}
      className="min-h-screen py-32 relative z-50 flex items-center"
      style={{ opacity, scale, y }}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Info Side */}
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold mb-4 sm:mb-6">Let's Connect</h2>
            <p className="text-muted-foreground text-base sm:text-lg mb-8 sm:mb-12 max-w-md">
              Have a project in mind or want to explore an opportunity? I'm always open to discussing new ideas.
            </p>

            <div className="space-y-6 sm:space-y-8">
              <a href="mailto:rishabhsahu13873@gmail.com" className="flex items-center group min-w-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 mr-4 sm:mr-6">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider mb-1">Email</div>
                  <div className="text-base sm:text-lg md:text-xl font-medium text-foreground group-hover:text-primary transition-colors break-all">rishabhsahu13873@gmail.com</div>
                </div>
              </a>

              <a href="tel:+917000332087" className="flex items-center group min-w-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground group-hover:shadow-[0_0_20px_rgba(157,78,221,0.4)] transition-all duration-300 mr-4 sm:mr-6">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider mb-1">Phone</div>
                  <div className="text-base sm:text-lg md:text-xl font-medium text-foreground group-hover:text-secondary transition-colors">+91 7000332087</div>
                </div>
              </a>

              <div className="flex gap-4 pt-8 border-t border-white/10 mt-8">
                <a href="#" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-foreground hover:text-primary hover:border-primary/50 transition-all duration-300">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-foreground hover:text-secondary hover:border-secondary/50 transition-all duration-300">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl blur-2xl opacity-50 pointer-events-none" />
            <div className="glass-panel p-8 md:p-12 rounded-3xl relative">
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full min-h-[400px] flex flex-col items-center justify-center text-center"
                >
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,240,255,0.3)]">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-4">Message Sent</h3>
                  <p className="text-muted-foreground">Thank you for reaching out. I'll get back to you shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm text-muted-foreground uppercase tracking-wider">Name</label>
                    <Input 
                      id="name" 
                      required 
                      className="bg-background/50 border-white/10 focus-visible:ring-primary focus-visible:border-primary h-14" 
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm text-muted-foreground uppercase tracking-wider">Email</label>
                    <Input 
                      id="email" 
                      type="email" 
                      required 
                      className="bg-background/50 border-white/10 focus-visible:ring-primary focus-visible:border-primary h-14" 
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm text-muted-foreground uppercase tracking-wider">Message</label>
                    <Textarea 
                      id="message" 
                      required 
                      className="bg-background/50 border-white/10 focus-visible:ring-primary focus-visible:border-primary min-h-[150px] resize-none" 
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-14 rounded-xl text-base font-medium glow-shadow-hover transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">Sending... <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="ml-2 border-2 border-white/30 border-t-white rounded-full w-5 h-5" /></span>
                    ) : (
                      <span className="flex items-center">Send Message <Send className="ml-2 w-5 h-5" /></span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}
