import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const letters = 'ANGIE'.split('');

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-[20%] left-[15%] w-[500px] h-[500px] rounded-full animate-breathe"
          style={{
            background: 'radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full animate-breathe"
          style={{
            background: 'radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
            animationDelay: '2s',
          }}
        />
        <div
          className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* Photo d'Angie */}
      <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-8 flex justify-center"
      >
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-orange-500/30 shadow-[0_0_40px_rgba(234,88,12,0.2)]">
           <img
               src="/images/photo-hero.jpeg"
               alt="Angie"
               className="w-full h-full object-cover"
            />
        </div>
     </motion.div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(249,115,22,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(249,115,22,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      <div
        className="relative z-10 flex flex-col items-center px-4"
        style={{
          transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Subtitle top */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="mb-6 md:mb-10"
        >
          <p
            className="text-sm md:text-base tracking-[0.4em] uppercase text-orange-300/50 font-light"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            ✦ Une dédicace spéciale ✦
          </p>
        </motion.div>

        {/* Main title ANGIE */}
        <div className="relative">
          {/* Orbiting rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div
              className="absolute top-1/2 left-1/2 w-[340px] h-[340px] md:w-[500px] md:h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-500/5 animate-rotate-slow"
            />
            <div
              className="absolute top-1/2 left-1/2 w-[380px] h-[380px] md:w-[560px] md:h-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-400/5"
              style={{ animation: 'rotate-slow 30s linear reverse infinite' }}
            />
            {/* Orbiting dots */}
            <div
              className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-orange-400/60"
              style={{
                animation: 'orbit 12s linear infinite',
                boxShadow: '0 0 15px rgba(249,115,22,0.6)',
              }}
            />
            <div
              className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-amber-400/40"
              style={{
                animation: 'orbit-reverse 8s linear infinite',
                boxShadow: '0 0 10px rgba(251,191,36,0.4)',
              }}
            />
          </div>

          {/* Glow behind text */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px] md:w-[600px] md:h-[200px]"
            style={{
              background: 'radial-gradient(ellipse, rgba(249,115,22,0.25) 0%, transparent 70%)',
              filter: 'blur(30px)',
            }}
          />

          {/* Letters */}
          <div className="relative flex items-center justify-center">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 80, rotateX: -90 }}
                animate={isInView ? {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                } : {}}
                transition={{
                  duration: 1.2,
                  delay: 0.4 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="hero-3d-text inline-block text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] font-black leading-none tracking-tighter select-none"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  background: 'linear-gradient(180deg, #ffffff 0%, #fed7aa 35%, #f97316 65%, #f59e0b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.2, ease: 'easeOut' }}
          className="mt-8 md:mt-12 text-center"
        >
          <p
            className="text-base md:text-lg text-orange-100/40 font-light tracking-wide max-w-md mx-auto"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Bellange pour le monde entier.
            <br />
            <span className="text-orange-300/60">Angie</span> pour moi.
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 2 }}
          className="mt-16 md:mt-24 flex flex-col items-center gap-3"
        >
          <span
            className="text-xs tracking-[0.3em] uppercase text-orange-400/30"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Défile pour explorer
          </span>
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-orange-500/40 to-transparent"
            animate={{ scaleY: [1, 0.5, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
}
