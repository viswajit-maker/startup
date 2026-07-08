import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion, useMotionValue, useTransform } from 'motion/react';

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

const STEPS = [
  { num: '01', title: 'Discovery Call', desc: 'We start with a focused conversation to understand your goals, timeline, and vision. No jargon, no pressure — just clarity on what you actually need.', color: 'var(--color-blue)' },
  { num: '02', title: 'Scope & Quote', desc: 'You\'ll receive a clear breakdown of what we\'ll build, how long it will take, and what it costs. No hidden fees, no vague promises — everything is laid out upfront.', color: 'var(--color-sage)' },
  { num: '03', title: 'Build Sprints', desc: 'We build in focused, transparent sprints, sharing real progress as we go, not just at the end. You\'ll always know exactly where your project stands.', color: 'var(--color-orange)' },
  { num: '04', title: 'Delivery & Support', desc: 'You receive your finished, tested product ready to launch, plus ongoing support after delivery. We don\'t disappear once the project ships.', color: 'var(--color-red)' }
];

export default function Process() {
  const shouldReduceMotion = useReducedMotion();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const progressWidth = useTransform(x, [0, -width > 0 ? -width : -1000], ["0%", "100%"]);

  return (
    <section id="process" className="w-full flex flex-col bg-[var(--color-base)] pt-32 pb-32 overflow-hidden border-t-[3px] border-[var(--color-line)]">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 mb-16">
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
            <AnimatedText text="How We Work" />
          </h2>
        </motion.div>
      </div>

      <div ref={carouselRef} className="w-full overflow-hidden cursor-grab active:cursor-grabbing pb-16 select-none">
        <motion.div 
          drag={shouldReduceMotion ? false : "x"} 
          dragConstraints={{ right: 0, left: -width }} 
          style={{ x }}
          className="flex px-6 lg:px-8 min-w-max relative items-start gap-8 md:gap-16 pt-6"
        >
          {/* Track background */}
          <div className="absolute top-[35px] left-6 right-6 h-[2.5px] bg-[var(--color-line)] -z-10" />
          {/* Track progress */}
          <motion.div className="absolute top-[35px] left-6 h-[2.5px] bg-[var(--color-ink)] -z-10 origin-left" style={{ width: progressWidth }} />

          {STEPS.map((step, i) => (
            <motion.div 
              key={i} 
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="w-[280px] sm:w-[320px] md:w-[400px] shrink-0 relative flex flex-col pt-[35px]"
            >
              {/* Colored dot on the line */}
              <div className="absolute top-[29px] left-6 w-[15px] h-[15px] rounded-full border-[2.5px] border-[var(--color-ink)] bg-[var(--color-surface)] shadow-[0_0_0_4px_var(--color-base)] z-0" style={{ borderColor: step.color }} />
              
              {/* Card */}
              <motion.div 
                whileHover={shouldReduceMotion ? {} : { y: -8, boxShadow: `0 8px 0 0 ${step.color}40` }}
                className="mt-6 bg-[var(--color-surface)] border-[2.5px] border-[var(--color-line)] p-6 sm:p-8 rounded-xl transition-colors duration-300 flex flex-col gap-2"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = step.color;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-line)';
                }}
              >
                <h3 className="font-mono text-4xl sm:text-5xl font-black mb-2 transition-colors" style={{ color: step.color }}>{step.num}</h3>
                <h4 className="font-sans text-xl sm:text-2xl font-bold text-[var(--color-ink)]">{step.title}</h4>
                <p className="font-sans text-sm sm:text-base font-medium leading-relaxed" style={{ color: '#1C2321' }}>{step.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
