import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabase';

const staticGalleryImages = [
  {
    id: 'static-1',
    src: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800',
    alt: 'Lounge Atmosphere',
  },
  {
    id: 'static-2',
    src: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=800',
    alt: 'Traditional Food',
  },
  {
    id: 'static-3',
    src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800',
    alt: 'Nightlife Vibes',
  },
  {
    id: 'static-4',
    src: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&q=80&w=800',
    alt: 'Interior Design',
  },
  {
    id: 'static-5',
    src: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800',
    alt: 'Cocktail Selection',
  },
  {
    id: 'static-6',
    src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
    alt: 'Signature Burger',
  },
];

interface GalleryImageData {
  id: string;
  src: string;
  alt: string;
}

export default function Gallery() {
  const [dbImages, setDbImages] = useState<GalleryImageData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      const { data } = await supabase
        .from('gallery')
        .select('*')
        .order('order', { ascending: true });
      
      if (data) {
        setDbImages(data);
      }
      setLoading(false);
    };

    fetchGallery();
  }, []);

  const galleryImages: GalleryImageData[] = dbImages.length > 0 
    ? dbImages 
    : staticGalleryImages.map(img => ({ id: img.id.toString(), src: img.src, alt: img.alt }));

  const [selectedImage, setSelectedImage] = useState<GalleryImageData | null>(null);

  return (
    <section id="gallery" className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-black tracking-[0.3em] uppercase text-xs mb-4 block">
            Visuals
          </span>
          <h2 className="text-5xl md:text-7xl font-heading font-black leading-tight tracking-tighter">
            THE <span className="text-primary font-serif italic font-normal">ATMOSPHERE.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedImage(image)}
              className="group relative aspect-square overflow-hidden rounded-[32px] bg-white/5 cursor-pointer"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-black uppercase tracking-widest text-xs">
                  View Detail
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={40} strokeWidth={1} />
            </button>
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto rounded-[32px] shadow-2xl border border-white/10"
                referrerPolicy="no-referrer"
              />
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-black uppercase tracking-widest text-white mb-2">
                  {selectedImage.alt}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
