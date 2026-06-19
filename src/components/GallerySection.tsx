import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

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
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIdx === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIdx(null);
      if (e.key === 'ArrowRight') {
        setLightboxIdx((i) => (i === null ? null : (i + 1) % items.length));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIdx((i) =>
          i === null ? null : (i - 1 + items.length) % items.length
        );
      }
    };
    window.addEventListener('keydown', handleKey);
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIdx, items.length]);

  const currentItem = lightboxIdx !== null ? items[lightboxIdx] : null;

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
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-2 text-xs text-orange-300/30 font-light italic"
        >
          Clique sur une photo pour la voir en grand 🧡
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
              onClick={() => setLightboxIdx(i)}
              className="break-inside-avoid group relative rounded-2xl overflow-hidden cursor-pointer"
            >
              <div
                className="relative aspect-[4/3] md:aspect-[3/4] overflow-hidden"
                style={{ background: item.gradient }}
              >
                <img
                  src={item.image}
                  alt={item.label}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                />

                <div className="absolute inset-0 flex flex-col items-center justify-end p-4 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                  <span
                    className="text-xs tracking-[0.2em] uppercase text-white/80 font-light"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {item.label}
                  </span>
                </div>

                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    className="w-14 h-14 rounded-full bg-orange-500/30 backdrop-blur-sm border border-orange-400/40 flex items-center justify-center text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  >
                    🔍
                  </motion.div>
                </div>

                {/* Shine effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)',
                    transform: 'translateX(-100%)',
                  }}
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-white/80 text-sm font-light">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ═══ LIGHTBOX MODAL ═══ */}
      <AnimatePresence>
        {lightboxIdx !== null && currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightboxIdx(null)}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ delay: 0.1 }}
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIdx(null);
              }}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-orange-500/20 backdrop-blur-md border border-orange-400/40 flex items-center justify-center text-orange-200 hover:bg-orange-500/40 hover:scale-110 transition-all z-10"
              aria-label="Fermer"
            >
              ✕
            </motion.button>

            {/* Counter */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute top-6 left-6 px-4 py-2 rounded-full bg-orange-500/20 backdrop-blur-md border border-orange-400/40 text-orange-200 text-sm"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {lightboxIdx + 1} / {items.length}
            </motion.div>

            {/* Navigation arrows */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.15 }}
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIdx(
                  (lightboxIdx - 1 + items.length) % items.length
                );
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-orange-500/20 backdrop-blur-md border border-orange-400/40 flex items-center justify-center text-orange-200 text-2xl hover:bg-orange-500/40 hover:scale-110 transition-all"
              aria-label="Photo précédente"
            >
              ‹
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.15 }}
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIdx((lightboxIdx + 1) % items.length);
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-orange-500/20 backdrop-blur-md border border-orange-400/40 flex items-center justify-center text-orange-200 text-2xl hover:bg-orange-500/40 hover:scale-110 transition-all"
              aria-label="Photo suivante"
            >
              ›
            </motion.button>

            {/* Main image + caption */}
            <motion.div
              key={lightboxIdx}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(249,115,22,0.3)] border border-orange-500/20">
                <img
                  src={currentItem.image}
                  alt={currentItem.label}
                  className="w-full h-auto max-h-[75vh] object-contain bg-black"
                />
                {/* Top gradient overlay */}
                <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-center"
              >
                <p
                  className="text-2xl md:text-3xl font-bold text-shimmer"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {currentItem.label}
                </p>
                <p
                  className="mt-2 text-orange-200/60 text-sm md:text-base"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {currentItem.description}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}