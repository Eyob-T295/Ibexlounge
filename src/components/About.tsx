import { motion } from 'motion/react';
import { Zap, Target, Globe, Music } from 'lucide-react';

const features = [
  {
    icon: <Target className="text-primary" />,
    title: 'Match Day Hub',
    description: 'The ultimate destination for fans near the stadium.',
  },
  {
    icon: <Globe className="text-secondary" />,
    title: 'Premium Flavors',
    description: 'A curated selection of international tastes and signatures.',
  },
  {
    icon: <Music className="text-accent" />,
    title: 'Electric Energy',
    description: 'Top-tier music and a vibrant social atmosphere.',
  },
  {
    icon: <Zap className="text-primary" />,
    title: 'Modern Class',
    description: 'Simple design and premium service crafted for excellence.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: Simple Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-[40px] overflow-hidden aspect-square shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&q=80&w=800"
                alt="Lounge Interior"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold-texture rounded-full flex items-center justify-center text-black font-black text-center leading-tight shadow-gold-metallic border-4 border-background">
              TOP <br /> RATED
            </div>
          </motion.div>

          {/* Right: Content */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-gold-gradient drop-shadow-gold font-serif italic text-lg mb-2 block tracking-tight">
                Our Story
              </span>
              <h2 className="text-5xl md:text-7xl font-heading font-black mb-8 leading-tight tracking-tighter">
                PURE <span className="text-gold-gradient drop-shadow-gold-lg text-shadow-gold">EXPERIENCE.</span>
              </h2>
              <p className="text-xl text-zinc-400 leading-relaxed font-medium">
                Ibex Lounge is where premium service meets vibrant energy. 
                We've created a unique destination that blends a refined atmosphere 
                with the exciting spirit of London nightlife.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="space-y-2 md:space-y-4"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center border border-white/5">
                    {feature.icon}
                  </div>
                  <h3 className="text-base md:text-lg font-black uppercase tracking-tight">{feature.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
