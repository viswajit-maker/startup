import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Star } from 'lucide-react';

const AnimatedText = ({ text, className = "", wordClassName = "" }: { text: string, className?: string, wordClassName?: string }) => {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");
  if (shouldReduceMotion) return <span className={className}>{text}</span>;
  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] pb-1 align-bottom">
          <motion.span
            className={`inline-block ${wordClassName}`}
            variants={{
              hidden: { y: "100%", opacity: 0 },
              visible: { y: "0%", opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

function MagneticButton({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    if (shouldReduceMotion) return;
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative overflow-hidden group ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-[var(--color-ink)] translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 ease-out z-0" />
    </motion.button>
  );
}

export default function CTASection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="cta" className="w-full flex flex-col bg-[var(--color-base)] pt-32 pb-32 overflow-hidden border-t-[3px] border-[var(--color-line)]">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          
          {/* Left Column: Availability */}
          <motion.div 
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 border-[2.5px] border-[var(--color-line)] bg-[var(--color-surface)] rounded-2xl p-8 sm:p-12 flex flex-col justify-center"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[var(--color-ink)] opacity-70">Status</span>
                <div className="flex items-center gap-4">
                   {/* Pulsing dot */}
                   <div className="relative flex items-center justify-center w-4 h-4">
                      {!shouldReduceMotion && (
                        <motion.div 
                          animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }} 
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute inset-0 rounded-full" 
                          style={{ backgroundColor: 'var(--color-sage)' }} 
                        />
                      )}
                      <div className="relative w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--color-sage)' }} />
                   </div>
                   <h3 className="font-sans font-black text-2xl sm:text-3xl text-[var(--color-ink)] leading-tight">Currently Accepting New Projects</h3>
                </div>
              </div>
              
              <div className="h-[1px] w-full bg-[var(--color-line)]" />
              
              <div className="flex flex-col gap-2">
                 <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold tracking-widest uppercase opacity-50 text-[var(--color-ink)]">Response Time:</span>
                    <span className="font-sans font-bold text-sm text-[var(--color-ink)]">Within 24 hours</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold tracking-widest uppercase opacity-50 text-[var(--color-ink)]">Team:</span>
                    <span className="font-sans font-bold text-sm text-[var(--color-ink)]">4 engineers ready to build</span>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Fiverr CTA */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1"
          >
             <motion.div 
               animate={shouldReduceMotion ? {} : { scale: [1, 1.02, 1] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="w-full h-full bg-[var(--color-blue)] rounded-2xl p-8 sm:p-12 flex flex-col justify-center border-[2.5px] border-[var(--color-ink)] shadow-[8px_8px_0px_0px_rgba(28,35,33,0.1)] relative overflow-hidden"
             >
                {/* Background graphic */}
                <div className="absolute top-4 right-4 opacity-10">
                   <Star size={120} fill="#FFFFFF" color="#FFFFFF" />
                </div>
                
                <div className="relative z-10 flex flex-col gap-6">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border-[2px] border-[#FFFFFF] flex items-center justify-center bg-[var(--color-ink)]">
                         <Star size={18} fill="#FFFFFF" color="#FFFFFF" />
                      </div>
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FFFFFF] opacity-90">Verified Partners</span>
                   </div>
                   
                   <div>
                     <h3 className="font-sans font-black text-4xl sm:text-5xl text-[#FFFFFF] mb-3 leading-tight">Ready to Build Something Great?</h3>
                     <p className="font-sans text-lg font-medium text-[#FFFFFF] opacity-90">Hire us directly on Fiverr — fast turnaround, real results.</p>
                   </div>
                   
                   <div className="mt-4">
                      <MagneticButton className="px-8 py-4 bg-[var(--color-surface)] text-[var(--color-ink)] border-[2px] border-[var(--color-ink)] rounded-full font-sans font-black uppercase tracking-wider text-sm sm:text-base hover:text-[var(--color-surface)]">
                         Hire Us on Fiverr
                      </MagneticButton>
                   </div>
                </div>
             </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
