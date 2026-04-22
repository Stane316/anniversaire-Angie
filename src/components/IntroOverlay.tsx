import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Phase = 'text1' | 'text2' | 'cta' | 'exiting';

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
    setPhase('exiting');
    setTimeout(onEnter, 1400);
  };

  return (
    <AnimatePresence>
      {phase !== 'exiting' ? (
        <motion.div
          key="overlay"
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
          exit={{
            clipPath: 'circle(0% at 50% 50%)',
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Background ambient glow */}
          <div className="absolute inset-0 overflow-hidden">
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
                    className="group relative px-10 py-4 rounded-full overflow-hidden"
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
      ) : (
        <motion.div
          key="exiting"
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.p
            className="text-2xl md:text-3xl text-orange-300/80 font-light"
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            C'est parti… 🧡
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
