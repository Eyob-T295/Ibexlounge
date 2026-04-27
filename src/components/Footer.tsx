import { Instagram, Facebook, Twitter, MapPin, Phone, Mail, ArrowUp } from 'lucide-react';
import { motion } from 'motion/react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-black pt-24 pb-12">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="space-y-8">
            <h3 className="text-2xl font-heading font-black tracking-tighter">IBEX LOUNGE</h3>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              Elevating London's nightlife and sports culture through premium 
              flavors and unrivaled energy.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center border border-white/5 hover:bg-primary hover:text-white transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-8">Explore</h4>
            <ul className="space-y-4">
              {['About', 'Menu', 'Live Sports', 'Gallery'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '')}`} className="text-zinc-400 hover:text-white text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-8">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-zinc-400 text-sm">
                <MapPin className="text-primary shrink-0" size={18} />
                <span>3347 Holloway Road, London</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-400 text-sm">
                <Phone className="text-primary shrink-0" size={18} />
                <span>+44 20 7123 4567</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-400 text-sm">
                <Mail className="text-primary shrink-0" size={18} />
                <span>hello@ibexlounge.com</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-8">Hours</h4>
            <ul className="space-y-4 text-zinc-400 text-sm">
              <li className="flex justify-between">
                <span>Mon - Thu</span>
                <span>12:00 - 00:00</span>
              </li>
              <li className="flex justify-between">
                <span>Fri - Sat</span>
                <span>12:00 - 04:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>12:00 - 00:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest">
              © 2026 IBEX LOUNGE. ALL RIGHTS RESERVED.
            </p>
            <a 
              href="/admin" 
              className="text-white/5 hover:text-primary/20 transition-colors text-[8px] font-black tracking-[0.4em] uppercase"
            >
              System Access
            </a>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex gap-6 text-zinc-600 text-xs font-bold tracking-widest">
              <a href="#" className="hover:text-white transition-colors">PRIVACY</a>
              <a href="#" className="hover:text-white transition-colors">TERMS</a>
            </div>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10 hover:bg-primary hover:text-white transition-all"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
