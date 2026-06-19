import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

interface BurstHeart {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
  size: number;
  color: string;
  duration: number;
}

const HEART_COLORS = ['#f97316', '#fb923c', '#fbbf24', '#fda4af', '#ffffff'];

export default function NotrePromesseSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [signed, setSigned] = useState(false);
  const [burstHearts, setBurstHearts] = useState<BurstHeart[]>([]);

  const handleSign = () => {
    if (signed) return;
    setSigned(true);

    // Generate burst hearts (explosion from the click point)
    const hearts: BurstHeart[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: 0,
      y: 0,
      angle: (Math.PI * 2 * i) / 30 + (Math.random() - 0.5) * 0.4,
      distance: 100 + Math.random() * 250,
      size: 16 + Math.random() * 20,
      color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
      duration: 1.5 + Math.random() * 1,
    }));
    setBurstHearts(hearts);

    // Clear after animation
    setTimeout(() => setBurstHearts([]), 3000);
  };

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-40 px-6 md:px-8 overflow-hidden min-h-[85vh] flex items-center"
    >
      {/* Background warm glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(249,115,22,0.12) 0%, rgba(251,191,36,0.06) 40%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <p
            className="text-xs tracking-[0.5em] uppercase text-orange-400/40 mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            ✦ Ma promesse ✦
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold text-gradient mb-12"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Pour toi, Angie
          </h2>
        </motion.div>

        {/* The promise text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="space-y-5 mb-16"
        >
          <p
            className="text-lg md:text-2xl text-orange-100/80 italic leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Je te promets d'être là,
          </p>
          <p
            className="text-lg md:text-2xl text-orange-100/80 italic leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            dans les fous rires comme dans les silences.
          </p>
          <p
            className="text-lg md:text-2xl text-orange-100/80 italic leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            De garder cette complicité
          </p>
          <p
            className="text-lg md:text-2xl text-orange-100/80 italic leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            qui fait que 2 ans passent comme 2 jours.
          </p>
          <p
            className="text-lg md:text-2xl text-orange-100/80 italic leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Et de fêter chaque année,
          </p>
          <p
            className="text-3xl md:text-5xl text-shimmer font-bold mt-8"
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontWeight: 400,
            }}
          >
            comme on fête celle-ci. 🧡
          </p>
        </motion.div>

        {/* Signature heart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
          className="relative flex flex-col items-center"
        >
          <p
            className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-orange-400/40 mb-6"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {!signed ? 'Touche le cœur pour signer' : 'Scellé avec amour'}
          </p>

          {/* Heart button + burst */}
          <div className="relative flex items-center justify-center" style={{ minHeight: '120px' }}>
            {/* Burst hearts (appear on click) */}
            <AnimatePresence>
              {burstHearts.map((h) => (
                <motion.div
                  key={h.id}
                  className="absolute pointer-events-none"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: h.size,
                    height: h.size,
                  }}
                  initial={{ x: '-50%', y: '-50%', scale: 0, opacity: 1 }}
                  animate={{
                    x: `calc(-50% + ${Math.cos(h.angle) * h.distance}px)`,
                    y: `calc(-50% + ${Math.sin(h.angle) * h.distance}px)`,
                    scale: [0, 1.2, 0],
                    opacity: [1, 1, 0],
                    rotate: [0, 360],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: h.duration,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      background: h.color,
                      clipPath:
                        'path("M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z")',
                      filter: `drop-shadow(0 0 8px ${h.color})`,
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* The heart button */}
            <motion.button
              onClick={handleSign}
              whileHover={!signed ? { scale: 1.15 } : {}}
              whileTap={!signed ? { scale: 0.85 } : {}}
              animate={
                signed
                  ? { scale: [1, 1.3, 1.1, 1] }
                  : { scale: [1, 1.05, 1] }
              }
              transition={
                signed
                  ? { duration: 0.6 }
                  : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
              }
              className="relative text-7xl md:text-8xl cursor-pointer z-10"
              aria-label="Signer la promesse"
              style={{ filter: 'drop-shadow(0 0 20px rgba(249, 115, 22, 0.4))' }}
            >
              {signed ? '❤️' : '🤍'}
            </motion.button>
          </div>

          {/* Signature appears after click */}
          <AnimatePresence>
            {signed && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-8"
              >
                <p
                  className="text-shimmer text-3xl md:text-4xl"
                  style={{
                    fontFamily: "'Great Vibes', cursive",
                    fontWeight: 400,
                  }}
                >
                  Signé : Stan(e)
                </p>
                <p
                  className="mt-2 text-xs text-orange-300/40 tracking-widest uppercase"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Pour toujours, Angie 🧡
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}