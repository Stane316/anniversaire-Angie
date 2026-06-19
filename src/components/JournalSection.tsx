import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface JournalEntry {
  emoji: string;
  title: string;
  date: string;
  text: string;
  tint: string;
}

const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    emoji: '🌅',
    title: 'Le Premier Jour',
    date: '12 juin 2024',
    text: 'Ce jour où on s\'est parlé pour la première fois. Je ne savais pas encore que tu deviendrais cette personne irremplaçable. Mais quelque chose dans ta façon d\'être, dans ton énergie, m\'a fait sentir : "celle-là, c\'est quelqu\'un de vrai."',
    tint: 'rgba(255, 220, 170, 0.4)',
  },
  {
    emoji: '😂',
    title: 'Le Fou Rire Interminable',
    date: 'Été 2024',
    text: 'Je ne sais même plus comment on a commencé. Mais on a ri jusqu\'à en avoir mal aux côtes. Ce genre de fou rire qu\'on n\'oublie jamais — et qui revient dès qu\'on repense à cette journée, ou qu\'on se redit le mot de passe.',
    tint: 'rgba(255, 200, 150, 0.4)',
  },
  {
    emoji: '🌙',
    title: 'La Nuit des Confessions',
    date: 'Automne 2024',
    text: 'Une discussion qui devait durer 10 minutes. Elle a duré jusqu\'au lever du soleil. On a parlé de tout, de rien, de la vie, des rêves. C\'est cette nuit-là que j\'ai compris qu\'on pouvait tout se dire, vraiment tout.',
    tint: 'rgba(200, 180, 230, 0.35)',
  },
  {
    emoji: '🎵',
    title: 'Notre Chanson',
    date: 'Hiver 2024',
    text: 'Cette chanson qu\'on s\'est envoyée, et qui est devenue "notre chanson". Celle qu\'on écoute quand on pense l\'une à l\'autre. Celle qui fait sourire sans raison. Celle qui nous rappelle que cette amitié existe.',
    tint: 'rgba(200, 230, 200, 0.35)',
  },
  {
    emoji: '🪞',
    title: 'Le Miroir',
    date: '2025',
    text: 'On me dit souvent qu\'on se ressemble. Pas physiquement — dans la façon de penser, de rire, de voir le monde. C\'est peut-être pour ça que tout a été si naturel entre nous. Comme si on s\'était toujours connues.',
    tint: 'rgba(255, 210, 200, 0.4)',
  },
];

export default function JournalSection() {
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
          className="absolute top-1/3 left-1/4 w-[700px] h-[700px] rounded-full"
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
          className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 md:mb-28"
        >
          <p
            className="text-xs tracking-[0.5em] uppercase text-orange-400/40 mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            ✦ Notre journal intime ✦
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold text-gradient"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Quelques fragments de nous
          </h2>
          <div className="orange-line w-24 mx-auto mt-6" />
          <p
            className="mt-6 text-sm md:text-base text-orange-200/40 italic max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Les petits moments qui font que cette amitié est si spéciale.
            <br />
            Chacun raconte un fragment de notre histoire 🧡
          </p>
        </motion.div>

        {/* Journal entries */}
        <div className="space-y-16 md:space-y-24">
          {JOURNAL_ENTRIES.map((entry, i) => (
            <JournalEntry key={i} entry={entry} index={i} />
          ))}
        </div>

        {/* Closing line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="text-center mt-20"
        >
          <p
            className="text-sm md:text-base text-orange-300/40 italic"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            ...et l'histoire ne fait que commencer.
          </p>
          <p
            className="mt-2 text-shimmer text-2xl md:text-3xl"
            style={{ fontFamily: "'Great Vibes', cursive", fontWeight: 400 }}
          >
            ✦
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// Single journal entry (page)
// ═══════════════════════════════════════════════
function JournalEntry({ entry, index }: { entry: JournalEntry; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, rotate: isEven ? -3 : 3 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, rotate: isEven ? -1 : 1 }
          : {}
      }
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <div
        className={`flex items-center gap-6 md:gap-12 ${
          isEven ? 'md:flex-row' : 'md:flex-row-reverse'
        }`}
      >
        {/* Card (paper page) */}
        <div
          className="flex-1 p-8 md:p-12 rounded-lg relative"
          style={{
            background: `linear-gradient(135deg, ${entry.tint} 0%, rgba(245, 230, 211, 0.95) 50%, ${entry.tint} 100%)`,
            boxShadow:
              '0 25px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(249, 115, 22, 0.15), inset 0 0 20px rgba(180, 140, 80, 0.08)',
          }}
        >
          {/* Tape strip on top */}
          <div
            className="absolute -top-3 left-1/2 w-24 h-7 rounded-sm opacity-80"
            style={{
              background:
                'linear-gradient(180deg, rgba(255, 240, 200, 0.85) 0%, rgba(255, 220, 170, 0.65) 100%)',
              transform: `translateX(-50%) rotate(${isEven ? '-3' : '2'}deg)`,
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            }}
          />

          {/* Decorative corner ❦ */}
          <div
            className="absolute top-3 right-4 text-orange-700/25 text-xl select-none"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            ❦
          </div>

          {/* Date */}
          <p
            className="text-right text-stone-500/70 text-xs md:text-sm italic mb-4"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            {entry.date}
          </p>

          {/* Title */}
          <h3
            className="text-2xl md:text-4xl font-bold text-stone-800 mb-5 flex items-center gap-3"
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontWeight: 400,
            }}
          >
            <span className="text-3xl md:text-4xl">{entry.emoji}</span>
            <span>{entry.title}</span>
          </h3>

          {/* Text */}
          <p
            className="text-stone-700 leading-relaxed text-base md:text-xl"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            {entry.text}
          </p>

          {/* Page corner fold */}
          <div
            className="absolute bottom-0 right-0 w-10 h-10 md:w-14 md:h-14"
            style={{
              background:
                'linear-gradient(135deg, transparent 50%, rgba(180, 140, 80, 0.18) 50%)',
            }}
          />
        </div>

        {/* Decorative side element (alternating) */}
        <div className="hidden md:flex flex-col items-center gap-3 flex-shrink-0 w-32">
          <div className="text-3xl text-orange-400/40">{entry.emoji}</div>
          <div className="w-px h-20 bg-gradient-to-b from-orange-400/40 via-orange-300/30 to-transparent" />
          <div
            className="text-[10px] tracking-[0.3em] uppercase text-orange-300/40 font-medium"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
            }}
          >
            Fragment {String(index + 1).padStart(2, '0')}
          </div>
        </div>
      </div>
    </motion.div>
  );
}