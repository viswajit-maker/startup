import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion, useMotionValue, useTransform } from 'motion/react';
import { Play, Award, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

// Sai: update these import paths to match wherever you place each video file inside your src folder
import medvaultVideo from './medvault-demo.mp4';
import phishshieldVideo from './phishshield-demo.mp4';
import meditriageVideo from './meditriage-demo.mp4';

import photo1 from './photo-1.jpg';
import photo2 from './photo-2.jpg';
import photo3 from './photo-3.jpg';
import photo4 from './photo-4.jpg';
import photo5 from './photo-5.jpg';
import photo6 from './photo-6.jpg';
import photo7 from './photo-7.jpg';
import photo8 from './photo-8.jpg';
import photo9 from './photo-9.jpg';

const PROJECTS = [
  { 
    id: 'p1', 
    name: 'MedVault AI', 
    desc: 'Patient-sovereign healthcare platform with AES-256 encrypted health vault, JWT auth, and AI-powered drug interaction checks.', 
    tags: ['React', 'Tailwind', 'Python', 'JWT Auth'], 
    status: 'LIVE', 
    color: 'var(--color-blue)',
    videoSrc: medvaultVideo
  },
  { 
    id: 'p2', 
    name: 'PhishShield AI', 
    desc: 'Full-stack phishing detection combining TF-IDF + Logistic Regression ML with real-time VirusTotal URL scanning.', 
    tags: ['Python', 'React', 'FastAPI', 'Machine Learning'], 
    status: 'LIVE', 
    color: 'var(--color-sage)',
    videoSrc: phishshieldVideo
  },
  { 
    id: 'p3', 
    name: 'MediTriage AI', 
    desc: 'React PWA with a Random Forest-trained triage assistant and automated patient communication via email.', 
    tags: ['React', 'Flask', 'Machine Learning'], 
    status: 'LIVE', 
    color: 'var(--color-orange)',
    videoSrc: meditriageVideo
  }
];

// Real Hackathon Wins
const HACKATHON_WINS = [
  { id: 'h1', name: 'Ideathon 4.0', placement: 'Finalist', org: 'Panimalar Engineering College', built: '', color: 'var(--color-blue)' },
  { id: 'h2', name: 'Titanium 2026', placement: 'Shortlisted', org: 'Rajalakshmi Engineering College', built: '', color: 'var(--color-sage)' },
  { id: 'h3', name: 'CodeWave 26', placement: '2nd Place', org: 'SRM IST', built: '', color: 'var(--color-orange)' },
  { id: 'h4', name: 'Vortexa', placement: 'Finalist', org: 'HackHer Community', built: '', color: 'var(--color-red)' },
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

const Wins = () => {
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

  return (
    <div id="wins" className="w-full mt-32 flex flex-col pt-16">
       <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 mb-8">
          <motion.div
            initial={shouldReduceMotion ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            <h3 className="font-sans font-black text-4xl sm:text-5xl text-[var(--color-ink)] uppercase">
              <AnimatedText text="Hackathon Wins" />
            </h3>
          </motion.div>
       </div>
       <div ref={carouselRef} className="w-full overflow-hidden cursor-grab active:cursor-grabbing pb-12 select-none">
          <motion.div 
            drag={shouldReduceMotion ? false : "x"} 
            dragConstraints={{ right: 0, left: -width }} 
            style={{ x }}
            className="flex px-6 lg:px-8 min-w-max relative items-start gap-6 pt-2"
          >
            {HACKATHON_WINS.map((win, i) => (
              <motion.div
                key={win.id}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="w-[260px] sm:w-[300px] shrink-0 bg-[var(--color-surface)] border-[2.5px] border-[var(--color-line)] p-6 rounded-xl flex flex-col gap-4 relative overflow-hidden transition-colors"
                whileHover={shouldReduceMotion ? {} : { borderColor: win.color }}
              >
                <div className="absolute top-0 right-0 w-16 h-16 opacity-10 pointer-events-none transform translate-x-4 -translate-y-4">
                  <Award size={80} color={win.color} />
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full border-[2px] border-[var(--color-ink)] flex items-center justify-center bg-[var(--color-surface)]" style={{ backgroundColor: `${win.color}20` }}>
                     <Award size={20} color={win.color} strokeWidth={2.5} />
                   </div>
                   <div className="flex flex-col">
                     <span className="font-mono text-[10px] font-bold uppercase tracking-widest opacity-60 text-[var(--color-ink)]">Placement</span>
                     <motion.span 
                       initial={shouldReduceMotion ? { scale: 1 } : { scale: 0 }}
                       whileInView={{ scale: 1 }}
                       viewport={{ once: true }}
                       transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 12, delay: i * 0.1 + 0.15 }}
                       className="font-sans font-black text-lg text-[var(--color-ink)] origin-left block" 
                       style={{ color: win.color }}
                     >
                       {win.placement}
                     </motion.span>
                   </div>
                </div>
                <div className="flex flex-col gap-1 z-10 relative mt-2">
                  <h4 className="font-sans text-xl font-bold text-[var(--color-ink)]">{win.name}</h4>
                  <span className="font-sans text-sm font-medium text-[var(--color-ink)] opacity-80">Organized by: {win.org}</span>
                  {win.built && <span className="font-sans text-sm font-medium text-[var(--color-ink)] opacity-60">Built: {win.built}</span>}
                </div>
              </motion.div>
            ))}
          </motion.div>
       </div>
    </div>
  );
};

const ProjectStage = ({ activeIdx, flashKey }: { activeIdx: number, flashKey: number }) => {
  const shouldReduceMotion = useReducedMotion();
  const project = PROJECTS[activeIdx];
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 375;
  const rotateAngle = isMobile ? 5 : 8;
  const isVertical = activeIdx % 2 !== 0;

  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reset state when project changes
  useEffect(() => {
    setIsPlaying(false);
    setVideoError(false);
  }, [activeIdx]);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

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
    <div className="relative w-full h-full flex-1 bg-[var(--color-surface)] border-[2.5px] border-[var(--color-line)] rounded-xl overflow-hidden shadow-sm flex flex-col" style={{ perspective: '1000px' }}>
       
       <div className="relative flex-1 p-6 sm:p-10 flex flex-col justify-center overflow-hidden">
          <AnimatePresence mode="wait">
             <motion.div
                key={activeIdx}
                variants={variants}
                initial={shouldReduceMotion ? "animate" : "initial"}
                animate="animate"
                exit={shouldReduceMotion ? "animate" : "exit"}
                className="w-full h-full flex flex-col gap-6"
                style={{ willChange: 'transform' }}
             >
                {/* Stage Content */}
                <div className="flex flex-col gap-4 max-w-2xl">
                   <h3 className="font-sans text-4xl sm:text-5xl font-black text-[var(--color-ink)] leading-none">{project.name}</h3>
                   <p className="font-sans text-lg sm:text-xl font-medium text-[var(--color-ink)] opacity-80 leading-relaxed">{project.desc}</p>
                   
                   <div className="flex flex-wrap gap-2 mt-2">
                     {project.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest font-mono border-[2px] rounded-md" style={{ borderColor: project.color, color: project.color, backgroundColor: `${project.color}15` }}>
                           {tag}
                        </span>
                     ))}
                   </div>
                </div>

                {/* Demo Frame */}
                <div className="w-full mt-6 rounded-lg overflow-hidden border-[3px] border-[var(--color-ink)] shadow-[8px_8px_0px_0px_rgba(28,35,33,0.1)] flex flex-col bg-[var(--color-surface)] relative max-w-4xl">
                   
                   {/* Browser Title Bar */}
                   <div className="flex items-center justify-between px-4 py-3 border-b-[3px] border-[var(--color-ink)] bg-[var(--color-base)] relative z-20">
                     <div className="flex space-x-2">
                       <div className="w-3 h-3 rounded-full bg-[var(--color-red)] border-[1.5px] border-[var(--color-ink)]" />
                       <div className="w-3 h-3 rounded-full bg-[var(--color-orange)] border-[1.5px] border-[var(--color-ink)]" />
                       <div className="w-3 h-3 rounded-full bg-[var(--color-sage)] border-[1.5px] border-[var(--color-ink)]" />
                     </div>
                     <div className="font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase text-[var(--color-ink)] opacity-70">
                       {project.name.replace(/\s+/g, '-').toLowerCase()}.app
                     </div>
                   </div>

                   {/* Demo Area */}
                   <div className="w-full aspect-video bg-[var(--color-ink)] relative flex items-center justify-center overflow-hidden group">
                     {!videoError ? (
                       <>
                         <video 
                           ref={videoRef}
                           src={project.videoSrc} 
                           controls={true}
                           autoPlay={false}
                           playsInline
                           className="w-full h-full object-cover"
                           onError={() => setVideoError(true)}
                           onPlay={() => setIsPlaying(true)}
                           onPause={() => setIsPlaying(false)}
                         />
                         
                         {!isPlaying && (
                           <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 pointer-events-none transition-opacity duration-300">
                             {!shouldReduceMotion ? (
                                <motion.button 
                                   onClick={handlePlayClick}
                                   animate={{ scale: [1, 1.05, 1] }}
                                   transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                   className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer border-[2px] border-[#FFFFFF] shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-transform hover:scale-110 pointer-events-auto"
                                   style={{ backgroundColor: project.color }}
                                >
                                   <Play size={24} color="#FFFFFF" fill="#FFFFFF" className="ml-1" />
                                </motion.button>
                             ) : (
                                <button 
                                   onClick={handlePlayClick}
                                   className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer border-[2px] border-[#FFFFFF] shadow-[0_0_15px_rgba(255,255,255,0.3)] pointer-events-auto"
                                   style={{ backgroundColor: project.color }}
                                >
                                   <Play size={24} color="#FFFFFF" fill="#FFFFFF" className="ml-1" />
                                </button>
                             )}
                           </div>
                         )}
                       </>
                     ) : (
                       <>
                         <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-ink)] pointer-events-none" />
                         
                         <div className="relative z-10 flex flex-col items-center gap-4 text-center px-6">
                            {!shouldReduceMotion ? (
                               <motion.button 
                                  animate={{ scale: [1, 1.05, 1] }}
                                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                  className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer border-[2px] border-[#FFFFFF] shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-transform hover:scale-110"
                                  style={{ backgroundColor: project.color }}
                               >
                                  <Play size={24} color="#FFFFFF" fill="#FFFFFF" className="ml-1" />
                               </motion.button>
                            ) : (
                               <button 
                                  className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer border-[2px] border-[#FFFFFF] shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                  style={{ backgroundColor: project.color }}
                               >
                                  <Play size={24} color="#FFFFFF" fill="#FFFFFF" className="ml-1" />
                               </button>
                            )}
                            <span className="font-sans font-bold text-sm text-[#FFFFFF] opacity-80 max-w-[200px] leading-tight">PLACEHOLDER: add project screenshot or short screen-recording here</span>
                         </div>
                       </>
                     )}
                   </div>
                </div>

                {/* Status Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-4">
                  {project.status === 'LIVE' ? (
                     <>
                        <span className="font-mono text-[10px] font-bold tracking-widest text-[var(--color-ink)] opacity-70">STATUS:</span>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--color-surface)] border-[2px] border-[var(--color-line)] rounded-md shadow-sm w-fit">
                           {!shouldReduceMotion ? (
                              <motion.div animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: project.color, boxShadow: `0 0 6px ${project.color}` }} />
                           ) : (
                              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: project.color }} />
                           )}
                           <span className="font-sans text-[10px] font-black uppercase tracking-wider text-[var(--color-ink)]">{project.status}</span>
                        </div>
                     </>
                  ) : (
                     <>
                        <span className="font-mono text-[10px] font-bold tracking-widest text-[var(--color-ink)] opacity-70">STATUS:</span>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--color-surface)] border-[2px] border-[var(--color-line)] rounded-md shadow-sm w-fit">
                           <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-ink)] opacity-50" />
                           <span className="font-sans text-[10px] font-black uppercase tracking-wider text-[var(--color-ink)]">LOCAL DEMO</span>
                        </div>
                        <span className="font-sans text-xs font-medium text-[var(--color-ink)] opacity-60 sm:ml-2">Full walkthrough video above</span>
                     </>
                  )}
                </div>

             </motion.div>
          </AnimatePresence>
       </div>

       {/* Color-Flash Accent */}
       {!shouldReduceMotion && (
         <AnimatePresence mode="wait">
           <motion.div
             key={flashKey}
             initial={{ x: '-100%', opacity: 0.8 }}
             animate={{ x: '100%', opacity: 0 }}
             transition={{ duration: 0.3, ease: 'linear', delay: 0.2 }}
             className="absolute top-1/2 left-0 w-full h-[4px] -mt-[2px] z-50 pointer-events-none"
             style={{ 
               backgroundColor: project.color.replace('var(', '').replace(')', ''),
               boxShadow: `0 0 16px 4px var(${project.color.replace('var(', '').replace(')', '')})`
             }}
           />
         </AnimatePresence>
       )}
    </div>
  );
};

const TeamGallery = () => {
  const shouldReduceMotion = useReducedMotion();
  
  // Sai: add your 9 real team/event photos to /public/gallery/ named photo-1.jpg through photo-9.jpg
  const photos = [
    { id: 1, src: photo1, color: 'var(--color-blue)' },
    { id: 2, src: photo2, color: 'var(--color-sage)' },
    { id: 3, src: photo3, color: 'var(--color-orange)' },
    { id: 4, src: photo4, color: 'var(--color-red)' },
    { id: 5, src: photo5, color: 'var(--color-blue)' },
    { id: 6, src: photo6, color: 'var(--color-sage)' },
    { id: 7, src: photo7, color: 'var(--color-orange)' },
    { id: 8, src: photo8, color: 'var(--color-red)' },
    { id: 9, src: photo9, color: 'var(--color-blue)' },
  ];

  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  const handleImgError = (id: number) => {
    setImgErrors(prev => ({ ...prev, [id]: true }));
  };

  const PhotoCard: React.FC<{ photo: any }> = ({ photo }) => (
    <div className="w-[140px] sm:w-[160px] h-[100px] sm:h-[120px] shrink-0 relative bg-[var(--color-surface)] flex items-center justify-center p-1 rounded-xl border-[2.5px] border-[var(--color-line)] shadow-sm overflow-hidden">
      {!imgErrors[photo.id] ? (
        <img 
          src={photo.src} 
          alt={`Team moment ${photo.id}`} 
          onError={() => handleImgError(photo.id)}
          className="w-full h-full object-cover rounded-lg"
          draggable={false}
        />
      ) : (
        <div className="w-full h-full rounded-lg flex items-center justify-center border-[2px] border-[var(--color-line)]" style={{ backgroundColor: `${photo.color}15` }}>
           <Camera size={28} color={photo.color} opacity={0.5} strokeWidth={2} />
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full mt-24 flex flex-col pt-8 pb-16 overflow-hidden">
       <style>
         {`
           @keyframes marquee {
             0% { transform: translateX(0%); }
             100% { transform: translateX(-50%); }
           }
           .marquee-scroll {
             animation: marquee 35s linear infinite;
           }
           .marquee-container:hover .marquee-scroll {
             animation-play-state: paused;
           }
         `}
       </style>
       <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 mb-8">
          <motion.div
            initial={shouldReduceMotion ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            <h3 className="font-sans font-black text-3xl sm:text-4xl text-[var(--color-ink)] uppercase">
              <AnimatedText text="Moments From the Journey" />
            </h3>
          </motion.div>
       </div>

       {shouldReduceMotion ? (
         <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
           <div className="flex flex-wrap gap-4 sm:gap-6 justify-center">
             {photos.map(photo => <PhotoCard key={photo.id} photo={photo} />)}
           </div>
         </div>
       ) : (
         <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, amount: 0.2 }}
           transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
           className="w-full relative py-4 marquee-container"
         >
           {/* Fade edges */}
           <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-24 bg-gradient-to-r from-[var(--color-base)] to-transparent z-10 pointer-events-none" />
           <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-24 bg-gradient-to-l from-[var(--color-base)] to-transparent z-10 pointer-events-none" />
           
           <div className="marquee-scroll flex gap-4 sm:gap-6 w-max">
             <div className="flex gap-4 sm:gap-6 px-2 sm:px-3">
               {photos.map((photo) => (
                 <PhotoCard key={`set1-${photo.id}`} photo={photo} />
               ))}
             </div>
             <div className="flex gap-4 sm:gap-6 px-2 sm:px-3">
               {photos.map((photo) => (
                 <PhotoCard key={`set2-${photo.id}`} photo={photo} />
               ))}
             </div>
           </div>
         </motion.div>
       )}
    </div>
  );
};

export default function Projects() {
  const shouldReduceMotion = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);
  const [flashKey, setFlashKey] = useState(0);

  const handleSelect = (idx: number) => {
    if (idx === activeIdx) return;
    setActiveIdx(idx);
    setFlashKey(prev => prev + 1);
  };

  return (
    <section id="projects" className="w-full flex flex-col bg-[var(--color-base)] pt-32 pb-16 overflow-hidden border-t-[3px] border-[var(--color-line)]">
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
            <AnimatedText text="Selected Work" />
          </h2>
        </motion.div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
         <div className="flex flex-col md:flex-row gap-8 lg:gap-12 min-h-[600px]">
            
            {/* Left list */}
            <div className="w-full md:w-64 lg:w-80 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 shrink-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
               {PROJECTS.map((project, idx) => {
                  const isActive = idx === activeIdx;
                  return (
                     <button
                        key={project.id}
                        onClick={() => handleSelect(idx)}
                        className={`flex flex-col items-start text-left px-4 py-4 rounded-lg cursor-pointer transition-all shrink-0 min-w-[200px] md:min-w-0 ${isActive ? 'bg-[var(--color-surface)] shadow-sm' : 'hover:bg-[var(--color-surface)] opacity-70 hover:opacity-100'}`}
                        style={{ borderLeft: isActive ? `4px solid ${project.color}` : `4px solid transparent` }}
                     >
                        <span className={`font-sans text-xl sm:text-2xl font-black ${isActive ? 'text-[var(--color-ink)]' : 'text-[var(--color-ink)]'}`}>
                           {project.name}
                        </span>
                        <span className="font-mono text-[10px] font-bold uppercase tracking-widest mt-1 opacity-60">
                           {project.tags[0]} / {project.status}
                        </span>
                     </button>
                  )
               })}
            </div>

            {/* Right Stage */}
            <div className="flex-1 flex flex-col w-full min-w-0">
               <ProjectStage activeIdx={activeIdx} flashKey={flashKey} />
            </div>

         </div>
      </div>

      <Wins />
      <TeamGallery />
    </section>
  );
}
