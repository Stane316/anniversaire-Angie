import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Dream {
  emoji: string;
  title: string;
  description: string;
  status: 'à vivre' | 'en route';
  category: 'voyage' | 'moment' | 'aventure' | 'émotion';
}

const DREAMS: Dream[] = [
  {
    emoji: '🌅',
    title: 'Le premier café du matin ensemble',
    description: 'Un dimanche, sans réveil. Juste nous deux et le silence.',
    status: 'à vivre',
    category: 'moment',
  },
  {
    emoji: '📸',
    title: 'Une vraie photo imprimée ensemble',
    description: 'Pas un selfie. Une vraie photo, prise avec un vrai appareil.',
    status: 'à vivre',
    category: 'moment',
  },
  {
    emoji: '🎬',
    title: 'Notre marathon Nollywood',
    description: '24h de films, de rires, et de commentaires sur chaque scène.',
    status: 'à vivre',
    category: 'aventure',
  },
  {
    emoji: '🌍',
    title: 'Un voyage juste nous deux',
    description: 'Où on veut, quand on veut. Pas de plan. Juste l\'aventure.',
    status: 'à vivre',
    category: 'voyage',
  },
  {
    emoji: '🎤',
    title: 'Une soirée karaoké jusqu\'au matin',
    description: 'Toutes les chansons qu\'on a jamais osé chanter. Ensemble.',
    status: 'à vivre',
    category: 'aventure',
  },
  {
    emoji: '🎂',
    title: 'Un gâteau d\'anniversaire fait maison',
    description: 'Avec beaucoup d\'amour (et un peu de chance pour la cuisson).',
    status: 'à vivre',
    category: 'émotion',
  },
  {
    emoji: '🗼',
    title: 'Voir un coucher de soleil à la plage',
    description: 'Et ne rien dire pendant 10 minutes. Juste être là, côte à côte.',
    status: 'à vivre',
    category: 'voyage',
  },
  {
    emoji: '💍',
    title: 'Fêter nos 10 ans d\'amitié',
    description: 'Comme si c\'était hier, comme si c\'était demain. Le plus beau jour.',
    status: 'à vivre',
    category: 'émotion',
  },
];

export default function BucketListSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

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
          className="absolute top-1/4 right-1/4 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(251,191,36,0.10) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 2, delay: 0.3 }}
          className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <p
            className="text-xs tracking-[0.5em] uppercase text-orange-400/40 mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            ✦ Nos rêves à 2 ✦
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold text-gradient"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            La bucket list de notre amitié
          </h2>
          <div className="orange-line w-24 mx-auto mt-6" />
          <p
            className="mt-6 text-sm md:text-base text-orange-200/40 italic max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Tout ce qu'on va vivre ensemble.
            <br />
            Parce que 2 ans, c'est juste le début. 🧡
          </p>

          {/* Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-8 inline-flex items-center gap-3 px-5 py-2 rounded-full border border-orange-500/20 bg-orange-500/5"
          >
            <span className="text-orange-300/60 text-xs tracking-widest uppercase"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Rêves à vivre
            </span>
            <span className="text-shimmer text-xl font-bold"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800 }}>
              {DREAMS.length}
            </span>
          </motion.div>
        </motion.div>

        {/* Dreams list */}
        <div className="space-y-4 md:space-y-5">
          {DREAMS.map((dream, i) => (
            <DreamItem key={i} dream={dream} index={i} />
          ))}
        </div>

        {/* Closing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="text-center mt-16"
        >
          <p
            className="text-2xl md:text-3xl text-shimmer"
            style={{ fontFamily: "'Great Vibes', cursive", fontWeight: 400 }}
          >
            Et bien d'autres à venir...
          </p>
          <p
            className="mt-4 text-[10px] tracking-[0.4em] uppercase text-orange-300/30"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            ✦ ✦ ✦
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// Single dream item (checkbox list style)
// ═══════════════════════════════════════════════
function DreamItem({ dream, index }: { dream: Dream; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ x: 6 }}
      className="group relative flex items-start gap-4 md:gap-6 p-5 md:p-7 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-all duration-500 overflow-hidden"
      style={{
        background: 'rgba(17, 17, 17, 0.5)',
        backdropFilter: 'blur(15px)',
        WebkitBackdropFilter: 'blur(15px)',
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 0% 50%, rgba(249,115,22,0.10) 0%, transparent 60%)',
        }}
      />

      {/* Checkbox + emoji */}
      <div className="flex-shrink-0 relative">
        <motion.div
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
          className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center text-2xl md:text-3xl"
          style={{
            borderColor: 'rgba(249, 115, 22, 0.4)',
            background: 'rgba(249, 115, 22, 0.05)',
            boxShadow: '0 0 20px rgba(249, 115, 22, 0.1)',
          }}
        >
          {dream.emoji}
        </motion.div>
        {/* Check mark (faded, for "à vivre" items) */}
        <div
          className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-orange-500/80 flex items-center justify-center text-xs text-white opacity-50"
          style={{ boxShadow: '0 0 10px rgba(249, 115, 22, 0.4)' }}
        >
          ✓
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span
            className="text-[10px] tracking-[0.3em] uppercase text-orange-400/40 font-medium"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            N°{String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <h3
          className="text-lg md:text-2xl text-orange-100/90 font-semibold mt-1 mb-2 group-hover:text-orange-200 transition-colors"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {dream.title}
        </h3>
        <p
          className="text-orange-100/50 text-sm md:text-base italic leading-relaxed"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {dream.description}
        </p>
      </div>

      {/* Category badge */}
      <div className="hidden md:flex flex-col items-end gap-2 flex-shrink-0">
        <span
          className="inline-block px-3 py-1 rounded-full text-[9px] tracking-[0.3em] uppercase text-orange-300/50 border border-orange-500/15 bg-orange-500/5"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {dream.category}
        </span>
        <span
          className="inline-block px-3 py-1 rounded-full text-[9px] tracking-[0.3em] uppercase text-amber-300/60 border border-amber-500/20 bg-amber-500/5"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          ✦ {dream.status}
        </span>
      </div>
    </motion.div>
  );
}