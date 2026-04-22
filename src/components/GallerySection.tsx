import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface GalleryItem {
  image: string | undefined;
  emoji: string;
  label: string;
  description: string;
  gradient: string;
}

interface GallerySectionProps {
  items: GalleryItem[];
}

export default function GallerySection({ items }: GallerySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="relative py-24 md:py-40 px-6 md:px-8 overflow-hidden">
      {/* Section header */}
      <div className="text-center mb-20 md:mb-28">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-xs tracking-[0.4em] uppercase text-orange-400/40 mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          ✦ Galerie de moments
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-3xl md:text-5xl font-bold text-gradient"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Nos souvenirs en couleurs
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="orange-line w-24 mx-auto mt-6"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-4 text-sm text-orange-100/30 font-light max-w-md mx-auto"
        >
          Chaque moment partagé est une photo que je garde dans mon cœur 📸
        </motion.p>
      </div>

      {/* Masonry-like layout */}
      <div className="max-w-5xl mx-auto">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.1 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="break-inside-avoid group relative rounded-2xl overflow-hidden"
            >
              {/* Image placeholder */}
              <div
                 className="relative aspect-[4/3] md:aspect-[3/4] overflow-hidden"
                 style={{
                   background: item.gradient,
                 }}
                >
                 {/* TA PHOTO */}
                 <img
                     src={item.image}
                     alt={item.label}
                     className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                  />

                 {/* Label en overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-end p-4 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                    <span
                        className="text-xs tracking-[0.2em] uppercase text-white/80 font-light"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                          {item.label}
                     </span>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />

                {/* Shine effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)',
                    transform: 'translateX(-100%)',
                  }}
                />
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-white/80 text-sm font-light">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
