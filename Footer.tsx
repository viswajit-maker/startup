import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Linkedin, Github, Mail, ArrowRight, Phone, MessageCircle } from 'lucide-react';

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: false, email: false, message: false });

  // Sai: wire this form to a backend endpoint or a service like Formspree/EmailJS to actually receive submissions — currently UI only
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      name: formData.name.trim() === '',
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      message: formData.message.trim() === ''
    };
    setErrors(newErrors);
    
    if (!newErrors.name && !newErrors.email && !newErrors.message) {
      console.log('Form submitted:', formData);
      // Reset after mock submission
      setFormData({ name: '', email: '', message: '' });
      alert('Message sent! (Mock implementation)');
    }
  };

  const navLinks = ['Home', 'Services', 'Tech Stack', 'Wins', 'Projects', 'Team', 'Contact'];

  const itemVariants = shouldReduceMotion ? {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0 }
  } : {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 25 } }
  };

  return (
    <footer id="contact" className="w-full flex flex-col bg-[var(--color-base)] border-t-[3px] border-[var(--color-line)] relative overflow-hidden">
      
      {/* Contact Form Section */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
           {/* Contact Info Card */}
           <div className="w-full lg:w-1/3 flex flex-col">
              <motion.div 
                initial={shouldReduceMotion ? "visible" : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
                className="w-full bg-[var(--color-surface)] p-8 sm:p-12 rounded-2xl border-[2.5px] border-[var(--color-line)] shadow-sm h-full flex flex-col"
              >
                 <h3 className="font-sans font-black text-2xl text-[var(--color-ink)] mb-8">Contact Info</h3>
                 
                 <div className="flex flex-col gap-4 flex-1">
                    {/* Phone */}
                    <motion.a 
                       variants={itemVariants}
                       href="tel:+917358253068"
                       className="group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-[var(--color-base)] hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blue)]"
                       aria-label="Call +91 73582 53068"
                    >
                       <div className="w-12 h-12 rounded-full border-[2px] border-[var(--color-line)] bg-[var(--color-surface)] flex items-center justify-center shrink-0 border-[var(--color-blue)] text-[var(--color-blue)] transition-colors">
                          <Phone size={20} strokeWidth={2.5} />
                       </div>
                       <span className="font-sans font-bold text-base transition-colors group-hover:!text-[var(--color-blue)]" style={{ color: '#1C2321' }}>+91 73582 53068</span>
                    </motion.a>

                    {/* Email */}
                    <motion.a 
                       variants={itemVariants}
                       href="mailto:saiesswer33@gmail.com"
                       className="group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-[var(--color-base)] hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blue)]"
                       aria-label="Email saiesswer33@gmail.com"
                    >
                       <div className="w-12 h-12 rounded-full border-[2px] border-[var(--color-line)] bg-[var(--color-surface)] flex items-center justify-center shrink-0 border-[var(--color-blue)] text-[var(--color-blue)] transition-colors">
                          <Mail size={20} strokeWidth={2.5} />
                       </div>
                       <span className="font-sans font-bold text-base transition-colors group-hover:!text-[var(--color-blue)]" style={{ color: '#1C2321' }}>saiesswer33@gmail.com</span>
                    </motion.a>

                    {/* WhatsApp */}
                    <motion.a 
                       variants={itemVariants}
                       href="https://wa.me/917358253068"
                       target="_blank"
                       rel="noopener noreferrer"
                       className="group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-[var(--color-base)] hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-sage)]"
                       aria-label="Chat on WhatsApp"
                    >
                       <div className="w-12 h-12 rounded-full border-[2px] border-[var(--color-line)] bg-[var(--color-surface)] flex items-center justify-center shrink-0 border-[var(--color-sage)] text-[var(--color-sage)] transition-colors">
                          <MessageCircle size={20} strokeWidth={2.5} />
                       </div>
                       <span className="font-sans font-bold text-base transition-colors group-hover:!text-[var(--color-sage)]" style={{ color: '#1C2321' }}>Chat on WhatsApp</span>
                    </motion.a>
                 </div>

                 <motion.div variants={itemVariants} className="mt-8 pt-6 border-t-[1.5px] border-[var(--color-line)]">
                    <span className="font-sans text-sm font-medium" style={{ color: 'rgba(28, 35, 33, 0.8)' }}>We typically respond within 24 hours.</span>
                 </motion.div>
              </motion.div>
           </div>

           {/* Form Card */}
           <div className="w-full lg:w-2/3 bg-[var(--color-surface)] p-8 sm:p-12 rounded-2xl border-[2.5px] border-[var(--color-line)] shadow-sm">
              <h3 className="font-sans font-black text-3xl sm:text-4xl text-[var(--color-ink)] mb-2">Get in Touch</h3>
              <p className="font-sans text-base font-medium mb-8" style={{ color: 'rgba(28, 35, 33, 0.85)' }}>Have a question or want to discuss a project? Drop us a line.</p>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                 <label htmlFor="name" className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--color-ink)] opacity-70">Name</label>
                 <input 
                   id="name"
                   type="text" 
                   value={formData.name}
                   onChange={e => { setFormData({...formData, name: e.target.value}); setErrors({...errors, name: false}); }}
                   className={`w-full px-4 py-3 bg-[var(--color-base)] border-[2px] ${errors.name ? 'border-[var(--color-red)]' : 'border-[var(--color-line)] focus:border-[var(--color-blue)]'} rounded-lg outline-none font-sans text-sm text-[var(--color-ink)] transition-colors`}
                   placeholder="Your name"
                 />
                 {errors.name && <span className="font-sans text-xs font-bold text-[var(--color-red)]">Name is required</span>}
              </div>
              
              <div className="flex flex-col gap-1.5">
                 <label htmlFor="email" className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--color-ink)] opacity-70">Email</label>
                 <input 
                   id="email"
                   type="email" 
                   value={formData.email}
                   onChange={e => { setFormData({...formData, email: e.target.value}); setErrors({...errors, email: false}); }}
                   className={`w-full px-4 py-3 bg-[var(--color-base)] border-[2px] ${errors.email ? 'border-[var(--color-red)]' : 'border-[var(--color-line)] focus:border-[var(--color-blue)]'} rounded-lg outline-none font-sans text-sm text-[var(--color-ink)] transition-colors`}
                   placeholder="you@example.com"
                 />
                 {errors.email && <span className="font-sans text-xs font-bold text-[var(--color-red)]">Valid email is required</span>}
              </div>
              
              <div className="flex flex-col gap-1.5">
                 <label htmlFor="message" className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--color-ink)] opacity-70">Message</label>
                 <textarea 
                   id="message"
                   rows={4}
                   value={formData.message}
                   onChange={e => { setFormData({...formData, message: e.target.value}); setErrors({...errors, message: false}); }}
                   className={`w-full px-4 py-3 bg-[var(--color-base)] border-[2px] ${errors.message ? 'border-[var(--color-red)]' : 'border-[var(--color-line)] focus:border-[var(--color-blue)]'} rounded-lg outline-none font-sans text-sm text-[var(--color-ink)] transition-colors resize-y`}
                   placeholder="How can we help?"
                 />
                 {errors.message && <span className="font-sans text-xs font-bold text-[var(--color-red)]">Message is required</span>}
              </div>
              
              <button 
                type="submit" 
                className="mt-2 w-full py-4 bg-transparent border-[2.5px] border-[var(--color-ink)] rounded-lg font-sans font-black text-sm uppercase tracking-wider text-[var(--color-ink)] relative overflow-hidden group cursor-pointer"
              >
                 <span className="relative z-10 group-hover:text-[var(--color-surface)] transition-colors duration-300 flex items-center justify-center gap-2">
                    Send Message
                    <ArrowRight size={18} />
                 </span>
                 <div className="absolute inset-0 bg-[var(--color-ink)] translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 ease-out z-0" />
              </button>
           </form>
        </div>
        </div>
      </div>

      {/* Footer Links Area */}
      <div className="w-full border-t-[1.5px] border-[var(--color-line)]">
         <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-0 mb-16">
               
               {/* Wordmark & Signature Animation */}
               <div className="flex flex-col relative">
                  <span className="font-sans font-black text-5xl tracking-tighter text-[var(--color-ink)] uppercase">
                     FORGE
                  </span>
                  
                  {/* Signature Closing Moment (Underline & Tick) */}
                  <motion.div 
                     initial={shouldReduceMotion ? "visible" : "hidden"}
                     whileInView="visible"
                     viewport={{ once: true, amount: 0.8 }}
                     className="absolute -bottom-2 left-0 right-0 flex items-center"
                  >
                     <motion.div 
                        variants={shouldReduceMotion ? { hidden: { scaleX: 1 }, visible: { scaleX: 1 } } : {
                           hidden: { scaleX: 0 },
                           visible: { scaleX: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 } }
                        }}
                        className="h-[3px] bg-[var(--color-blue)] flex-1 origin-left"
                     />
                     <motion.div
                        variants={shouldReduceMotion ? { hidden: { opacity: 1 }, visible: { opacity: 1 } } : {
                           hidden: { opacity: 0, scale: 0.5 },
                           visible: { opacity: [0, 1, 1, 0], scale: 1, transition: { duration: 2, times: [0, 0.1, 0.8, 1], delay: 1.3 } }
                        }}
                        className="absolute right-[-10px] w-2 h-2 rounded-full border-[2px] border-[var(--color-blue)] bg-[var(--color-surface)]"
                     />
                     <motion.div
                        variants={shouldReduceMotion ? { hidden: { opacity: 0 }, visible: { opacity: 0 } } : {
                           hidden: { opacity: 0, y: -5 },
                           visible: { opacity: [0, 1, 1, 0], y: 0, transition: { duration: 2, times: [0, 0.1, 0.8, 1], delay: 1.3 } }
                        }}
                        className="absolute right-[-24px] font-mono text-[8px] font-bold text-[var(--color-blue)]"
                     >
                        END
                     </motion.div>
                  </motion.div>
               </div>

               {/* Nav Links */}
               <nav className="flex flex-wrap gap-x-8 gap-y-4 max-w-lg">
                  {navLinks.map((link) => (
                     <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} className="font-sans font-bold text-sm text-[var(--color-ink)] opacity-70 hover:opacity-100 transition-opacity">
                        {link}
                     </a>
                  ))}
               </nav>

            </div>

            <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-center gap-6 pt-8 border-t-[1.5px] border-[var(--color-line)]">
               <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--color-ink)] opacity-50">
                  © 2026 Forge Collective. All rights reserved.
               </span>

               <div className="flex items-center gap-4">
                  <a href="#" className="w-10 h-10 rounded-full border-[2px] border-[var(--color-line)] flex items-center justify-center text-[var(--color-ink)] hover:border-[var(--color-ink)] hover:bg-[var(--color-surface)] transition-colors">
                     <Linkedin size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full border-[2px] border-[var(--color-line)] flex items-center justify-center text-[var(--color-ink)] hover:border-[var(--color-ink)] hover:bg-[var(--color-surface)] transition-colors">
                     <Github size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full border-[2px] border-[var(--color-line)] flex items-center justify-center text-[var(--color-ink)] hover:border-[var(--color-ink)] hover:bg-[var(--color-surface)] transition-colors">
                     <Mail size={18} />
                  </a>
               </div>
            </div>
         </div>
      </div>
    </footer>
  );
}
