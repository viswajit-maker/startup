import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

const TAB_TITLES = ['STATS', 'PROJECTS', 'AVAILABILITY', 'ACTIVITY'];
const TAB_COLORS = ['var(--color-blue)', 'var(--color-sage)', 'var(--color-orange)', 'var(--color-red)'];

// Sai: update these numbers to your actual current counts
const StatsTab = () => (
  <div className="grid grid-cols-2 gap-2 w-full h-full">
    <div className="col-span-2 bg-[var(--color-blue)] border-[2.5px] border-[var(--color-ink)] p-3 flex justify-between items-center text-[#FFFFFF]">
      <span className="font-mono text-[10px] sm:text-xs font-bold tracking-widest opacity-80">HACKATHONS ENTERED</span>
      <span className="font-sans text-2xl sm:text-3xl font-black">12</span>
    </div>
    <div className="bg-[var(--color-sage)] border-[2.5px] border-[var(--color-ink)] p-3 flex flex-col justify-between text-[#FFFFFF]">
      <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-widest opacity-80">HACKATHONS WON</span>
      <span className="font-sans text-xl sm:text-2xl font-black">5</span>
    </div>
    <div className="bg-[var(--color-orange)] border-[2.5px] border-[var(--color-ink)] p-3 flex flex-col justify-between text-[#FFFFFF]">
      <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-widest opacity-80">LIVE PROJECTS SHIPPED</span>
      <span className="font-sans text-xl sm:text-2xl font-black">3</span>
    </div>
  </div>
);

// Sai: add real live URLs to these project names/status tags once deployed
const ProjectsTab = () => (
  <div className="flex flex-col gap-2 w-full h-full justify-center">
    {[
      { name: 'MedVault AI', desc: 'Patient-sovereign healthcare platform with AES-256 encrypted health vault and AI drug interaction checks' },
      { name: 'PhishShield AI', desc: 'Full-stack phishing detection using ML classification and real-time URL threat scanning' },
      { name: 'MediTriage AI', desc: 'React PWA with ML-based triage assistant and automated patient communication' },
    ].map((proj, i) => (
      <div key={i} className="flex flex-col p-2 border-[2.5px] border-[var(--color-ink)] bg-white gap-1">
        <div className="flex items-center justify-between">
          <span className="font-sans text-xs sm:text-sm font-bold text-[var(--color-ink)]">{proj.name}</span>
          <div className="flex items-center space-x-1.5">
            <span className="font-mono text-[8px] sm:text-[9px] font-bold tracking-wider text-[var(--color-sage)]">LIVE</span>
            <div className="w-2 h-2 rounded-full bg-[var(--color-sage)] shadow-[0_0_4px_var(--color-sage)]" />
          </div>
        </div>
        <span className="font-sans text-[9px] sm:text-[10px] text-[var(--color-ink)] opacity-70 leading-tight">
          {proj.desc}
        </span>
      </div>
    ))}
    <div className="flex flex-wrap gap-1.5 mt-1">
      {['React', 'Python', 'AI/ML', 'Prompt Engineering'].map((tag, i) => (
        <span
          key={tag}
          className={`px-2 py-0.5 text-[8px] sm:text-[9px] font-bold uppercase tracking-widest font-mono border-[2px]`}
          style={{
            borderColor: i % 2 === 0 ? 'var(--color-blue)' : 'var(--color-orange)',
            color: i % 2 === 0 ? 'var(--color-blue)' : 'var(--color-orange)',
            backgroundColor: i % 2 === 0 ? 'rgba(61, 107, 158, 0.15)' : 'rgba(217, 108, 63, 0.15)'
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);

// Sai: update availability status manually as your actual bandwidth changes
const AvailabilityTab = () => (
  <div className="flex flex-col w-full h-full justify-center gap-3">
    <div className="w-full border-[2.5px] border-[var(--color-ink)] p-3 bg-[var(--color-sage)] text-[#FFFFFF] flex flex-col gap-2">
      <span className="font-mono text-[10px] font-bold tracking-widest opacity-80">CURRENT STATUS</span>
      <div className="flex items-center space-x-2">
        <div className="w-2.5 h-2.5 rounded-full bg-[#FFFFFF] animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
        <span className="font-sans text-sm sm:text-base font-black tracking-tight">ACCEPTING NEW PROJECTS</span>
      </div>
    </div>
    
    <div className="w-full border-[2.5px] border-[var(--color-ink)] p-3 bg-white flex flex-col gap-1">
      <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-widest text-[var(--color-blue)]">RESPONSE TIME</span>
      <span className="font-sans text-xs sm:text-sm font-bold text-[var(--color-ink)]">Within 24 hours</span>
    </div>
    
    <div className="w-full border-[2.5px] border-[var(--color-ink)] p-3 bg-white flex flex-col gap-1">
      <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-widest text-[var(--color-orange)]">TEAM</span>
      <span className="font-sans text-[10px] sm:text-[11px] font-bold text-[var(--color-ink)]">4 engineers — full stack, ML/AI, and design coverage</span>
    </div>
  </div>
);

// Sai: swap these for your actual most recent 3 milestones as they happen, keep it current
const ActivityTab = () => (
  <div className="flex flex-col gap-2 w-full h-full justify-center">
    {[
      { label: 'Shipped MedVault AI healthcare platform', color: 'var(--color-blue)' },
      { label: 'Placed in Vortexa Hackathon', color: 'var(--color-sage)' },
      { label: 'Built PhishShield AI phishing detector', color: 'var(--color-orange)' }
    ].map((item, i) => (
      <div key={i} className="border-[2.5px] border-[var(--color-ink)] p-3 bg-white flex items-center gap-3">
        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
        <span className="font-sans text-[10px] sm:text-xs font-bold text-[var(--color-ink)]">→ {item.label}</span>
      </div>
    ))}
  </div>
);

const TABS = [
  <StatsTab key="stats" />,
  <ProjectsTab key="projects" />,
  <AvailabilityTab key="availability" />,
  <ActivityTab key="activity" />
];

interface TabContentProps {
  activeTab: number;
  shouldReduceMotion: boolean | null;
}

const TabContent = ({ activeTab, shouldReduceMotion }: TabContentProps) => {
  // Use window width to adjust rotateX slightly on small screens to prevent jank
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 375;
  const rotateAngle = isMobile ? 5 : 8;

  // Determine direction based on entering index:
  // Tab1->2 (idx 1): slide up (y)
  // Tab2->3 (idx 2): slide left (x)
  // Tab3->4 (idx 3): slide up (y)
  // Tab4->1 (idx 0): slide left (x)
  const isVertical = activeTab % 2 !== 0;

  const variants = {
    initial: {
      scale: 0.85,
      y: isVertical ? 30 : 0,
      x: isVertical ? 0 : 30,
      rotateX: shouldReduceMotion ? 0 : -rotateAngle,
    },
    animate: {
      scale: 1,
      y: 0,
      x: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 28,
        duration: shouldReduceMotion ? 0 : undefined
      }
    },
    exit: {
      scale: 0.85,
      y: isVertical ? -30 : 0,
      x: isVertical ? 0 : -30,
      rotateX: shouldReduceMotion ? 0 : rotateAngle,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 28,
        duration: shouldReduceMotion ? 0 : undefined
      }
    }
  };

  return (
    <div className="w-full h-full flex-1 relative" style={{ perspective: '800px' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={variants}
          initial={shouldReduceMotion ? "animate" : "initial"}
          animate="animate"
          exit={shouldReduceMotion ? "animate" : "exit"}
          className="w-full h-full flex flex-col justify-center"
          style={{ willChange: 'transform' }}
        >
          {TABS[activeTab]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default function DashboardPreviewCard() {
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState(0);
  const [flashKey, setFlashKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 4);
      setFlashKey((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleTabClick = (i: number) => {
    if (i === activeTab) return;
    setActiveTab(i);
    setFlashKey((prev) => prev + 1);
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <motion.div
        className="relative w-full max-w-sm mx-auto shadow-[12px_12px_0px_0px_rgba(28,35,33,0.1)] border-[3px] border-[var(--color-ink)] bg-[var(--color-surface)] z-10 flex flex-col"
        animate={shouldReduceMotion ? {} : { y: [-5, 5, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ rotate: '2deg' }}
      >
        {/* Card Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b-[3px] border-[var(--color-ink)] bg-[var(--color-base)] relative z-20">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-[var(--color-red)] border-[1.5px] border-[var(--color-ink)]" />
            <div className="w-3 h-3 rounded-full bg-[var(--color-orange)] border-[1.5px] border-[var(--color-ink)]" />
            <div className="w-3 h-3 rounded-full bg-[var(--color-sage)] border-[1.5px] border-[var(--color-ink)]" />
          </div>
          <div className="font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase text-[var(--color-ink)]">
            FORGE COLLECTIVE
          </div>
        </div>
        
        {/* Dynamic Content Area */}
        <div className="relative p-5 flex flex-col h-[280px] sm:h-[300px] justify-center bg-[var(--color-surface)] overflow-hidden">
          
          <TabContent activeTab={activeTab} shouldReduceMotion={shouldReduceMotion} />
          
          {/* Color-Flash Accent */}
          {!shouldReduceMotion && (
            <AnimatePresence mode="wait">
              <motion.div
                key={flashKey}
                initial={{ x: '-100%', opacity: 0.8 }}
                animate={{ x: '100%', opacity: 0 }}
                transition={{ duration: 0.25, ease: 'linear', delay: 0.2 }}
                className="absolute top-1/2 left-0 w-full h-[3px] -mt-[1.5px] z-50 pointer-events-none"
                style={{ 
                  backgroundColor: TAB_COLORS[activeTab].replace('var(', '').replace(')', ''),
                  boxShadow: `0 0 12px 2px var(${TAB_COLORS[activeTab].replace('var(', '').replace(')', '')})`
                }}
              />
            </AnimatePresence>
          )}

        </div>

        {/* Tab Indicators Footer */}
        <div className="flex justify-between items-center p-4 border-t-[3px] border-[var(--color-ink)] bg-[var(--color-base)] relative z-20">
          <div className="flex space-x-3">
            {TAB_TITLES.map((_, i) => (
              <button
                key={i}
                onClick={() => handleTabClick(i)}
                className="w-3.5 h-3.5 border-[2px] border-[var(--color-ink)] rounded-[1px] cursor-pointer"
                style={{
                  backgroundColor: activeTab === i ? TAB_COLORS[i] : 'transparent',
                }}
                aria-label={`Switch to ${TAB_TITLES[i]} tab`}
              />
            ))}
          </div>
          <span className="font-mono text-[10px] font-bold text-[var(--color-ink)] opacity-50 tracking-widest transition-colors duration-300">
            {TAB_TITLES[activeTab]}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
