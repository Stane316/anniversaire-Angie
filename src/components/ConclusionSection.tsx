import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const REVEAL_LINES = [
  { text: 'Tu cherchais peut-être un cadeau…', delay: 0 },
  { text: 'Quelque chose de tangible, de physique.', delay: 1500 },
  { text: 'Mais j\'ai réalisé que ce n\'était pas possible.', delay: 3000 },
  { text: 'Pas un objet qui fane, qui s\'use, qui se casse.', delay: 4500 },
  { text: 'Alors je t\'ai fait ça.', delay: 6500 },
  { text: '', delay: 8000 },
  { text: 'Un site. Un souvenir. Un endroit à nous.', delay: 9000 },
  { text: 'Quelque chose que tu peux revisiter,', delay: 11000 },
  { text: 'encore et encore. Même dans 10 ans.', delay: 12500 },
  { text: '', delay: 14500 },
  { text: 'Joyeux 2 ans, Angie. 🧡', delay: 15500, emphasis: true },
];

export default function ConclusionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [currentLine, setCurrentLine] = useState(-1);
  const [secret3Open, setSecret3Open] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Auto-reveal lines when section is in view
  useEffect(() => {
    if (!isInView || completed) return;

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    REVEAL_LINES.forEach((line, i) => {
      const timeout = setTimeout(() => {
        setCurrentLine(i);
      }, line.delay);
      timeouts.push(timeout);
    });

    // Mark as completed after all lines
    const finalTimeout = setTimeout(() => {
      setCompleted(true);
    }, REVEAL_LINES[REVEAL_LINES.length - 1].delay + 2500);
    timeouts.push(finalTimeout);

    return () => timeouts.forEach(clearTimeout);
  }, [isInView, completed]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-6 py-32 overflow-hidden"
    >
      {/* Background dark with warm glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 3 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(249,115,22,0.12) 0%, rgba(251,191,36,0.05) 40%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Subtle stars in background */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute sparkle-star animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-3xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="mb-16"
        >
          <p
            className="text-xs tracking-[0.5em] uppercase text-orange-400/40 mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            ✦ Le mot de la fin ✦
          </p>
          <div className="orange-line w-24 mx-auto" />
        </motion.div>

        {/* Reveal text */}
        <div className="min-h-[400px] md:min-h-[500px] flex flex-col items-center justify-center">
          {REVEAL_LINES.slice(0, currentLine + 1).map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={`mb-3 md:mb-4 ${
                line.emphasis
                  ? 'text-3xl md:text-5xl text-shimmer font-bold mt-6'
                  : 'text-base md:text-2xl text-orange-100/70 font-light italic'
              }`}
              style={{
                fontFamily: line.emphasis
                  ? "'Great Vibes', cursive"
                  : "'Cormorant Garamond', serif",
                fontWeight: line.emphasis ? 400 : 500,
              }}
            >
              {line.text || '\u00A0'}
            </motion.p>
          ))}
        </div>

        {/* Signature (after completion) */}
        {completed && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-20"
          >
            {/* Two interlocking signatures */}
            <div className="flex items-center justify-center gap-6 mb-6">
              <span
                className="text-shimmer text-3xl md:text-5xl"
                style={{ fontFamily: "'Great Vibes', cursive", fontWeight: 400 }}
              >
                Stan(e)
              </span>
              <span className="text-orange-400/40 text-2xl md:text-3xl">+</span>
              <span
                className="text-shimmer text-3xl md:text-5xl"
                style={{ fontFamily: "'Great Vibes', cursive", fontWeight: 400 }}
              >
                Angie
              </span>
            </div>

            <p
              className="text-sm md:text-base text-orange-300/50 italic mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Le 12 juin 2026
            </p>
            <p
              className="text-xs tracking-[0.4em] uppercase text-orange-400/30"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              ✦ Et pour toujours ✦
            </p>

            {/* Secret n°3 trigger */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              whileHover={{ scale: 1.3, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSecret3Open(true)}
              className="mt-10 text-orange-400/30 hover:text-orange-300 text-2xl cursor-pointer"
              style={{ fontFamily: "'Great Vibes', cursive" }}
              aria-label="Secret n°3"
            >
              ✦
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* ═══ SECRET N°3 MODAL ═══ */}
      <AnimatePresence>
        {secret3Open && <Secret3Modal onClose={() => setSecret3Open(false)} />}
      </AnimatePresence>
    </section>
  );
}

// ═══════════════════════════════════════════════
// Secret n°3 Modal — The final, deepest message
// ═══════════════════════════════════════════════
function Secret3Modal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-6 cursor-pointer"
    >
      {/* Floating hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ y: '110vh', opacity: 0 }}
            animate={{
              y: '-10vh',
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{ left: `${Math.random() * 100}%` }}
          >
            <div
              className="text-3xl"
              style={{
                filter: 'drop-shadow(0 0 10px rgba(249, 115, 22, 0.6))',
              }}
            >
              {['🧡', '✨', '💛'][Math.floor(Math.random() * 3)]}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-2xl w-full p-8 md:p-14 rounded-3xl"
        style={{
          background:
            'radial-gradient(circle at top, rgba(249,115,22,0.20) 0%, rgba(20,10,5,0.95) 60%)',
          border: '1px solid rgba(249, 115, 22, 0.4)',
          boxShadow:
            '0 0 100px rgba(249, 115, 22, 0.4), inset 0 0 50px rgba(249, 115, 22, 0.05)',
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
          {/* Big pulsing heart */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-6xl md:text-8xl mb-6 inline-block"
          >
            🧡
          </motion.div>

          <p
            className="text-shimmer text-3xl md:text-5xl mb-6"
            style={{ fontFamily: "'Great Vibes', cursive", fontWeight: 400 }}
          >
            Secret n°3 — Le dernier
          </p>

          <p
            className="text-orange-100/85 text-lg md:text-2xl leading-relaxed italic mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            J'ai mis 6 mois à écrire ce site.
          </p>

          <p
            className="text-orange-100/75 text-base md:text-lg leading-relaxed italic mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Chaque mot. Chaque animation.
            <br />
            Chaque photo. Chaque secret.
          </p>

          <p
            className="text-orange-100/85 text-lg md:text-xl leading-relaxed italic mt-6 mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Tout est pour toi, Angie.
          </p>

          <p
            className="text-orange-300/90 text-lg md:text-xl leading-relaxed font-medium"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Et je recommencerais sans hésiter. 🧡
          </p>

          {/* Final flourish */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-8 text-shimmer text-3xl"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            ✦
          </motion.div>

          <p
            className="mt-6 text-[10px] tracking-[0.4em] uppercase text-orange-400/40"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            ✦ Tous les secrets révélés ✦
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}