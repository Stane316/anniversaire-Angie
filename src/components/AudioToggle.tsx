import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AudioToggle() {
  const [playing, setPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const toggle = () => {
    if (playing) {
      setPlaying(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    } else {
      setPlaying(true);
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      audioCtxRef.current = ctx;

      // Soft ambient chord (C major)
      const frequencies = [261.63, 329.63, 392.00, 523.25];
      const playChord = () => {
        if (!audioCtxRef.current) return;
        frequencies.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.5);
          gain.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 2);
          gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 4);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 4);
        });
      };
      playChord();
      intervalRef.current = setInterval(playChord, 5000);
    }
  };

  return (
    <motion.button
      onClick={toggle}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
      style={{
        background: playing
          ? 'rgba(249,115,22,0.2)'
          : 'rgba(255,255,255,0.05)',
        border: `1px solid ${playing ? 'rgba(249,115,22,0.3)' : 'rgba(255,255,255,0.1)'}`,
        backdropFilter: 'blur(10px)',
      }}
    >
      <AnimatePresence mode="wait">
        {playing ? (
          <motion.span
            key="on"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            className="text-orange-400 text-lg"
          >
            🔊
          </motion.span>
        ) : (
          <motion.span
            key="off"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            className="text-white/30 text-lg"
          >
            🔇
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
