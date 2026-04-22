import { useState, useRef, useEffect } from 'react';

export default function AudioToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/audio/chanson-angie.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      audioRef.current?.pause();
    };
  }, []);

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
    <button
      onClick={toggle}
      className={`fixed top-6 right-6 z-50 w-12 h-12 rounded-full border backdrop-blur-md transition-all duration-500 flex items-center justify-center group ${
        playing
          ? 'border-orange-400/50 bg-orange-500/10 shadow-[0_0_20px_rgba(234,88,12,0.3)]'
          : 'border-white/10 bg-white/5 hover:border-orange-400/30'
      }`}
      aria-label="Musique"
    >
      {playing ? (
        <span className="text-orange-300 text-lg">🎵</span>
      ) : (
        <span className="text-white/40 text-lg group-hover:text-orange-300/60 transition-colors">🎶</span>
      )}
    </button>
  );
}