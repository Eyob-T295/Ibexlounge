import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown, MapPin, Clock } from 'lucide-react';
import { useRef } from 'react';

const GoldParticles = () => {
  return (
    <div className="absolute inset-0 z-1 overflow-hidden pointer-events-none">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0,
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            opacity: [0, 0.4, 0],
            y: ["0%", "-=20%"],
            x: ["0%", i % 2 === 0 ? "+=5%" : "-=5%"],
          }}
          transition={{ 
            duration: Math.random() * 5 + 10,
            repeat: i % 2 === 0 ? Infinity : 5, // Just to vary
            delay: Math.random() * 5,
            ease: "linear"
          }}
          className="absolute w-1 h-1 bg-primary/40 rounded-full blur-[1px]"
        />
      ))}
    </div>
  );
};

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative h-screen min-h-[700px] flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
    >
      <GoldParticles />

      {/* Cinematic Background */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(181,148,16,0.1)_0%,transparent_70%)] z-10"></div>
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&q=80&w=1920"
          alt="Ibex Lounge Ambience"
          className="w-full h-full object-cover scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-20"></div>
      </motion.div>

      {/* Main content with Parallax - Shifted Down */}
      <motion.div 
        style={{ y: contentY, opacity }}
        className="relative z-30 max-w-6xl mx-auto px-6 text-center pt-24 md:pt-32"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.22, 1, 0.36, 1] 
          }}
          className="mb-12 flex justify-center relative"
        >
          {/* Logo Glow Ring */}
          <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full" />
          
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gold-texture p-[3px] shadow-gold-glow relative group cursor-pointer">
            <div className="w-full h-full bg-black rounded-full flex items-center justify-center p-3 md:p-4 border border-white/10 overflow-hidden">
               <motion.img 
                whileHover={{ scale: 1.1, rotate: 5 }}
                src="/ibexlogo.png" 
                alt="Ibex Logo" 
                className="w-full h-full object-contain filter drop-shadow-gold"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, letterSpacing: "1em" }}
          animate={{ opacity: 1, letterSpacing: "0.5em" }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="mb-6"
        >
          <span className="text-primary font-bold tracking-[0.5em] uppercase text-xs md:text-sm">
            THE APEX OF LONDON NIGHTLIFE
          </span>
        </motion.div>

        <div className="relative mb-6 md:mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-6xl sm:text-7xl md:text-[10rem] lg:text-[12rem] font-heading font-black leading-none tracking-tighter"
          >
            <span className="text-gold-gradient drop-shadow-gold-lg text-shadow-gold italic font-serif inline-block -mr-2 sm:-mr-4 md:-mr-8">Ibex</span>
            <span className="text-white">LOUNGE.</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-base sm:text-lg md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-8 md:mb-14 font-medium leading-relaxed"
        >
          Experience a sophisticated masterpiece where timeless elegance 
          meets the pulse of London's luxury hospitality.
        </motion.p>
      </motion.div>

      {/* Decorative Side Text */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 vertical-text hidden lg:block select-none pointer-events-none">
        <span className="text-[10px] uppercase tracking-[1em] text-white/20 font-bold">ESTD. 2024 LONDON HOLLOWAY</span>
      </div>

      {/* Bottom Interface */}
      <div className="absolute bottom-12 left-0 right-0 z-40">
        <div className="max-w-[1400px] mx-auto px-10 flex justify-between items-center text-zinc-500">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            className="hidden md:flex flex-col gap-1 items-start"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Location</span>
            <span className="text-xs font-bold text-zinc-400">HOLLOWAY ROAD, N7 8HB</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="flex flex-col items-center gap-4 text-white/40"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-4"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.5em]">Discover</span>
              <ChevronDown size={20} className="text-primary" />
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6 }}
            className="hidden md:flex flex-col gap-1 items-end"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Hours</span>
            <span className="text-xs font-bold text-zinc-400">LATE NIGHT CELEBRATIONS</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
