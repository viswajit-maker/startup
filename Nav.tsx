import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = ['Home', 'Services', 'Tech Stack', 'Wins', 'Projects', 'Team', 'Contact'];

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      // Show nav when scrolled past a certain point (e.g., 50vh)
      setIsScrolled(window.scrollY > window.innerHeight * 0.5);

      // Simple active section tracker
      const sections = NAV_ITEMS.map(item => ({
        name: item,
        id: item.toLowerCase().replace(' ', '-')
      }));

      let current = 'Home';
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && window.scrollY >= el.offsetTop - 300) {
          current = section.name;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (name: string) => {
    setActiveSection(name);
    setIsMobileMenuOpen(false);
    const id = name.toLowerCase().replace(' ', '-');
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 100, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }
  };

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } }
  };

  return (
    <AnimatePresence>
      {isScrolled && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : "hidden"}
          animate={shouldReduceMotion ? { opacity: 1 } : "visible"}
          exit={shouldReduceMotion ? { opacity: 0 } : "hidden"}
          variants={navVariants}
          className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
        >
          {/* Desktop Nav */}
          <div className="hidden sm:flex items-center bg-[var(--color-surface)] border-[2px] border-[var(--color-line)] rounded-full px-2 py-2 shadow-sm pointer-events-auto">
            <div className="px-4 font-mono font-black text-lg tracking-widest text-[var(--color-ink)] mr-2 select-none">
              FORGE
            </div>
            <div className="flex items-center space-x-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item;
                return (
                  <button
                    key={item}
                    onClick={() => handleNavClick(item)}
                    className={`relative px-4 py-2 rounded-full text-sm font-bold font-sans transition-colors z-10 cursor-pointer ${
                      isActive ? 'text-[#FFFFFF]' : 'text-[var(--color-ink)] hover:text-[var(--color-blue)] hover:bg-[var(--color-base)]'
                    }`}
                  >
                    {isActive && !shouldReduceMotion && (
                      <motion.div
                        layoutId="activeNavBackground"
                        className="absolute inset-0 bg-[var(--color-blue)] rounded-full -z-10"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    {isActive && shouldReduceMotion && (
                      <div className="absolute inset-0 bg-[var(--color-blue)] rounded-full -z-10" />
                    )}
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Nav */}
          <div className="sm:hidden flex flex-col items-center w-full max-w-[200px] ml-auto mr-0 pointer-events-auto">
            <div className="flex items-center justify-between w-full bg-[var(--color-surface)] border-[2px] border-[var(--color-line)] rounded-full px-4 py-2 shadow-sm">
              <div className="font-mono font-black text-lg tracking-widest text-[var(--color-ink)] select-none">
                FORGE
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-[var(--color-ink)] p-1 cursor-pointer"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
            
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="mt-2 w-full bg-[var(--color-surface)] border-[2px] border-[var(--color-line)] rounded-2xl p-2 flex flex-col gap-1 shadow-md"
                >
                  {NAV_ITEMS.map((item) => {
                    const isActive = activeSection === item;
                    return (
                      <button
                        key={item}
                        onClick={() => handleNavClick(item)}
                        className={`px-4 py-3 text-left rounded-xl text-sm font-bold font-sans transition-colors cursor-pointer ${
                          isActive 
                            ? 'bg-[var(--color-blue)] text-[#FFFFFF]' 
                            : 'text-[var(--color-ink)] hover:bg-[var(--color-base)]'
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
