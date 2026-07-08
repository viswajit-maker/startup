import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion, useMotionValue, useTransform } from 'motion/react';
import { Linkedin, X } from 'lucide-react';

import member1Img from './member-1.jpg.png';
import member2Img from './member-2.jpg.jpeg';

const TEAM = [
  {
    id: 1,
    name: "Saiesswer S",
    role: "Frontend and ML",
    bio: "Crafts clean, responsive interfaces and brings designs to life with precise, performant React code.",
    skills: ["React", "TypeScript", "UI Design", "Python"],
    linkedin: "https://www.linkedin.com/in/sai-esswer-s-8b1260351",
    accentColor: "var(--color-blue)",
    initials: "SS",
    image: member1Img,
  },
  {
    id: 2,
    name: "Viswajit S",
    role: "Fullstack Developer",
    bio: "Builds robust, scalable backend systems and APIs that keep everything running fast and secure.",
    skills: ["Python", "FastAPI", "SQL"],
    linkedin: "https://www.linkedin.com/in/viswajit-s-04d12/",
    accentColor: "var(--color-sage)",
    initials: "VS",
    image: member2Img,
  },
  {
    id: 3,
    name: "Rithish R",
    role: "ML Engineer",
    bio: "Designs and trains machine learning models that turn raw data into real, working intelligence.",
    skills: ["Machine Learning", "Deep Learning"],
    linkedin: "https://www.linkedin.com/in/rithish-r-17b5b8379/",
    accentColor: "var(--color-orange)",
    initials: "RR",
    image: "/team/member-3.jpg",
  },
  {
    id: 4,
    name: "D Sudharshan",
    role: "System Architect",
    bio: "Shapes the visual identity and user experience, turning ideas into polished, intuitive designs.",
    skills: ["Figma", "Prototyping", "Design Systems"],
    linkedin: "https://www.linkedin.com/in/d-sudharshan-8506ab387/",
    accentColor: "var(--color-red)",
    initials: "DS",
    image: "/team/member-4.jpg",
  },
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

export default function Team() {
  const shouldReduceMotion = useReducedMotion();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);
  const [activeMember, setActiveMember] = useState<typeof TEAM[0] | null>(null);

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeMember) {
        setActiveMember(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeMember]);

  const progressWidth = useTransform(x, [0, -width > 0 ? -width : -1000], ["0%", "100%"]);

  return (
    <section id="team" className="w-full flex flex-col bg-[var(--color-base)] pt-32 pb-32 overflow-hidden border-t-[3px] border-[var(--color-line)] relative">
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
            <AnimatedText text="The Builders" />
          </h2>
        </motion.div>
      </div>

      <div ref={carouselRef} className="w-full overflow-hidden cursor-grab active:cursor-grabbing pb-8 select-none">
        <motion.div 
          drag={shouldReduceMotion ? false : "x"} 
          dragConstraints={{ right: 0, left: -width }} 
          style={{ x }}
          className="flex px-6 lg:px-8 min-w-max relative items-start gap-6 md:gap-10"
        >
          {TEAM.map((member, i) => (
             <TeamCard key={member.id} member={member} onClick={() => setActiveMember(member)} index={i} shouldReduceMotion={shouldReduceMotion} />
          ))}
        </motion.div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 mt-4">
        <div className="relative w-full h-[2.5px] bg-[var(--color-line)]">
           <motion.div className="absolute top-0 left-0 h-full bg-[var(--color-ink)] origin-left" style={{ width: progressWidth }} />
        </div>
      </div>

      <AnimatePresence>
         {activeMember && (
            <TeamModal member={activeMember} onClose={() => setActiveMember(null)} shouldReduceMotion={shouldReduceMotion} />
         )}
      </AnimatePresence>
    </section>
  );
}

const TeamCard = ({ member, onClick, index, shouldReduceMotion }: any) => {
   const [imgError, setImgError] = useState(false);
   
   return (
      <motion.div
         initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
         whileInView={{ opacity: 1, x: 0 }}
         viewport={{ once: true, amount: 0.1 }}
         transition={{ delay: index * 0.1, duration: 0.5 }}
         className="w-[280px] sm:w-[320px] shrink-0 flex flex-col"
      >
         <motion.button
            onClick={onClick}
            whileHover={shouldReduceMotion ? {} : { y: -8 }}
            className="w-full bg-[var(--color-surface)] border-[2.5px] border-[var(--color-line)] rounded-xl overflow-hidden flex flex-col cursor-pointer outline-none relative group transition-colors hover:border-[var(--color-ink)] text-left"
            style={{ borderBottom: `6px solid ${member.accentColor}` }}
         >
            <div className="w-full aspect-square relative bg-[var(--color-base)] overflow-hidden">
               {!imgError ? (
                  <img src={member.image} alt={member.name} onError={() => setImgError(true)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
               ) : (
                  <div className="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundColor: member.accentColor }}>
                     <span className="font-sans font-black text-6xl text-[#FFFFFF] opacity-90">{member.initials}</span>
                  </div>
               )}
               <div className="absolute inset-0 bg-[var(--color-ink)] opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-sans font-bold text-sm bg-[var(--color-surface)] text-[var(--color-ink)] px-4 py-2 rounded-full shadow-lg">View Profile</span>
               </div>
            </div>
            <div className="p-5 flex flex-col gap-1">
               <span className="font-sans font-black text-xl text-[var(--color-ink)]">{member.name}</span>
               <span className="font-mono text-[10px] sm:text-xs font-bold tracking-widest opacity-70 text-[var(--color-ink)] uppercase">{member.role}</span>
               <p className="font-sans text-sm text-[var(--color-ink)] opacity-90 mt-2 line-clamp-3 leading-relaxed font-medium">
                  {member.bio}
               </p>
            </div>
         </motion.button>
      </motion.div>
   );
};

const TeamModal = ({ member, onClose, shouldReduceMotion }: any) => {
   const [imgError, setImgError] = useState(false);

   const containerVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
   };

   const modalVariants = {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { 
         opacity: 1, 
         scale: 1, 
         transition: { type: 'spring', stiffness: 300, damping: 25, staggerChildren: 0.08, delayChildren: 0.1 } 
      }
   };

   const itemVariants = {
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0 }
   };

   return (
      <motion.div
         initial="hidden"
         animate="visible"
         exit="hidden"
         variants={containerVariants}
         className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      >
         <div className="absolute inset-0 bg-[var(--color-ink)] opacity-40 backdrop-blur-sm" onClick={onClose} />
         
         <motion.div
            variants={shouldReduceMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : modalVariants}
            className="relative w-full max-w-2xl bg-[var(--color-surface)] border-[3px] border-[var(--color-ink)] rounded-xl overflow-hidden shadow-[12px_12px_0px_0px_rgba(28,35,33,0.1)] flex flex-col sm:flex-row max-h-[90vh] overflow-y-auto"
            style={{ borderTop: `8px solid ${member.accentColor}` }}
            role="dialog"
            aria-modal="true"
         >
            <button 
               onClick={onClose}
               className="absolute top-4 right-4 z-10 p-2 bg-[var(--color-surface)] border-[2px] border-[var(--color-ink)] rounded-full hover:bg-[var(--color-base)] transition-colors cursor-pointer"
               aria-label="Close modal"
            >
               <X size={20} color="var(--color-ink)" strokeWidth={3} />
            </button>

            <motion.div variants={shouldReduceMotion ? {} : itemVariants} className="w-full sm:w-2/5 aspect-square sm:aspect-auto sm:h-auto shrink-0 relative bg-[var(--color-base)] border-b-[3px] sm:border-b-0 sm:border-r-[3px] border-[var(--color-line)]">
               {!imgError ? (
                  <img src={member.image} alt={member.name} onError={() => setImgError(true)} className="w-full h-full object-cover" />
               ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: member.accentColor }}>
                     <span className="font-sans font-black text-7xl text-[#FFFFFF] opacity-90">{member.initials}</span>
                  </div>
               )}
            </motion.div>
            
            <div className="w-full sm:w-3/5 p-6 sm:p-8 flex flex-col">
               <motion.div variants={shouldReduceMotion ? {} : itemVariants} className="flex flex-col gap-1 mb-6">
                  <h3 className="font-sans font-black text-3xl sm:text-4xl text-[var(--color-ink)] leading-none">{member.name}</h3>
                  <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[var(--color-ink)] opacity-70 uppercase">{member.role}</span>
               </motion.div>

               <motion.div variants={shouldReduceMotion ? {} : itemVariants} className="mb-6">
                  <p className="font-sans text-base leading-relaxed font-medium" style={{ color: '#1C2321' }}>
                     {member.bio}
                  </p>
               </motion.div>

               <motion.div variants={shouldReduceMotion ? {} : itemVariants} className="flex flex-wrap gap-2 mb-8">
                  {member.skills.map((skill: string) => (
                     <span key={skill} className="px-3 py-1 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest border-[2px] border-[var(--color-line)] rounded-md text-[var(--color-ink)]">
                        {skill}
                     </span>
                  ))}
               </motion.div>

               <motion.div variants={shouldReduceMotion ? {} : itemVariants} className="mt-auto">
                  <a 
                     href={member.linkedin}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="inline-flex items-center gap-2 bg-[var(--color-blue)] text-[#FFFFFF] px-5 py-2.5 rounded-full font-sans font-bold text-sm hover:bg-opacity-90 transition-opacity w-fit"
                  >
                     <Linkedin size={18} fill="#FFFFFF" color="var(--color-blue)" />
                     <span>Connect on LinkedIn</span>
                  </a>
               </motion.div>
            </div>
         </motion.div>
      </motion.div>
   );
};
