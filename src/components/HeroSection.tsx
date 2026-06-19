import { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const POLAROID_PHOTOS = [
  { src: '/images/photo-hero.jpeg', alt: 'Angie', rot: -8, x: -180, y: -60 },
  { src: '/images/selfie1.jpeg', alt: 'Selfie', rot: 6, x: 200, y: -40 },
  { src: '/images/mode-star.jpeg', alt: 'Mode star', rot: -4, x: -220, y: 80 },
  { src: '/images/dance-mode.jpeg', alt: 'Dance', rot: 7, x: 220, y: 90 },
];

const MEETING_DATE = new Date('2024-06-12T00:00:00');

function useTimeSinceMeeting() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const diff = now.getTime() - MEETING_DATE.getTime();
      const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
      const hours = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
      const minutes = Math.max(0, Math.floor((diff / (1000 * 60)) % 60));
      const seconds = Math.max(0, Math.floor((diff / 1000) % 60));
      setTime({ days, hours, minutes, seconds });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [secretOpen, setSecretOpen] = useState(false);
  const time = useTimeSinceMeeting();

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
    >
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-[15%] left-[10%] w-[600px] h-[600px] rounded-full animate-breathe"
          style={{
            background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-[15%] right-[5%] w-[500px] h-[500px] rounded-full animate-breathe"
          style={{
            background: 'radial-gradient(circle, rgba(251,191,36,0.10) 0%, transparent 70%)',
            filter: 'blur(80px)',
            animationDelay: '2s',
          }}
        />
        <div
          className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full animate-breathe"
          style={{
            background: 'radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 60%)',
            filter: 'blur(100px)',
            animationDelay: '4s',
          }}
        />
      </div>

      {/* Drifting golden sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 24 }).map((_, i) => {
          const left = Math.random() * 100;
          const delay = Math.random() * 8;
          const duration = 8 + Math.random() * 6;
          const size = 3 + Math.random() * 6;
          return (
            <div
              key={i}
              className="absolute sparkle-star"
              style={{
                left: `${left}%`,
                bottom: '-20px',
                width: `${size}px`,
                height: `${size}px`,
                animation: `drift-up ${duration}s ease-in-out ${delay}s infinite`,
                opacity: 0.6,
              }}
            />
          );
        })}
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(249,115,22,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(249,115,22,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Polaroid photos */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          transform: `translate(${mousePos.x * 0.15}px, ${mousePos.y * 0.15}px)`,
          transition: 'transform 0.4s ease-out',
        }}
      >
        {POLAROID_PHOTOS.map((photo, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.6, rotate: photo.rot * 2 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: photo.rot } : {}}
            transition={{
              duration: 1.2,
              delay: 1.0 + i * 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="hidden md:block absolute polaroid"
            style={
              {
                left: `calc(50% + ${photo.x}px)`,
                top: `calc(50% + ${photo.y}px)`,
                transform: `translate(-50%, -50%) rotate(${photo.rot}deg)`,
                width: '180px',
                '--rot': `${photo.rot}deg`,
                animation: 'photo-float 5s ease-in-out infinite',
                animationDelay: `${i * 0.6}s`,
              } as React.CSSProperties
            }
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-44 object-cover"
              loading="lazy"
            />
            <p
              className="text-center text-xs mt-2 text-black/60 font-medium"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              {photo.alt}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div
        className="relative z-10 flex flex-col items-center px-4 text-center"
        style={{
          transform: `translate(${mousePos.x * 0.25}px, ${mousePos.y * 0.25}px)`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        {/* Top subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-4"
        >
          <p
            className="text-xs md:text-sm tracking-[0.5em] uppercase text-orange-300/60 font-light"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            ✦ 2 ans qu'on se connaît ✦
          </p>
        </motion.div>

        {/* Date pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-[10px] md:text-xs tracking-[0.3em] uppercase text-orange-200/80 border border-orange-500/30 bg-orange-500/5 backdrop-blur-sm"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            📅 Depuis le 12 juin 2024 — pour toujours
          </span>
        </motion.div>

        {/* Calligraphic name with CLICKABLE ❦ (secret trigger) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative my-2"
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] md:w-[700px] md:h-[300px] pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse, rgba(251,191,36,0.35) 0%, rgba(249,115,22,0.2) 40%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          {/* ✦ CLICKABLE ORNAMENT — secret trigger ✦ */}
          <motion.button
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 1.6 }}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSecretOpen(true)}
            className="text-orange-400/60 hover:text-orange-300 text-2xl md:text-4xl mb-2 transition-all duration-300 cursor-pointer"
            style={{ fontFamily: "'Great Vibes', cursive" }}
            aria-label="Message secret"
          >
            ❦
          </motion.button>

          <h1
            className="text-shimmer font-bold leading-none select-none"
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: 'clamp(5rem, 15vw, 12rem)',
              fontWeight: 400,
              letterSpacing: '0.02em',
            }}
          >
            Angie
          </h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 1.8 }}
            className="text-orange-400/50 text-2xl md:text-3xl mt-2"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            ❦
          </motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-8 max-w-xl mx-auto"
        >
          <p
            className="text-lg md:text-2xl text-orange-100/70 font-light italic leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
          >
            Bellange pour le monde entier,
            <br />
            <span className="text-orange-300/90 not-italic font-semibold">Angie</span> pour moi —
            <br />
            <span className="text-base md:text-lg text-orange-200/50">
              depuis le 12 juin 2024, et pour toujours.
            </span>
          </p>
        </motion.div>

        {/* Live counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.7 }}
          className="mt-12"
        >
          <p
            className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-orange-400/40 mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            ✦ Le compteur de notre histoire ✦
          </p>

          <div className="flex items-center justify-center gap-3 md:gap-6">
            <CounterCell value={time.days} label="jours" isInView={isInView} delay={1.8} />
            <span className="text-orange-400/30 text-xl md:text-3xl font-light">·</span>
            <CounterCell value={time.hours} label="heures" isInView={isInView} delay={1.95} />
            <span className="text-orange-400/30 text-xl md:text-3xl font-light">·</span>
            <CounterCell value={time.minutes} label="minutes" isInView={isInView} delay={2.1} />
            <span className="text-orange-400/30 text-xl md:text-3xl font-light hidden md:inline">·</span>
            <CounterCell
              value={time.seconds}
              label="secondes"
              isInView={isInView}
              delay={2.25}
              className="hidden md:flex"
            />
          </div>

          <p
            className="mt-6 text-xs md:text-sm text-orange-300/40 italic"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            depuis le 12 juin 2024 — et chaque seconde compte 🧡
          </p>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 2.5 }}
          className="mt-12 max-w-md"
        >
          <p
            className="text-xs md:text-sm tracking-[0.3em] uppercase text-orange-400/40 font-light"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            « Les âmes sœurs ne se choisissent pas,
            <br />
            elles se reconnaissent. »
          </p>
        </motion.div>

        {/* Secret hint (only visible after scroll past hero) */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 4 }}
          className="mt-6 text-[10px] tracking-[0.4em] uppercase text-orange-300/20 italic"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          (psst… essaie de cliquer sur le ❦)
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 2.8 }}
          className="mt-10 md:mt-14 flex flex-col items-center gap-3"
        >
          <span
            className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-orange-400/40"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Défile pour revivre notre histoire
          </span>
          <motion.div
            className="w-px h-16 bg-gradient-to-b from-orange-500/60 via-orange-400/30 to-transparent"
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>

      {/* ═══ SECRET MESSAGE MODAL ═══ */}
      <AnimatePresence>
        {secretOpen && <SecretMessageModal onClose={() => setSecretOpen(false)} />}
      </AnimatePresence>
    </section>
  );
}

// ═══════════════════════════════════════════════
// Counter cell (live updating)
// ═══════════════════════════════════════════════
function CounterCell({
  value,
  label,
  isInView,
  delay,
  className = '',
}: {
  value: number;
  label: string;
  isInView: boolean;
  delay: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={`flex flex-col items-center ${className}`}
    >
      <div
        className="text-3xl md:text-5xl font-bold text-shimmer leading-none tabular-nums"
        style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}
      >
        {value.toString().padStart(2, '0')}
      </div>
      <div
        className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-orange-300/50 mt-2"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {label}
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════
// Secret Message Modal
// ═══════════════════════════════════════════════
function SecretMessageModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-6 cursor-pointer"
    >
      {/* Sparkles around modal */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute sparkle-star animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.5,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 30 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-2xl w-full p-8 md:p-14 rounded-3xl"
        style={{
          background:
            'radial-gradient(circle at top, rgba(249,115,22,0.15) 0%, rgba(20,10,5,0.95) 60%)',
          border: '1px solid rgba(249, 115, 22, 0.3)',
          boxShadow:
            '0 0 80px rgba(249, 115, 22, 0.3), inset 0 0 40px rgba(249, 115, 22, 0.05)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-orange-500/20 backdrop-blur-sm border border-orange-400/40 flex items-center justify-center text-orange-200 hover:bg-orange-500/40 transition-all"
          aria-label="Fermer"
        >
          ✕
        </button>

        <div className="text-center">
          {/* Pulsing heart */}
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-5xl md:text-6xl mb-6"
          >
            🧡
          </motion.div>

          {/* Title */}
          <p
            className="text-shimmer text-3xl md:text-5xl mb-6"
            style={{ fontFamily: "'Great Vibes', cursive", fontWeight: 400 }}
          >
            Tu as trouvé un secret
          </p>

          {/* Body */}
          <p
            className="text-orange-100/80 text-lg md:text-xl leading-relaxed italic mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Ce site est parsemé de petits secrets
            <br />
            que j'ai cachés pour toi.
          </p>

          <p
            className="text-orange-100/70 text-base md:text-lg leading-relaxed italic"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Et tu viens d'en trouver le premier.
            <br />
            <br />
            <span className="text-orange-300/90 not-italic">
              Il y en a d'autres, ailleurs dans ce site.
              <br />
              À toi de les trouver. 🧡
            </span>
          </p>

          {/* Footer */}
          <p
            className="mt-8 text-[10px] tracking-[0.4em] uppercase text-orange-400/30"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            ✦ Secret n°1 / ? ✦
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}