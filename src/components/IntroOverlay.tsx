import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Phase = 'text1' | 'text2' | 'cta' | 'leaving';

interface IntroOverlayProps {
  onEnter: () => void;
}

export default function IntroOverlay({ onEnter }: IntroOverlayProps) {
  const [phase, setPhase] = useState<Phase>('text1');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('text2'), 2200);
    const t2 = setTimeout(() => setPhase('cta'), 4400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleEnter = () => {
    if (phase === 'leaving') return;
    setPhase('leaving');
    // Wait for fade-out animation to finish before unmounting
    setTimeout(() => onEnter(), 700);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="intro-overlay"
        className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
        initial={{ opacity: 1 }}
        animate={
          phase === 'leaving'
            ? { opacity: 0, scale: 1.1 }
            : { opacity: 1, scale: 1 }
        }
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Background ambient glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)',
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          <AnimatePresence mode="wait">
            {phase === 'text1' && (
              <motion.p
                key="text1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="text-lg md:text-xl text-orange-200/60 font-light tracking-wide"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Bienvenue dans quelque chose de spécial…
              </motion.p>
            )}

            {phase === 'text2' && (
              <motion.p
                key="text2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="text-xl md:text-2xl text-orange-300/80 font-light tracking-wide"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Une petite aventure juste pour toi ✦
              </motion.p>
            )}

            {phase === 'cta' && (
              <motion.div
                key="cta"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center gap-8"
              >
                <p
                  className="text-lg text-orange-200/50 font-light tracking-wide"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Prête à découvrir ?
                </p>
                <motion.button
                  onClick={handleEnter}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-10 py-4 rounded-full overflow-hidden cursor-pointer"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 transition-all duration-300 group-hover:from-orange-500 group-hover:to-amber-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
                  <span className="relative text-white font-medium text-lg tracking-wider">
                    Entrer ✦
                  </span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}