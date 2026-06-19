import { useEffect, useRef, useCallback, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface Burst {
  id: number;
  x: number;
  y: number;
  hue: number;
  delay: number;
  size: number;
}

interface Confetto {
  id: number;
  x: number;
  delay: number;
  duration: number;
  color: string;
  shape: 'heart' | 'circle' | 'star';
  size: number;
}

const FINALE_PHOTOS = [
  '/images/photo-hero.jpeg',
  '/images/mode-star.jpeg',
  '/images/dance-mode.jpeg',
  '/images/fou-rire.jpeg',
  '/images/selfie1.jpeg',
];

const CONFETTO_COLORS = [
  '#f97316', '#fb923c', '#fbbf24', '#f59e0b',
  '#fed7aa', '#fda4af', '#ffedd5', '#ffffff',
];

export default function FinaleSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [bursts, setBursts] = useState<Burst[]>([]);
  const [confetti, setConfetti] = useState<Confetto[]>([]);
  const [photoIdx, setPhotoIdx] = useState(0);
  const [triggered, setTriggered] = useState(false);

  // Photo carousel
  useEffect(() => {
    if (!triggered) return;
    const interval = setInterval(() => {
      setPhotoIdx((i) => (i + 1) % FINALE_PHOTOS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [triggered]);

  const handleSurprise = useCallback(() => {
    if (triggered) return;
    setTriggered(true);

    // 8 firework bursts across the screen
    const newBursts: Burst[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 15 + Math.random() * 70,
      y: 20 + Math.random() * 50,
      hue: 20 + Math.random() * 30,
      delay: i * 0.4,
      size: 80 + Math.random() * 80,
    }));
    setBursts(newBursts);

    // 80 heart confetti
    const newConfetti: Confetto[] = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 4 + Math.random() * 3,
      color: CONFETTO_COLORS[Math.floor(Math.random() * CONFETTO_COLORS.length)],
      shape: Math.random() > 0.6 ? 'heart' : Math.random() > 0.5 ? 'star' : 'circle',
      size: 8 + Math.random() * 14,
    }));
    setConfetti(newConfetti);
  }, [triggered]);

  const title = "2 ans qu'on se connaît".split(' ');
  const subtitle = "Angie".split('');

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20"
    >
      {/* Background mega glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(249,115,22,0.18) 0%, rgba(251,191,36,0.08) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* ═══ Confetti rain ═══ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {confetti.map((c) => (
          <motion.div
            key={c.id}
            className="absolute"
            style={{
              left: `${c.x}%`,
              top: '-40px',
              width: c.size,
              height: c.size,
            }}
            initial={{ y: 0, rotate: 0, opacity: 1 }}
            animate={{
              y: '120vh',
              rotate: 720,
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: c.duration,
              delay: c.delay,
              ease: 'linear',
            }}
          >
            {c.shape === 'heart' && (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: c.color,
                  clipPath: 'path("M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z")',
                  filter: `drop-shadow(0 0 6px ${c.color}80)`,
                }}
              />
            )}
            {c.shape === 'star' && (
              <div
                className="sparkle-star"
                style={{
                  width: '100%',
                  height: '100%',
                  background: c.color,
                  filter: `drop-shadow(0 0 4px ${c.color})`,
                }}
              />
            )}
            {c.shape === 'circle' && (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: c.color,
                  filter: `drop-shadow(0 0 4px ${c.color})`,
                }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* ═══ Firework bursts ═══ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {bursts.map((burst) => (
          <Fireworks key={burst.id} {...burst} />
        ))}
      </div>

      {/* ═══ Photo carousel (after trigger) ═══ */}
      {triggered && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.18, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="relative w-72 h-96 md:w-96 md:h-[28rem]"
          >
            {FINALE_PHOTOS.map((src, i) => (
              <motion.img
                key={i}
                src={src}
                alt=""
                className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: photoIdx === i ? 1 : 0,
                  scale: photoIdx === i ? 1 : 0.95,
                }}
                transition={{ duration: 1.2 }}
                style={{
                  filter: 'blur(2px)',
                  boxShadow: '0 0 80px rgba(249, 115, 22, 0.4)',
                }}
              />
            ))}
          </motion.div>
        </div>
      )}

      {/* ═══ Main content ═══ */}
      <div className="relative z-10 text-center max-w-4xl">
        {/* Heart */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: 'backOut' }}
          className="text-6xl md:text-8xl mb-6 animate-heartbeat"
        >
          🧡
        </motion.div>

        {/* Letter-by-letter reveal — "2 ans qu'on se connaît" */}
        <h2
          className="text-3xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {title.map((word, wi) => (
            <span key={wi} className="inline-block mr-3">
              {word.split('').map((char, ci) => (
                <motion.span
                  key={ci}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.6 + wi * 0.25 + ci * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block text-shimmer"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </h2>

        {/* "Angie" calligraphic subtitle */}
        <h3
          className="text-4xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
          style={{ fontFamily: "'Great Vibes', cursive", fontWeight: 400 }}
        >
          {subtitle.map((char, ci) => (
            <motion.span
              key={ci}
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 1.4 + ci * 0.1,
                ease: 'backOut',
              }}
              className="inline-block text-shimmer"
            >
              {char}
            </motion.span>
          ))}
        </h3>

        {/* Date pill — 12 Juin 2026 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 2.0 }}
          className="mb-8"
        >
          <span
            className="inline-block px-5 py-2 rounded-full text-xs md:text-sm tracking-[0.3em] uppercase text-orange-200/80 border border-orange-500/30 bg-orange-500/5 backdrop-blur-sm"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            ✦ 12 Juin 2026 — nos 2 ans ✦
          </span>
        </motion.div>

        {/* Big message */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 2.2, ease: 'easeOut' }}
          className="text-lg md:text-2xl text-orange-100/70 font-light leading-relaxed mb-4 max-w-2xl mx-auto"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          2 ans. 730 jours de complicité, de fous rires, de délires improvisés,
          de discussions à n'importe quelle heure. Et ce n'est que le début.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 2.4, ease: 'easeOut' }}
          className="text-base md:text-lg text-orange-100/45 font-light italic leading-relaxed mb-12"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          « Les meilleures amitiés, c'est celles où on peut être complètement fou
          ensemble sans se juger. » 🌟
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 2.7 }}
        >
          <motion.button
            onClick={handleSurprise}
            whileHover={{ scale: triggered ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={triggered}
            className={`group relative px-10 py-5 rounded-full overflow-hidden transition-all duration-500 ${
              triggered ? 'animate-glow-pulse' : ''
            }`}
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <div
              className={`absolute inset-0 transition-all duration-700 ${
                triggered
                  ? 'bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500'
                  : 'bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-500" />
            <span className="relative text-white font-medium text-lg tracking-[0.2em] uppercase flex items-center gap-2">
              {triggered ? '🧡 Pour toujours !' : 'Touche pour la magie ✨'}
            </span>
          </motion.button>
        </motion.div>

        {/* Signature */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 3 }}
          className="mt-20 text-sm tracking-[0.4em] uppercase text-orange-300/30"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Fait avec 🧡 pour Angie — pour nos 2 ans et tous ceux à venir
        </motion.p>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// FIREWORK COMPONENT
// ═══════════════════════════════════════════════
function Fireworks({ x, y, hue, delay, size }: Burst) {
  const PARTICLES = 30;
  const particles = Array.from({ length: PARTICLES }, (_, i) => ({
    angle: (Math.PI * 2 * i) / PARTICLES,
    distance: size + Math.random() * 40,
    color: `hsl(${hue + Math.random() * 20}, 100%, ${60 + Math.random() * 20}%)`,
    size: 2 + Math.random() * 3,
  }));

  return (
    <motion.div
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay }}
    >
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos(p.angle) * p.distance,
            y: Math.sin(p.angle) * p.distance + 100,
            opacity: 0,
            scale: 0.3,
          }}
          transition={{
            duration: 1.6,
            delay: delay + 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 20,
          height: 20,
          background: `hsl(${hue}, 100%, 80%)`,
          boxShadow: `0 0 60px hsl(${hue}, 100%, 60%)`,
        }}
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 4, opacity: 0 }}
        transition={{ duration: 0.8, delay }}
      />
    </motion.div>
  );
}