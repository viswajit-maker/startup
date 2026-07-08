import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Check } from 'lucide-react';

const TIERS = [
  { 
    id: 'tier1', 
    name: 'Landing Page', 
    color: 'var(--color-blue)', 
    desc: 'A focused single-page site to establish your presence fast.', 
    features: ['Custom design', 'Mobile responsive', 'Up to 5 sections', '1-2 week turnaround'],
    popular: false
  },
  { 
    id: 'tier2', 
    name: 'Full Website', 
    color: 'var(--color-orange)', 
    desc: 'A complete multi-page site built to grow with you.', 
    features: ['Multiple pages', 'Custom animations', 'CMS-ready structure', '2-4 week turnaround'],
    popular: true 
  },
  { 
    id: 'tier3', 
    name: 'Custom Software', 
    color: 'var(--color-red)', 
    desc: 'Full-stack applications, dashboards, or AI-powered tools.', 
    features: ['Full-stack development', 'Database + backend', 'AI/ML integration available', 'Timeline scoped per project'],
    popular: false 
  }
];

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

export default function Pricing() {
  const shouldReduceMotion = useReducedMotion();

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: any) => ({
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: custom.delay,
        type: 'spring',
        stiffness: custom.popular ? 400 : 300,
        damping: custom.popular ? 20 : 25
      }
    })
  };

  return (
    <section id="pricing" className="w-full flex flex-col bg-[var(--color-base)] pt-32 pb-32 overflow-hidden border-t-[3px] border-[var(--color-line)]">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 mb-16 text-center">
        <motion.div
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          <h2 className="font-sans font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-[var(--color-ink)] uppercase">
            <AnimatedText text="Ways to Work With Us" />
          </h2>
        </motion.div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {TIERS.map((tier, i) => (
               <motion.div
                  key={tier.id}
                  custom={{ delay: i * 0.15, popular: tier.popular }}
                  initial={shouldReduceMotion ? { opacity: 1 } : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={shouldReduceMotion ? {} : cardVariants}
                  className={`relative bg-[var(--color-surface)] border-[3px] border-[var(--color-ink)] rounded-2xl flex flex-col p-6 sm:p-8 ${tier.popular ? 'shadow-[12px_12px_0px_0px_rgba(28,35,33,0.1)] md:scale-105 z-10' : 'shadow-sm z-0'}`}
                  style={{ borderTop: `8px solid ${tier.color}` }}
               >
                  {tier.popular && (
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#FFFFFF] shadow-sm whitespace-nowrap" style={{ backgroundColor: tier.color }}>
                        Most Popular
                     </div>
                  )}

                  <div className="flex flex-col gap-2 mb-6">
                     <h3 className="font-sans font-black text-2xl sm:text-3xl text-[var(--color-ink)]">{tier.name}</h3>
                     <p className="font-sans text-sm sm:text-base font-medium leading-snug min-h-[40px]" style={{ color: '#1C2321' }}>{tier.desc}</p>
                  </div>

                  <div className="flex flex-col gap-4 mb-8 flex-1">
                     {tier.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                           <div className="mt-1 shrink-0 bg-[var(--color-base)] rounded-full p-0.5" style={{ color: tier.color }}>
                              <Check size={16} strokeWidth={3} />
                           </div>
                           <span className="font-sans text-sm sm:text-base font-bold" style={{ color: '#1C2321' }}>{feat}</span>
                        </div>
                     ))}
                  </div>

                  <button className="w-full py-4 border-[2.5px] border-[var(--color-ink)] rounded-lg font-sans font-black text-sm uppercase tracking-wider text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-surface)] transition-colors mt-auto cursor-pointer">
                     Get a Custom Quote
                  </button>
               </motion.div>
            ))}
         </div>
      </div>
    </section>
  );
}
