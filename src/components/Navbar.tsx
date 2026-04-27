import { useState, useEffect } from 'react';
import { Menu, X, Phone, Instagram, Facebook, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Menu', href: '#menu' },
  { name: 'Live Sports', href: '#sports' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 w-[95%] max-w-7xl rounded-full',
        isScrolled 
          ? 'bg-black/80 backdrop-blur-3xl border border-white/10 py-3 shadow-2xl' 
          : 'bg-black/5 hover:bg-black/10 transition-colors py-6'
      )}
    >
      <div className="px-6 md:px-10 flex items-center gap-4">
        <motion.a 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          href="#home" 
          className="flex items-center gap-4 group shrink-0"
        >
          <div className={cn(
            "flex items-center justify-center p-1 transition-all duration-500",
            isScrolled ? "w-10 h-10" : "w-14 h-14"
          )}>
            <img 
              src="/ibexlogo.png" 
              alt="Ibex Lounge Logo" 
              className="w-full h-full object-contain filter drop-shadow-gold"
              referrerPolicy="no-referrer" 
            />
          </div>
          <span className={cn(
            "font-heading font-black tracking-tighter uppercase flex items-center gap-1 transition-all duration-500",
            isScrolled ? "text-xl" : "text-2xl"
          )}>
            <span className="text-gold-gradient drop-shadow-gold text-shadow-gold">IBEX</span> 
            <span className="text-zinc-500 font-serif lowercase italic font-normal tracking-normal text-3xl -ml-1 hidden sm:inline whitespace-nowrap">Lounge</span>
          </span>
        </motion.a>

        {/* Desktop Nav - Pushed to right */}
        <div className="hidden lg:flex flex-1 items-center justify-end gap-10 px-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="group text-[10px] font-black text-zinc-400 hover:text-white transition-all uppercase tracking-[0.4em] relative py-2"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-500 group-hover:w-full opacity-0 group-hover:opacity-100 shadow-[0_0_8px_var(--color-primary)]"></span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <Link 
            to="/admin" 
            className="text-zinc-400 hover:text-primary transition-all flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10"
            title="Admin Login"
          >
            <Lock size={18} />
          </Link>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-white w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

        {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-t border-white/5 lg:hidden overflow-hidden rounded-b-[2rem] mt-2 shadow-2xl"
          >
            <div className="flex flex-col p-10 gap-6 items-end text-right">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-2xl font-heading font-black hover:text-primary transition-colors tracking-tighter uppercase"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
                <div className="flex items-center gap-4 w-full justify-end border-t border-white/5 pt-8 mt-6">
                   <Link 
                    to="/admin" 
                    className="flex-grow text-sm font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-primary transition-colors flex items-center gap-3"
                    onClick={() => setIsOpen(false)}
                   >
                     <Lock size={16} /> Admin Access
                   </Link>
                </div>
                <div className="flex items-center gap-8 mt-4 justify-end w-full">
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-primary hover:bg-white/10 transition-all">
                    <Instagram size={20} />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-primary hover:bg-white/10 transition-all">
                    <Facebook size={20} />
                  </a>
                  <a href="tel:+4420" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-primary hover:bg-white/10 transition-all">
                    <Phone size={20} />
                  </a>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
