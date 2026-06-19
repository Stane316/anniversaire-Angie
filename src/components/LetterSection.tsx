import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const LETTER_CONTENT = [
  'Angie,',
  '',
  'Si tu lis ces mots, c\'est que tu as trouvé l\'enveloppe.',
  'Cachée au milieu de tout ce site, comme un secret entre nous deux.',
  '',
  'Je voulais juste te dire quelque chose de simple :',
  'merci d\'exister.',
  '',
  'Merci pour les fous rires qui n\'ont aucun sens.',
  'Merci pour les conversations à 3h du matin.',
  'Merci pour avoir été là, sans condition.',
  '',
  'Ces 2 ans avec toi, c\'est le plus beau chapitre de ma vie.',
  'Et ce n\'est que le premier tome.',
  '',
  'À tous nos anniversaires de cette amitié.',
  'À toutes les photos qu\'on s\'enverra.',
  'À tous les délires qu\'on inventera.',
  '',
  'Je t\'aime, Angie. Comme on aime une sœur de cœur.',
  '',
  '— Stan(e) 🧡',
];

export default function LetterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [opened, setOpened] = useState(false);
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  // Typewriter effect (line by line, char by char)
  useEffect(() => {
    if (!opened) return;
    if (currentLine >= LETTER_CONTENT.length) return;

    const line = LETTER_CONTENT[currentLine];
    if (currentChar <= line.length) {
      const timeout = setTimeout(() => {
        setTypedLines((prev) => {
          const newText = [...prev];
          newText[currentLine] = line.slice(0, currentChar);
          return newText;
        });
        setCurrentChar((c) => c + 1);
      }, 32);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, 180);
      return () => clearTimeout(timeout);
    }
  }, [opened, currentLine, currentChar]);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
  };

  const handleReset = () => {
    setOpened(false);
    setTypedLines([]);
    setCurrentLine(0);
    setCurrentChar(0);
  };

  const isComplete = currentLine >= LETTER_CONTENT.length;

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-40 px-6 md:px-8 overflow-hidden min-h-[90vh]"
    >
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(249,115,22,0.10) 0%, rgba(251,191,36,0.04) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p
            className="text-xs tracking-[0.5em] uppercase text-orange-400/40 mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            ✦ Une lettre pour toi ✦
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold text-gradient"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {opened ? 'Pour toi, Angie' : 'À ouvrir quand tu es prête'}
          </h2>
          <div className="orange-line w-24 mx-auto mt-6" />
          {!opened && (
            <p
              className="mt-6 text-sm md:text-base text-orange-200/40 italic"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Clique sur l'enveloppe pour découvrir ce qui t'attend 🧡
            </p>
          )}
        </motion.div>

        {/* ═══ ENVELOPE + LETTER ═══ */}
        <div className="relative flex justify-center" style={{ perspective: '1200px' }}>
          <AnimatePresence mode="wait">
            {!opened ? (
              /* ─── CLOSED ENVELOPE ─── */
              <motion.div
                key="closed"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 1, delay: 0.3 }}
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleOpen}
                className="relative cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative w-72 md:w-96 h-48 md:h-64"
                >
                  {/* Envelope body (back) */}
                  <div
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background:
                        'linear-gradient(135deg, #2a1810 0%, #1a0e08 100%)',
                      border: '1px solid rgba(249, 115, 22, 0.25)',
                      boxShadow:
                        '0 25px 50px rgba(0,0,0,0.5), 0 0 40px rgba(249,115,22,0.15)',
                    }}
                  />
                  {/* Envelope flap (closed - triangle pointing down) */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1/2"
                    style={{
                      background:
                        'linear-gradient(180deg, #3a2010 0%, #2a1810 100%)',
                      clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                      borderBottom: '1px solid rgba(249, 115, 22, 0.15)',
                    }}
                  />
                  {/* Wax seal */}
                  <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-3xl"
                      style={{
                        background:
                          'radial-gradient(circle at 30% 30%, #fb923c 0%, #ea580c 50%, #9a3412 100%)',
                        boxShadow:
                          '0 0 25px rgba(249, 115, 22, 0.6), inset 0 -3px 6px rgba(0,0,0,0.3), inset 0 3px 6px rgba(255,255,255,0.1)',
                      }}
                    >
                      🧡
                    </div>
                  </div>
                  {/* Label */}
                  <div className="absolute bottom-5 left-0 right-0 text-center z-10">
                    <p
                      className="text-orange-200/70 italic text-base md:text-lg"
                      style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                      Pour Angie
                    </p>
                  </div>
                  {/* Sparkle hints around */}
                  <div className="absolute -top-6 -right-6 sparkle-star animate-twinkle" />
                  <div
                    className="absolute -bottom-4 -left-4 sparkle-star animate-twinkle"
                    style={{ animationDelay: '1s' }}
                  />
                </motion.div>
              </motion.div>
            ) : (
              /* ─── OPEN ENVELOPE + LETTER ─── */
              <motion.div
                key="open"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative w-full"
              >
                {/* Envelope with flap open */}
                <div className="relative w-72 md:w-96 h-48 md:h-64 mx-auto">
                  {/* Envelope body (front pocket) */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-3/4 rounded-b-xl"
                    style={{
                      background:
                        'linear-gradient(180deg, #2a1810 0%, #1a0e08 100%)',
                      border: '1px solid rgba(249, 115, 22, 0.2)',
                    }}
                  />
                  {/* Open flap (rotated up, behind) */}
                  <motion.div
                    initial={{ rotateX: 0 }}
                    animate={{ rotateX: -180 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-0 left-0 right-0 h-1/2 origin-top"
                    style={{
                      background:
                        'linear-gradient(180deg, #3a2010 0%, #2a1810 100%)',
                      clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'visible',
                    }}
                  />
                </div>

                {/* Letter sliding out */}
                <motion.div
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: -340, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-[-260px] md:mt-[-300px] relative z-10"
                >
                  <LetterCard typedLines={typedLines} isComplete={isComplete} />
                </motion.div>

                {/* Reset button after complete */}
                {isComplete && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-12"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleReset}
                      className="px-6 py-2 rounded-full border border-orange-500/30 text-orange-300/60 hover:text-orange-300 hover:border-orange-400/50 transition-all text-xs tracking-[0.3em] uppercase"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      ✦ Replier l'enveloppe ✦
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// Letter card (the actual letter)
// ═══════════════════════════════════════════════
function LetterCard({
  typedLines,
  isComplete,
}: {
  typedLines: string[];
  isComplete: boolean;
}) {
  return (
    <div
      className="relative max-w-2xl mx-auto rounded-2xl p-8 md:p-14"
      style={{
        background:
          'linear-gradient(180deg, #fdf6e3 0%, #f5e6d3 50%, #ebd9b8 100%)',
        boxShadow:
          '0 25px 70px rgba(0, 0, 0, 0.6), 0 0 50px rgba(249, 115, 22, 0.25), inset 0 0 30px rgba(180, 140, 80, 0.1)',
      }}
    >
      {/* Decorative corners */}
      <div
        className="absolute top-3 left-3 text-orange-700/30 text-2xl md:text-3xl select-none"
        style={{ fontFamily: "'Great Vibes', cursive" }}
      >
        ❦
      </div>
      <div
        className="absolute top-3 right-3 text-orange-700/30 text-2xl md:text-3xl select-none"
        style={{ fontFamily: "'Great Vibes', cursive" }}
      >
        ❦
      </div>
      <div
        className="absolute bottom-3 left-3 text-orange-700/30 text-2xl md:text-3xl select-none"
        style={{ fontFamily: "'Great Vibes', cursive" }}
      >
        ❦
      </div>
      <div
        className="absolute bottom-3 right-3 text-orange-700/30 text-2xl md:text-3xl select-none"
        style={{ fontFamily: "'Great Vibes', cursive" }}
      >
        ❦
      </div>

      {/* Date */}
      <p
        className="text-right text-orange-900/40 text-xs md:text-sm italic mb-6"
        style={{ fontFamily: "'Dancing Script', cursive" }}
      >
        Le 12 juin 2026
      </p>

      {/* Letter content */}
      <div
        className="text-stone-800 leading-relaxed text-base md:text-xl"
        style={{ fontFamily: "'Dancing Script', cursive" }}
      >
        {typedLines.map((line, i) => (
          <p
            key={i}
            className={i === 0 ? 'text-2xl md:text-3xl mb-6 font-bold' : 'mb-3'}
          >
            {line || '\u00A0'}
            {i === typedLines.length - 1 && !isComplete && (
              <span className="inline-block w-0.5 h-5 bg-orange-700 ml-0.5 animate-pulse align-middle" />
            )}
          </p>
        ))}
      </div>
    </div>
  );
}