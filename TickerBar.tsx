import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export default function TickerBar() {
  const shouldReduceMotion = useReducedMotion();

  const PHRASES = [
    { text: "FULL STACK", bg: "bg-[var(--color-red)]", color: "text-\[#FFFFFF\]" },
    { text: "AI ENGINEERING", bg: "bg-[var(--color-orange)]", color: "text-[var(--color-ink)]" },
    { text: "4 BUILDERS", bg: "bg-[var(--color-blue)]", color: "text-\[#FFFFFF\]" },
    { text: "HACKATHON PROVEN", bg: "bg-[var(--color-sage)]", color: "text-\[#FFFFFF\]" },
    { text: "FREELANCE READY", bg: "bg-[var(--color-ink)]", color: "text-[var(--color-base)]" },
    { text: "REAL PROJECTS SHIPPED", bg: "bg-[var(--color-red)]", color: "text-\[#FFFFFF\]" },
  ];

  // Quadruple the phrases to ensure the screen is filled and allows seamless looping
  const loopItems = [...PHRASES, ...PHRASES, ...PHRASES, ...PHRASES];

  return (
    <div className="absolute top-0 left-0 w-full z-50 flex overflow-hidden border-b-[3px] border-[var(--color-ink)] bg-[var(--color-surface)]">
      {shouldReduceMotion ? (
        <div className="flex flex-wrap w-full">
          {PHRASES.map((item, idx) => (
            <div key={idx} className={`flex-1 px-4 py-2.5 flex justify-center items-center font-mono text-[11px] font-bold tracking-widest uppercase ${item.bg} ${item.color}`}>
              {item.text}
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          className="flex w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 25, repeat: Infinity }}
        >
          {loopItems.map((item, idx) => (
            <div key={idx} className={`px-8 py-3 flex items-center font-mono text-[11px] sm:text-xs font-bold tracking-widest uppercase shrink-0 ${item.bg} ${item.color}`}>
              {item.text}
              <div className="w-1.5 h-1.5 ml-8 bg-current rotate-45 opacity-60" />
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
