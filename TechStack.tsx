import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Atom, GitBranch, Wind, FileCode2, Terminal, Code2 } from 'lucide-react';

const PROJECTS = [
  { id: 'p1', name: 'MedVault AI', color: 'var(--color-blue)' },
  { id: 'p2', name: 'PhishShield AI', color: 'var(--color-sage)' },
  { id: 'p3', name: 'MediTriage AI', color: 'var(--color-orange)' }
];

const CATEGORIES = [
  { 
    id: 'FRONTEND', 
    label: 'FRONTEND', 
    color: 'var(--color-blue)',
    skills: [
      { id: 'react', label: 'React', type: 'icon', projects: ['p1', 'p2', 'p3'] },
      { id: 'ts', label: 'TypeScript', type: 'icon', projects: [] },
      { id: 'js', label: 'JavaScript', type: 'icon', projects: [] },
      { id: 'tailwind', label: 'Tailwind CSS', type: 'icon', projects: ['p1'] },
    ]
  },
  { 
    id: 'BACKEND', 
    label: 'BACKEND', 
    color: 'var(--color-orange)',
    skills: [
      { id: 'fastapi', label: 'FastAPI', type: 'text', projects: ['p2'] },
      { id: 'flask', label: 'Flask', type: 'text', projects: ['p3'] },
      { id: 'jwt', label: 'JWT Auth', type: 'text', projects: ['p1'] },
    ]
  },
  { 
    id: 'AI_ML', 
    label: 'AI / ML', 
    color: 'var(--color-red)',
    skills: [
      { id: 'prompt_eng', label: 'Prompt Engineering', type: 'text', projects: [] },
      { id: 'ml', label: 'Machine Learning', type: 'text', projects: ['p1', 'p2', 'p3'] },
      { id: 'tf', label: 'TensorFlow/ML Models', type: 'text', projects: [] },
      { id: 'claude', label: 'Claude API', type: 'text', projects: [] },
    ]
  },
  { 
    id: 'TOOLS', 
    label: 'TOOLS', 
    color: 'var(--color-sage)',
    skills: [
      { id: 'git', label: 'Git', type: 'icon', projects: [] },
      { id: 'python', label: 'Python', type: 'icon', projects: ['p1', 'p2', 'p3'] },
    ]
  }
];

const ALL_SKILLS = CATEGORIES.flatMap(c => c.skills.map(s => ({...s, catColor: c.color})));

const renderIcon = (id: string, color: string) => {
  const props = { size: 22, color: color, strokeWidth: 2.5 };
  switch(id) {
    case 'react': return <Atom {...props} />;
    case 'python': return <Terminal {...props} />;
    case 'ts': return <FileCode2 {...props} />;
    case 'js': return <Code2 {...props} />;
    case 'git': return <GitBranch {...props} />;
    case 'tailwind': return <Wind {...props} />;
    default: return <Code2 {...props} />;
  }
};

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

export default function TechStack() {
  const shouldReduceMotion = useReducedMotion();
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [positions, setPositions] = useState<Record<string, {x: number, y: number}>>({});
  
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const updatePositions = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newPos: Record<string, {x: number, y: number}> = {};
    for (const skill of ALL_SKILLS) {
      const el = nodeRefs.current[skill.id];
      if (el) {
        const rect = el.getBoundingClientRect();
        newPos[skill.id] = {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2
        };
      }
    }
    setPositions(prev => JSON.stringify(prev) === JSON.stringify(newPos) ? prev : newPos);
  };

  useEffect(() => {
    updatePositions();
    const ro = new ResizeObserver(updatePositions);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('scroll', updatePositions);
    return () => {
        ro.disconnect();
        window.removeEventListener('scroll', updatePositions);
    };
  }, []);

  const edges = useMemo(() => {
    const e = [];
    for (let i = 0; i < ALL_SKILLS.length; i++) {
      for (let j = i + 1; j < ALL_SKILLS.length; j++) {
        const s1 = ALL_SKILLS[i];
        const s2 = ALL_SKILLS[j];
        const sharedProjects = s1.projects.filter(p => s2.projects.includes(p));
        if (sharedProjects.length > 0) {
          e.push({
            id: `${s1.id}-${s2.id}`,
            source: s1.id,
            target: s2.id,
            projects: sharedProjects
          });
        }
      }
    }
    return e;
  }, []);

  const getLineState = (edge: any) => {
    if (!activeNode) return { opacity: 0.2, color: 'var(--color-line)', strokeWidth: 1.5 };
    if (edge.source === activeNode || edge.target === activeNode) {
      const projId = edge.projects[0];
      const color = PROJECTS.find(p => p.id === projId)?.color || 'var(--color-line)';
      return { opacity: 1, color, strokeWidth: 2.5 };
    }
    return { opacity: 0.05, color: 'var(--color-line)', strokeWidth: 1.5 };
  };

  const getNodeState = (skill: any) => {
    if (!activeNode) return { opacity: 1 };
    if (skill.id === activeNode) return { opacity: 1 };
    const isConnected = edges.some(e => 
      (e.source === activeNode && e.target === skill.id) || 
      (e.target === activeNode && e.source === skill.id)
    );
    if (isConnected) return { opacity: 1 };
    return { opacity: 0.3 };
  };

  const idleFloat = (id: string) => {
    const seed = id.charCodeAt(0) + id.length;
    return {
      y: [-(seed % 4) - 2, (seed % 3) + 2, -(seed % 4) - 2],
      x: [-(seed % 3) - 1, (seed % 4) + 1, -(seed % 3) - 1],
      transition: {
        duration: 4 + (seed % 3),
        repeat: Infinity,
        ease: "easeInOut",
        delay: (seed % 5) * 0.2
      }
    };
  };

  return (
    <section id="tech-stack" className="w-full flex flex-col bg-[var(--color-base)] pt-32 pb-32 overflow-hidden border-t-[3px] border-[var(--color-line)]">
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
            <AnimatedText text="Our Stack" />
          </h2>
        </motion.div>
      </div>

      <div ref={containerRef} className="relative w-full max-w-7xl mx-auto px-6 lg:px-8">
        {/* SVG Lines Overlay */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <motion.g initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
            {edges.map((edge) => {
              const pos1 = positions[edge.source];
              const pos2 = positions[edge.target];
              if (!pos1 || !pos2) return null;
              
              const state = getLineState(edge);
              return (
                <motion.line
                  key={edge.id}
                  x1={pos1.x} y1={pos1.y} x2={pos2.x} y2={pos2.y}
                  variants={shouldReduceMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : {
                    hidden: { pathLength: 0 },
                    visible: { pathLength: 1, transition: { duration: 1.5, delay: 0.8, ease: "easeInOut" } }
                  }}
                  style={{
                    strokeOpacity: state.opacity,
                    stroke: state.color,
                    strokeWidth: state.strokeWidth,
                    transition: 'stroke 0.3s, stroke-width 0.3s, stroke-opacity 0.3s'
                  }}
                />
              );
            })}
          </motion.g>
        </svg>

        {/* Sectored Zones Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
          {CATEGORIES.map((cat, catIndex) => (
            <div key={cat.id} className="border-[2px] border-[var(--color-line)] rounded-xl relative p-8 pt-16 bg-[var(--color-surface)] flex flex-wrap justify-center items-center gap-8 shadow-sm min-h-[300px]">
              <div className="absolute top-4 left-4 font-mono font-bold text-xs uppercase tracking-widest text-[var(--color-ink)] opacity-60">
                {cat.label}
              </div>
              
              {cat.skills.map((skill, index) => {
                const scaleFactor = 1 + (skill.projects.length * 0.1);
                const size = skill.type === 'icon' ? 48 * scaleFactor : 'auto';
                const padding = skill.type === 'icon' ? 'p-0' : 'px-4 py-2';
                
                return (
                  <div 
                    key={skill.id}
                    ref={el => { if(el) nodeRefs.current[skill.id] = el; }}
                    className="relative inline-flex flex-col items-center justify-center z-10"
                    style={{ zIndex: activeNode === skill.id ? 40 : 10 }}
                  >
                    <motion.div
                      initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ delay: (catIndex * 0.1) + (index * 0.05), type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <motion.div
                        animate={shouldReduceMotion ? {} : idleFloat(skill.id)}
                        style={{ 
                          opacity: getNodeState(skill).opacity,
                          transition: 'opacity 0.3s ease'
                        }}
                      >
                        <motion.div
                          whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex flex-col items-center gap-2 cursor-pointer outline-none"
                          onClick={() => setActiveNode(activeNode === skill.id ? null : skill.id)}
                          onMouseEnter={() => setActiveNode(skill.id)}
                          onMouseLeave={() => setActiveNode(null)}
                        >
                          <div 
                            className={`flex items-center justify-center bg-[var(--color-surface)] border-[2.5px] transition-shadow ${skill.type === 'icon' ? 'rounded-full' : 'rounded-lg'} ${padding}`}
                            style={{
                              width: size,
                              height: size,
                              borderColor: cat.color,
                              boxShadow: activeNode === skill.id ? `0 0 0 4px ${cat.color}40` : 'none'
                            }}
                          >
                            {skill.type === 'icon' ? renderIcon(skill.id, cat.color) : (
                              <span className="font-sans font-bold whitespace-nowrap text-[var(--color-ink)]" style={{ fontSize: `${Math.max(12, 14 * scaleFactor)}px` }}>
                                {skill.label}
                              </span>
                            )}
                          </div>
                          
                          {/* Label below icon nodes */}
                          {skill.type === 'icon' && (
                            <span className="font-sans text-[10px] sm:text-xs font-bold text-[var(--color-ink)] opacity-80 whitespace-nowrap">
                              {skill.label}
                            </span>
                          )}
                        </motion.div>
                        
                        {/* Tooltip */}
                        <AnimatePresence>
                          {activeNode === skill.id && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[220px] px-3 py-2 bg-[var(--color-surface)] border-[2px] border-[var(--color-line)] text-[var(--color-ink)] font-sans text-xs rounded-md z-50 pointer-events-none shadow-lg text-center"
                            >
                              <div className="mb-1.5 text-sm font-black tracking-tight">{skill.label}</div>
                              {skill.projects.length > 0 ? (
                                <div className="flex flex-col gap-1 text-left">
                                  <span className="font-mono text-[9px] font-bold opacity-70 tracking-widest uppercase">Used In:</span>
                                  {skill.projects.map(pid => (
                                    <span key={pid} className="font-bold whitespace-nowrap" style={{ color: PROJECTS.find(p=>p.id===pid)?.color }}>
                                      → {PROJECTS.find(p => p.id === pid)?.name}
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                <span className="font-mono text-[9px] font-bold opacity-70 tracking-widest uppercase">Foundational Tool</span>
                              )}
                              {/* Triangle pointer */}
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-[var(--color-line)]">
                                 <div className="absolute -top-[8px] -left-[4px] border-[4px] border-transparent border-t-[var(--color-surface)]" />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                      </motion.div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
