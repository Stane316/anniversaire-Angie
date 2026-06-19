import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

interface Stat {
  id: string;
  emoji: string;
  displayValue: string;
  label: string;
  description: string;
  isAnimated?: boolean;
  targetNumber?: number;
  highlight?: boolean;
}

const MEETING_DATE = new Date('2024-06-12T00:00:00');

function useDaysSince() {
  const [days, setDays] = useState(0);
  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const diff = now.getTime() - MEETING_DATE.getTime();
      setDays(Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))));
    };
    calc();
    const interval = setInterval(calc, 60000);
    return () => clearInterval(interval);
  }, []);
  return days;
}

const STATS_TEMPLATE: Omit<Stat, 'targetNumber'>[] = [
  {
    id: 'days',
    emoji: '📅',
    displayValue: '0',
    label: 'jours ensemble',
    description: 'Depuis le 12 juin 2024, sans interruption',
    isAnimated: true,
  },
  {
    id: 'years',
    emoji: '🧡',
    displayValue: '0',
    label: 'ans de complicité',
    description: 'Et ce n\'est que le premier tome',
    isAnimated: true,
  },
  {
    id: 'laughs',
    emoji: '😂',
    displayValue: '∞',
    label: 'fous rires',
    description: 'Impossible à compter, impossible à oublier',
  },
  {
    id: 'angie',
    emoji: '👑',
    displayValue: '1',
    label: 'Angie irremplaçable',
    description: 'Unique, précieuse, essentielle',
  },
  {
    id: 'messages',
    emoji: '💬',
    displayValue: '0',
    label: 'messages échangés',
    description: 'Et quelques milliers de délires en plus',
    isAnimated: true,
  },
  {
    id: 'heart',
    emoji: '🧡',
    displayValue: '100%',
    label: 'cœur en or',
    description: 'Garantie à vie, sans condition',
    highlight: true,
  },
];

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const exactDays = useDaysSince();
  const [secret2Open, setSecret2Open] = useState(false);

  const stats: Stat[] = STATS_TEMPLATE.map((s) => {
    if (s.id === 'days') return { ...s, targetNumber: exactDays, displayValue: String(exactDays) };
    if (s.id === 'years') return { ...s, targetNumber: 2, displayValue: '2' };
    if (s.id === 'messages') return { ...s, targetNumber: 5000, displayValue: '5000' };
    return s as Stat;
  });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-40 px-6 md:px-8 overflow-hidden"
    >
      {/* Background warm glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 2 }}
          className="absolute top-1/4 left-1/4 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 2, delay: 0.3 }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <p
            className="text-xs tracking-[0.5em] uppercase text-orange-400/40 mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            ✦ En quelques chiffres ✦
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold text-gradient mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ce qui nous définit
          </h2>
          <div className="orange-line w-24 mx-auto mt-6" />
          <p
            className="mt-6 text-sm md:text-base text-orange-200/40 italic max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Parce que certaines choses se mesurent en chiffres,
            <br /> et d'autres se mesurent en battements de cœur 🧡
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {stats.map((stat, i) => (
            <StatCard
              key={stat.id}
              stat={stat}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Secret #2 trigger */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 2 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.3, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.6 }}
            onClick={() => setSecret2Open(true)}
            className="text-orange-400/40 hover:text-orange-300 text-2xl cursor-pointer"
            style={{ fontFamily: "'Great Vibes', cursive" }}
            aria-label="Secret n°2"
          >
            ✦
          </motion.button>
          <p
            className="mt-2 text-[10px] tracking-[0.4em] uppercase text-orange-300/20"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            (essaie de cliquer)
          </p>
        </motion.div>
      </div>

      {/* ═══ SECRET #2 MODAL ═══ */}
      <AnimatePresence>
        {secret2Open && <Secret2Modal onClose={() => setSecret2Open(false)} />}
      </AnimatePresence>
    </section>
  );
}

// ═══════════════════════════════════════════════
// Single stat card
// ═══════════════════════════════════════════════
function StatCard({
  stat,
  index,
  isInView,
}: {
  stat: Stat;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.1 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className={`relative rounded-2xl p-8 md:p-10 text-center group overflow-hidden ${
        stat.highlight
          ? 'border border-orange-400/30'
          : 'border border-white/5'
      }`}
      style={{
        background: stat.highlight
          ? 'linear-gradient(135deg, rgba(249,115,22,0.10) 0%, rgba(20,10,5,0.6) 100%)'
          : 'rgba(17, 17, 17, 0.5)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: stat.highlight
          ? '0 0 40px rgba(249,115,22,0.2), inset 0 0 30px rgba(249,115,22,0.05)'
          : '0 10px 40px rgba(0,0,0,0.3)',
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 0%, rgba(249,115,22,0.10) 0%, transparent 60%)',
        }}
      />

      {/* Emoji */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: index * 0.3,
          ease: 'easeInOut',
        }}
        className="text-4xl md:text-5xl mb-4"
      >
        {stat.emoji}
      </motion.div>

      {/* Big number */}
      <div className="my-3">
        {stat.isAnimated && stat.targetNumber !== undefined ? (
          <AnimatedCounter
            target={stat.targetNumber}
            isInView={isInView}
            delay={0.4 + index * 0.1}
          />
        ) : (
          <div
            className={`text-5xl md:text-7xl font-bold leading-none ${
              stat.highlight ? 'text-shimmer' : 'text-shimmer'
            }`}
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800 }}
          >
            {stat.displayValue}
          </div>
        )}
      </div>

      {/* Label */}
      <h3
        className="text-base md:text-lg text-orange-200/80 mt-3 font-medium tracking-wide"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {stat.label}
      </h3>

      {/* Description */}
      <p
        className="mt-3 text-xs md:text-sm text-orange-100/40 italic leading-relaxed"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {stat.description}
      </p>

      {/* Corner accent */}
      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-orange-500/0 group-hover:bg-orange-500/40 transition-all duration-500" />
    </motion.div>
  );
}

// ═══════════════════════════════════════════════
// Animated counter (counts up to target)
// ═══════════════════════════════════════════════
function AnimatedCounter({
  target,
  isInView,
  delay,
}: {
  target: number;
  isInView: boolean;
  delay: number;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const startDelay = delay * 1000;
    let raf = 0;
    let startTime = 0;

    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime - startDelay;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.floor(target * eased));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, isInView, delay]);

  return (
    <div
      className="text-5xl md:text-7xl font-bold text-shimmer leading-none tabular-nums"
      style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800 }}
    >
      {value.toLocaleString('fr-FR')}
    </div>
  );
}

// ═══════════════════════════════════════════════
// Secret n°2 Modal
// ═══════════════════════════════════════════════
function Secret2Modal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-6 cursor-pointer"
    >
      {/* Sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute sparkle-star animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 30 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-2xl w-full p-8 md:p-14 rounded-3xl"
        style={{
          background:
            'radial-gradient(circle at top, rgba(251,191,36,0.18) 0%, rgba(20,10,5,0.95) 60%)',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          boxShadow:
            '0 0 80px rgba(251, 191, 36, 0.3), inset 0 0 40px rgba(251, 191, 36, 0.05)',
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-orange-500/20 backdrop-blur-sm border border-orange-400/40 flex items-center justify-center text-orange-200 hover:bg-orange-500/40 transition-all"
          aria-label="Fermer"
        >
          ✕
        </button>

        <div className="text-center">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="text-5xl md:text-6xl mb-6 inline-block"
          >
            ✦
          </motion.div>

          <p
            className="text-shimmer text-3xl md:text-5xl mb-6"
            style={{ fontFamily: "'Great Vibes', cursive", fontWeight: 400 }}
          >
            Secret n°2
          </p>

          <p
            className="text-orange-100/80 text-lg md:text-xl leading-relaxed italic mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Chaque ligne de ce site a été écrite en pensant à toi.
          </p>

          <p
            className="text-orange-100/70 text-base md:text-lg leading-relaxed italic"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Pas à un algorithme.
            <br />
            Pas à un template.
            <br />
            <span className="text-orange-300/90 not-italic font-medium">
              À toi, Angie. 🧡
            </span>
          </p>

          <p
            className="mt-8 text-[10px] tracking-[0.4em] uppercase text-orange-400/30"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            ✦ Secret n°2 / ? ✦
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}