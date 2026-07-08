import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import DraftingCanvas from './DraftingCanvas';
import TickerBar from './TickerBar';
import DashboardPreviewCard from './DashboardPreviewCard';

interface StaggeredWordProps {
  children: React.ReactNode;
  index: number;
  isHeading?: boolean;
}

const StaggeredWord: React.FC<StaggeredWordProps> = ({ children, index, isHeading = true }) => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.span
      className="inline-block whitespace-pre"
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: isHeading ? 15 : 10 }}
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{
        duration: isHeading ? 0.8 : 0.5,
        delay: index * (isHeading ? 0.08 : 0.04) + 1.2,
        type: isHeading ? "spring" : "tween",
        bounce: isHeading ? 0.25 : 0,
        ease: isHeading ? undefined : "easeOut"
      }}
    >
      {children}
    </motion.span>
  );
};

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const ctaVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, delay: 2.2, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, delay: 2.5, ease: "easeOut" }
    }
  };

  const pWords = "Engineering digital infrastructure with architectural precision and agency-tier polish.".split(" ");

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden pt-12">
      <TickerBar />

      {/* Background Interactive Canvas */}
      <div className="absolute inset-0 z-0">
        <DraftingCanvas />
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-24 pointer-events-none flex flex-col lg:flex-row lg:items-center justify-between pt-32 pb-24 lg:py-0 gap-16 lg:gap-8 mt-12 lg:mt-0">
        <motion.div 
          className="max-w-3xl pointer-events-auto relative"
          animate={shouldReduceMotion ? {} : { y: [-5, 5, -5] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          
          {/* Ambient Drafting Detail - Dimension Line */}
          {!shouldReduceMotion && (
            <div className="absolute -left-12 top-4 bottom-4 w-4 hidden md:flex flex-col items-center justify-center opacity-40">
              <div className="w-3 h-px bg-[var(--color-ink)]" />
              <motion.div
                className="w-px bg-[var(--color-ink)] origin-top my-1"
                animate={{ scaleY: [0, 1, 1, 0] }}
                transition={{ duration: 6, repeat: Infinity, times: [0, 0.3, 0.7, 1], ease: "easeInOut" }}
              />
              <div className="w-3 h-px bg-[var(--color-ink)]" />
            </div>
          )}

          {/* Floating Shapes - Left Column */}
          {!shouldReduceMotion && (
            <>
              {/* Orange Dash */}
              <motion.div
                className="absolute -left-8 top-1/2 w-6 h-1.5 bg-[var(--color-orange)] hidden md:block"
                animate={{ y: [-4, 4, -4], rotate: [-2, 2, -2] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Blue Square */}
              <motion.div
                className="absolute -right-4 bottom-6 w-3 h-3 border-2 border-[var(--color-blue)] hidden md:block"
                animate={{ y: [4, -4, 4], rotate: [0, 45, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              />
            </>
          )}

          {/* H1 - Org Name */}
          <h1 
            className="font-serif text-[length:var(--text-h1)] leading-[var(--text-h1-lh)] font-medium text-[var(--color-ink)] tracking-tight mb-8"
            style={{ fontSize: 'clamp(3.5rem, 8vw, var(--text-h1))' }}
          >
            <StaggeredWord index={0}>Form </StaggeredWord>
            <StaggeredWord index={1}>&amp; </StaggeredWord>
            <StaggeredWord index={2}>Function</StaggeredWord>
            <br/>
            <StaggeredWord index={3}>Studi<span className="text-[var(--color-orange)]">o</span>.</StaggeredWord>
          </h1>

          {/* Tagline */}
          <p 
            className="font-sans text-[length:var(--text-h3)] leading-[var(--text-h3-lh)] font-light text-[var(--color-ink)] opacity-85 mb-12 max-w-2xl"
            style={{ fontSize: 'clamp(1.5rem, 4vw, var(--text-h3))' }}
          >
            {pWords.map((word, i) => (
              <StaggeredWord key={i} index={i + 4} isHeading={false}>{word} </StaggeredWord>
            ))}
          </p>

          {/* CTA Buttons Wrapper */}
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial="hidden"
            animate="visible"
            variants={shouldReduceMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 2.0 } } } : ctaVariants}
          >
            <motion.div
              animate={shouldReduceMotion ? {} : { scale: [1, 1.015, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              <button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative bg-[var(--color-blue)] text-[#FFFFFF] font-sans text-[length:var(--text-body)] font-medium px-8 py-4 rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)] focus:ring-offset-2 focus:ring-offset-[var(--color-base)] transition-colors cursor-pointer border border-transparent"
              >
                <span className="relative z-10 block">View Our Work</span>
                
                {/* Hover effect stroke draw */}
                {!shouldReduceMotion && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible rounded-sm" style={{ zIndex: 2 }}>
                    <rect x="0" y="0" width="100%" height="100%" rx="2" fill="none" stroke="var(--color-orange)" strokeWidth="4" 
                          pathLength="100" strokeDasharray="100" strokeDashoffset="100" 
                          className="transition-[stroke-dashoffset] duration-[600ms] ease-[cubic-bezier(0.2,0,0,1)] group-hover:!stroke-dashoffset-0" />
                  </svg>
                )}
              </button>
            </motion.div>

            <motion.div
              animate={shouldReduceMotion ? {} : { scale: [1, 1.015, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="inline-block"
            >
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative bg-transparent border-2 border-[var(--color-ink)] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-surface)] font-sans text-[length:var(--text-body)] font-medium px-8 py-3.5 rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-ink)] focus:ring-offset-2 focus:ring-offset-[var(--color-base)] transition-colors cursor-pointer"
              >
                <span className="relative z-10 block">Contact Us</span>
              </button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Dashboard Preview Card */}
        <motion.div 
          className="pointer-events-auto relative shrink-0 w-full max-w-md mx-auto lg:mx-0 mt-8 lg:mt-0"
          initial="hidden"
          animate="visible"
          variants={shouldReduceMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 2.2 } } } : cardVariants}
        >
          {/* Floating Shape 1: Blue Circle Outline */}
          <motion.div
            className="absolute -top-10 -right-8 w-16 h-16 border-[4px] border-[var(--color-blue)] rounded-full z-0 opacity-80"
            animate={shouldReduceMotion ? {} : { y: [-15, 10, -15], x: [5, -5, 5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Floating Shape 2: Orange Triangle */}
          <motion.div
            className="absolute -bottom-8 -left-8 z-20"
            animate={shouldReduceMotion ? {} : { y: [10, -10, 10], rotate: [0, 25, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <polygon points="24,6 6,42 42,42" fill="var(--color-orange)" stroke="var(--color-ink)" strokeWidth="4" strokeLinejoin="round" />
            </svg>
          </motion.div>

          <div className="relative z-10">
            <DashboardPreviewCard />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
