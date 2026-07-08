import React, { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';

const AnimatedText = ({ text, className = "", wordClassName = "" }: { text: string, className?: string, wordClassName?: string }) => {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");
  
  if (shouldReduceMotion) {
    return <span className={className}>{text}</span>;
  }

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

const drawVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    const delay = 0.5 + i * 0.1;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.1 }
      }
    };
  }
};

const iconIdleVariants = {
  float: {
    y: [-5, 5, -5],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
  },
  pulse: {
    scale: [1, 1.05, 1],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  },
  rotate: {
    rotate: [0, 5, 0, -5, 0],
    transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
  }
};

const WebsiteIcon = ({ className = "", custom = 0 }: any) => (
  <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <motion.rect x="2" y="4" width="20" height="16" rx="2" variants={drawVariants} custom={custom} />
    <motion.path d="M2 8h20" variants={drawVariants} custom={custom + 1} />
    <motion.circle cx="6" cy="6" r="0.5" variants={drawVariants} custom={custom + 2} />
    <motion.circle cx="8" cy="6" r="0.5" variants={drawVariants} custom={custom + 3} />
  </motion.svg>
);

const SoftwareIcon = ({ className = "", custom = 0 }: any) => (
  <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <motion.polygon points="12 2 2 7 12 12 22 7 12 2" variants={drawVariants} custom={custom} />
    <motion.polyline points="2 17 12 22 22 17" variants={drawVariants} custom={custom + 1} />
    <motion.polyline points="2 12 12 17 22 12" variants={drawVariants} custom={custom + 2} />
  </motion.svg>
);

const RobotIcon = ({ className = "", custom = 0 }: any) => (
  <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <motion.rect x="3" y="11" width="18" height="10" rx="2" variants={drawVariants} custom={custom} />
    <motion.circle cx="12" cy="5" r="2" variants={drawVariants} custom={custom + 1} />
    <motion.path d="M12 7v4" variants={drawVariants} custom={custom + 2} />
    <motion.line x1="8" y1="16" x2="8" y2="16" strokeWidth="2" strokeLinecap="round" variants={drawVariants} custom={custom + 3} />
    <motion.line x1="16" y1="16" x2="16" y2="16" strokeWidth="2" strokeLinecap="round" variants={drawVariants} custom={custom + 4} />
  </motion.svg>
);

const NetworkIcon = ({ className = "", custom = 0 }: any) => (
  <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <motion.circle cx="12" cy="5" r="2" variants={drawVariants} custom={custom} />
    <motion.circle cx="19" cy="12" r="2" variants={drawVariants} custom={custom + 1} />
    <motion.circle cx="5" cy="12" r="2" variants={drawVariants} custom={custom + 2} />
    <motion.circle cx="12" cy="19" r="2" variants={drawVariants} custom={custom + 3} />
    <motion.path d="M12 7v3" variants={drawVariants} custom={custom + 4} />
    <motion.path d="M10 12H7" variants={drawVariants} custom={custom + 5} />
    <motion.path d="M17 12h-3" variants={drawVariants} custom={custom + 6} />
    <motion.path d="M12 17v-3" variants={drawVariants} custom={custom + 7} />
  </motion.svg>
);

const FlowIcon = ({ className = "", custom = 0 }: any) => (
  <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <motion.rect x="3" y="3" width="6" height="6" rx="1" variants={drawVariants} custom={custom} />
    <motion.rect x="15" y="3" width="6" height="6" rx="1" variants={drawVariants} custom={custom + 1} />
    <motion.rect x="9" y="15" width="6" height="6" rx="1" variants={drawVariants} custom={custom + 2} />
    <motion.path d="M6 9v3a2 2 0 0 0 2 2h4" variants={drawVariants} custom={custom + 3} />
    <motion.path d="M18 9v3a2 2 0 0 1-2 2h-4" variants={drawVariants} custom={custom + 4} />
  </motion.svg>
);

const ChartIcon = ({ className = "", custom = 0 }: any) => (
  <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <motion.line x1="18" y1="20" x2="18" y2="10" variants={drawVariants} custom={custom} />
    <motion.line x1="12" y1="20" x2="12" y2="4" variants={drawVariants} custom={custom + 1} />
    <motion.line x1="6" y1="20" x2="6" y2="14" variants={drawVariants} custom={custom + 2} />
    <motion.line x1="3" y1="20" x2="21" y2="20" variants={drawVariants} custom={custom + 3} />
  </motion.svg>
);

const BANDS = [
  {
    title: "Full Website Development",
    desc: "From landing pages to full multi-page platforms, built fast and built right.",
    bg: "bg-[var(--color-blue)]",
    textCol: "text-[#FFFFFF]",
    Icon: WebsiteIcon,
    idleAnim: "float"
  },
  {
    title: "Software & App Development",
    desc: "Custom software solutions and applications, from concept to deployment.",
    bg: "bg-[var(--color-sage)]",
    textCol: "text-[#FFFFFF]",
    Icon: SoftwareIcon,
    idleAnim: "pulse"
  }
];

const AI_DATA_SERVICES = [
  {
    id: "ai-automation",
    title: "AI Automation",
    color: "var(--color-blue)",
    Icon: RobotIcon,
    subItems: ["AI Assistants", "CRM Automation", "Document Processing"]
  },
  {
    id: "gen-ai",
    title: "GenAI",
    color: "var(--color-sage)",
    Icon: NetworkIcon,
    subItems: ["RAG Systems", "AI Chatbots"]
  },
  {
    id: "ml-engineering",
    title: "ML Engineering",
    color: "var(--color-orange)",
    Icon: FlowIcon,
    subItems: ["ML Model Building & Deployment (FastAPI)"]
  },
  {
    id: "data-analytics",
    title: "Data Analytics",
    color: "var(--color-red)",
    Icon: ChartIcon,
    subItems: ["Python-based Analysis", "Power BI Dashboards"]
  }
];

const BandSection: React.FC<{ band: typeof BANDS[0], index: number }> = ({ band, index }) => {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  
  const contentVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const descVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.03, delayChildren: 0.5 }
    }
  };

  return (
    <div ref={ref} className={`w-full py-24 sm:py-32 ${band.bg} ${band.textCol} overflow-hidden`}>
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-12 sm:gap-8">
        <motion.div 
          className="w-full max-w-2xl"
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={contentVariants}
        >
          <h3 className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] mb-6">
            <AnimatedText text={band.title} />
          </h3>
          <motion.div variants={descVariants}>
            <p className="font-mono text-lg sm:text-xl md:text-2xl font-medium leading-relaxed opacity-90">
              <AnimatedText text={band.desc} />
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="shrink-0 relative w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64"
          style={{ y: shouldReduceMotion ? 0 : y }}
        >
          <motion.div
            initial={shouldReduceMotion ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="w-full h-full"
          >
            <motion.div
              variants={shouldReduceMotion ? {} : (iconIdleVariants as any)}
              animate={band.idleAnim}
              className="w-full h-full"
            >
              <band.Icon className="w-full h-full opacity-80" custom={0} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const DevTabContent = () => (
  <div className="w-full flex flex-col">
     {BANDS.map((band, i) => (
       <BandSection key={i} band={band} index={i} />
     ))}
  </div>
);

const rowVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 28 }
  }
};

const AccordionRow = ({ item, index, isExpanded, toggle, shouldReduceMotion }: any) => {
  return (
    <motion.div
      variants={shouldReduceMotion ? {} : rowVariants}
      className={`w-full bg-[var(--color-surface)] border-[2.5px] border-[var(--color-line)] relative overflow-hidden flex flex-col mb-4 rounded-xl group cursor-pointer transition-all duration-300 ${isExpanded ? 'shadow-md' : 'hover:-translate-y-1 hover:shadow-md hover:bg-[#FDFCFB]'}`}
      onClick={toggle}
      layout={!shouldReduceMotion}
    >
       <div 
         className="absolute top-0 left-0 bottom-0 w-3 md:w-4 z-10"
         style={{ backgroundColor: item.color }}
       />

       <div className="w-full pl-8 pr-6 md:pl-10 py-5 sm:py-6 flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
             <div className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--color-ink)] opacity-70">
                <item.Icon className="w-full h-full" custom={0} />
             </div>
             <h3 className="font-sans font-bold text-xl sm:text-2xl text-[var(--color-ink)]">
               {item.title}
             </h3>
          </div>
          
          <motion.div
             animate={{ rotate: isExpanded ? 45 : 0 }}
             transition={{ duration: 0.3 }}
             className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shrink-0 border-[2.5px] border-[var(--color-line)] rounded-full text-[var(--color-ink)] group-hover:border-[var(--color-ink)] transition-colors"
          >
             <Plus size={20} strokeWidth={2.5} />
          </motion.div>
       </div>

       <AnimatePresence initial={false}>
          {isExpanded && (
             <motion.div
                initial={shouldReduceMotion ? { height: 0, opacity: 0 } : { height: 0, opacity: 0 }}
                animate={shouldReduceMotion ? { height: 'auto', opacity: 1 } : { height: 'auto', opacity: 1 }}
                exit={shouldReduceMotion ? { height: 0, opacity: 0 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="w-full pl-8 pr-6 md:pl-10 overflow-hidden"
             >
                <div className="pb-6 pt-2">
                   <ul className="flex flex-col gap-3">
                      {item.subItems.map((sub: string, i: number) => (
                         <motion.li
                            key={i}
                            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: shouldReduceMotion ? 0 : i * 0.05 + 0.1 }}
                            className="flex items-center gap-3"
                         >
                            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                            <span className="font-sans text-lg sm:text-xl font-medium text-[var(--color-ink)] opacity-80">
                               {sub}
                            </span>
                         </motion.li>
                      ))}
                   </ul>
                </div>
             </motion.div>
          )}
       </AnimatePresence>
    </motion.div>
  );
};

const AiTabContent = () => {
  const shouldReduceMotion = useReducedMotion();
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    setExpandedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  return (
    <motion.div 
      className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-12 sm:py-24 flex flex-col"
      variants={containerVariants}
      initial={shouldReduceMotion ? "visible" : "hidden"}
      animate="visible"
    >
      {AI_DATA_SERVICES.map((item, index) => (
         <AccordionRow 
           key={item.id} 
           item={item} 
           index={index}
           isExpanded={expandedIds.includes(item.id)} 
           toggle={() => toggle(item.id)} 
           shouldReduceMotion={shouldReduceMotion}
         />
      ))}
    </motion.div>
  );
};

const tabVariants = {
  initial: (isDev: boolean) => ({
    scale: 0.95,
    x: isDev ? -40 : 40,
    opacity: 0,
    rotateX: -5,
  }),
  animate: {
    scale: 1,
    x: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 28,
    }
  },
  exit: (isDev: boolean) => ({
    scale: 0.95,
    x: isDev ? 40 : -40,
    opacity: 0,
    rotateX: 5,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 28,
    }
  })
};

export default function Services() {
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<'dev' | 'ai'>('dev');
  const [flashKey, setFlashKey] = useState(0);

  const handleTabChange = (tab: 'dev' | 'ai') => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setFlashKey(prev => prev + 1);
  };

  const isDev = activeTab === 'dev';
  const flashColor = isDev ? 'var(--color-blue)' : 'var(--color-red)';

  return (
    <section id="services" className="w-full flex flex-col bg-[var(--color-base)] pt-32 pb-0 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 mb-12 flex flex-col gap-8 items-start">
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
            <AnimatedText text="What We Build" />
          </h2>
        </motion.div>

        {/* Tab Selector */}
        <div className="flex items-center justify-start gap-1 bg-[var(--color-surface)] border-[2.5px] border-[var(--color-line)] p-1.5 rounded-full w-fit">
           <button 
             onClick={() => handleTabChange('dev')}
             className={`px-5 sm:px-8 py-2.5 rounded-full font-sans font-bold text-sm sm:text-base transition-all ${isDev ? 'bg-[var(--color-ink)] text-white shadow-md' : 'text-[#1C2321]/60 hover:text-[#1C2321] hover:bg-[var(--color-base)]'}`}
           >
              Development
           </button>
           <button 
             onClick={() => handleTabChange('ai')}
             className={`px-5 sm:px-8 py-2.5 rounded-full font-sans font-bold text-sm sm:text-base transition-all ${!isDev ? 'bg-[var(--color-ink)] text-white shadow-md' : 'text-[#1C2321]/60 hover:text-[#1C2321] hover:bg-[var(--color-base)]'}`}
           >
              AI & Data
           </button>
        </div>
      </div>
      
      {/* Tab Content Container */}
      <div className="w-full flex flex-col relative" style={{ perspective: '1000px' }}>
         <AnimatePresence mode="wait">
            <motion.div
               key={activeTab}
               custom={isDev}
               variants={shouldReduceMotion ? {} : tabVariants}
               initial={shouldReduceMotion ? "animate" : "initial"}
               animate="animate"
               exit={shouldReduceMotion ? "animate" : "exit"}
               className="w-full"
            >
               {isDev ? <DevTabContent /> : <AiTabContent />}
            </motion.div>
         </AnimatePresence>

         {/* Color-Flash Accent */}
         {!shouldReduceMotion && (
           <AnimatePresence mode="wait">
             <motion.div
               key={flashKey}
               initial={{ x: '-100%', opacity: 0.8 }}
               animate={{ x: '100%', opacity: 0 }}
               transition={{ duration: 0.4, ease: 'linear', delay: 0.1 }}
               className="absolute top-0 left-0 w-full h-[6px] z-50 pointer-events-none"
               style={{ 
                 backgroundColor: flashColor,
                 boxShadow: `0 0 20px 4px ${flashColor}`
               }}
             />
           </AnimatePresence>
         )}
      </div>
    </section>
  );
}

