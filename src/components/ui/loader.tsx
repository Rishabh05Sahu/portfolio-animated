import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const duration = 900;
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress(Math.min((currentStep / steps) * 100, 100));

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => onCompleteRef.current(), 400);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="flex flex-col items-center gap-8 w-64">
        <motion.div 
          className="text-6xl font-display font-bold tracking-tighter text-transparent"
          style={{
            WebkitTextStroke: "1px hsl(var(--primary))",
            textShadow: "0 0 20px hsl(var(--primary) / 0.5)"
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          RS
        </motion.div>
        
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-secondary shadow-[0_0_15px_rgba(0,240,255,0.8)]"
            style={{ width: `${progress}%` }}
          />
          <div className="absolute top-0 left-0 h-full w-full bg-primary/20 blur-sm mix-blend-screen" style={{ width: `${progress}%` }} />
        </div>
        
        <div className="flex justify-between w-full text-xs font-mono text-primary/60 uppercase tracking-widest">
          <span>Initializing</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
    </motion.div>
  );
}
