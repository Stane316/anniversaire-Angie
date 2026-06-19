import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AudioToggle() {
  const [playing, setPlaying] = useState(false);
  const [bars, setBars] = useState<number[]>([0.3, 0.5, 0.4, 0.6, 0.35]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/audio/chanson-angie.mpeg');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      audioRef.current?.pause();
    };
  }, []);

  // Animate bars when playing (fake visualizer, smoothly)
  useEffect(() => {
    if (!playing) {
      setBars([0.2, 0.2, 0.2, 0.2, 0.2]);
      return;
    }
    const interval = setInterval(() => {
      setBars((prev) =>
        prev.map(() => 0.25 + Math.random() * 0.7)
      );
    }, 130);
    return () => clearInterval(interval);
  }, [playing]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  return (
    <motion.button
      onClick={toggle}
      layout
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-6 right-6 z-50 h-12 rounded-full border backdrop-blur-md flex items-center overflow-hidden group ${
        playing
          ? 'border-orange-400/50 bg-orange-500/10 shadow-[0_0_25px_rgba(234,88,12,0.4)] px-4 gap-3'
          : 'border-white/10 bg-white/5 hover:border-orange-400/30 w-12 justify-center'
      }`}
      aria-label={playing ? 'Couper la musique' : 'Jouer la musique'}
    >
      {/* Audio visualizer bars (visible when playing) */}
      <AnimatePresence>
        {playing && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-end gap-1 h-7 overflow-hidden"
          >
            {bars.map((h, i) => (
              <motion.div
                key={i}
                animate={{ height: `${h * 100}%` }}
                transition={{ duration: 0.12, ease: 'easeOut' }}
                className="w-1 bg-gradient-to-t from-orange-500 to-amber-300 rounded-full"
                style={{
                  height: `${h * 100}%`,
                  boxShadow: '0 0 4px rgba(249, 115, 22, 0.6)',
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon */}
      <motion.span
        layout
        className={`text-lg flex items-center justify-center ${
          playing
            ? 'text-orange-300'
            : 'text-white/40 group-hover:text-orange-300/60'
        } transition-colors`}
      >
        {playing ? '🎵' : '🎶'}
      </motion.span>
    </motion.button>
  );
}