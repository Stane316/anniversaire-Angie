import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Phase = 'loading' | 'title' | 'countdown' | 'cta' | 'exiting' | 'reveal';

interface IntroOverlayProps {
  onEnter: () => void;
}

export default function IntroOverlay({ onEnter }: IntroOverlayProps) {
  const [phase, setPhase] = useState<Phase>('loading');
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(3);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Loading animation
  useEffect(() => {
    if (phase !== 'loading') return;
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + 1.4;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase('title'), 200);
          return 100;
        }
        return next;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [phase]);

  // Title → Countdown
  useEffect(() => {
    if (phase !== 'title') return;
    const t = setTimeout(() => setPhase('countdown'), 2000);
    return () => clearTimeout(t);
  }, [phase]);

  // Countdown 3 → 2 → 1
  useEffect(() => {
    if (phase !== 'countdown') return;
    setCount(3);
    const t1 = setTimeout(() => setCount(2), 800);
    const t2 = setTimeout(() => setCount(1), 1600);
    const t3 = setTimeout(() => setPhase('cta'), 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [phase]);

  const handleEnter = () => {
    setPhase('exiting');
    setTimeout(() => setPhase('reveal'), 600);
    setTimeout(onEnter, 1600);
  };

  return (
    <AnimatePresence>
      {(phase === 'loading' || phase === 'title' || phase === 'countdown' || phase === 'cta') && (
        <motion.div
          key="overlay"
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
          exit={{
            clipPath: 'circle(150% at 50% 50%)',
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Background ambient glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(249,115,22,0.10) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Sparkles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => {
              const left = Math.random() * 100;
              const delay = Math.random() * 4;
              return (
                <div
                  key={i}
                  className="absolute sparkle-star animate-twinkle"
                  style={{
                    left: `${left}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${delay}s`,
                    opacity: 0.5,
                  }}
                />
              );
            })}
          </div>

          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <AnimatePresence mode="wait">
              {/* ═══ LOADING PHASE ═══ */}
              {phase === 'loading' && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-8"
                >
                  <motion.div
                    className="text-5xl md:text-6xl animate-heartbeat"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    🧡
                  </motion.div>
                  <p
                    className="text-xs tracking-[0.5em] uppercase text-orange-300/50"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Préparation de ta surprise
                  </p>
                  <div className="w-64 md:w-80 h-0.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full loading-bar"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p
                    className="text-[10px] tracking-[0.4em] uppercase text-orange-400/40"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {Math.round(progress)}%
                  </p>
                </motion.div>
              )}

              {/* ═══ TITLE PHASE ═══ */}
              {phase === 'title' && (
                <motion.div
                  key="title"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="flex flex-col items-center gap-4"
                >
                  <p
                    className="text-xs tracking-[0.5em] uppercase text-orange-300/50"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    ✦ Pour toi ✦
                  </p>
                  <h1
                    className="text-shimmer font-bold"
                    style={{
                      fontFamily: "'Great Vibes', cursive",
                      fontSize: 'clamp(5rem, 14vw, 9rem)',
                      fontWeight: 400,
                    }}
                  >
                    Angie
                  </h1>
                  <div className="orange-line w-32" />
                  <p
                    className="text-base md:text-lg text-orange-200/60 italic mt-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
                  >
                    Une aventure juste pour toi
                  </p>
                </motion.div>
              )}

              {/* ═══ COUNTDOWN PHASE ═══ */}
              {phase === 'countdown' && (
                <motion.div
                  key="countdown"
                  className="relative h-40 md:h-56 flex items-center justify-center"
                >
                  <AnimatePresence mode="wait">
                    {[3, 2, 1].map(
                      (n) =>
                        count === n && (
                          <motion.div
                            key={n}
                            initial={{ opacity: 0, scale: 0.3, rotate: -30 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 2, rotate: 30 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute text-shimmer font-bold"
                            style={{
                              fontFamily: "'Great Vibes', cursive",
                              fontSize: 'clamp(8rem, 25vw, 16rem)',
                              fontWeight: 400,
                              lineHeight: 1,
                            }}
                          >
                            {n}
                          </motion.div>
                        )
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* ═══ CTA PHASE ═══ */}
              {phase === 'cta' && (
                <motion.div
                  key="cta"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-10"
                >
                  <p
                    className="text-lg md:text-xl text-orange-200/70 font-light italic"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Prête à découvrir ce qui t'attend ?
                  </p>
                  <motion.button
                    onClick={handleEnter}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-12 py-5 rounded-full overflow-hidden animate-glow-pulse"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 transition-all duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-300" />
                    <span className="relative text-white font-medium text-lg tracking-[0.2em] uppercase">
                      Entrer ✦
                    </span>
                  </motion.button>
                  <p
                    className="text-[10px] tracking-[0.4em] uppercase text-orange-400/30 mt-2"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Mets le son 🔊
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* ═══ CURTAIN EXIT ═══ */}
      {phase === 'exiting' && (
        <motion.div
          key="curtain"
          className="fixed inset-0 z-[101] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Two curtains closing */}
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full bg-black"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full bg-black"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          />
          {/* Center glow */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p
              className="text-shimmer text-4xl md:text-5xl"
              style={{ fontFamily: "'Great Vibes', cursive", fontWeight: 400 }}
            >
              C'est parti… 🧡
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* ═══ REVEAL (after curtains close) ═══ */}
      {phase === 'reveal' && (
        <motion.div
          key="reveal"
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.p
            className="text-2xl md:text-3xl text-orange-300/80 font-light italic"
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            C'est parti… 🧡
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}