import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

export default function FinaleSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [exploded, setExploded] = useState(false);
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    angle: number;
    velocity: number;
  }>>([]);

  const handleExplode = useCallback(() => {
    if (exploded) return;
    setExploded(true);

    const newParticles = Array.from({ length: 120 }, (_, i) => ({
      id: i,
      x: 0,
      y: 0,
      size: Math.random() * 6 + 2,
      color: [
        '#f97316', '#fb923c', '#fbbf24', '#f59e0b',
        '#fed7aa', '#ffedd5', '#ea580c', '#ffffff',
      ][Math.floor(Math.random() * 8)],
      angle: (Math.PI * 2 * i) / 120 + (Math.random() - 0.5) * 0.5,
      velocity: Math.random() * 400 + 150,
    }));
    setParticles(newParticles);
  }, [exploded]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
    >
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(249,115,22,0.12) 0%, rgba(251,191,36,0.05) 40%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* Particles container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: '50%',
              top: '50%',
              width: p.size,
              height: p.size,
              background: p.color,
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos(p.angle) * p.velocity,
              y: Math.sin(p.angle) * p.velocity,
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 2,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl">
        {/* Heart animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: 'backOut' }}
          className="text-6xl md:text-8xl mb-8"
        >
          🧡
        </motion.div>

        {/* Main message */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-6xl font-bold mb-8"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span className="text-gradient">Merci d'être toi, Angie.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.9, ease: 'easeOut' }}
          className="text-lg md:text-xl text-orange-100/50 font-light leading-relaxed mb-4"
        >
          Tu es cette personne rare qui transforme chaque moment ordinaire
          en quelque chose d'extraordinaire. Merci pour les fous rires,
          les délires improvisés, et cette connexion qu'on n'a pas eu besoin de prévoir.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.1, ease: 'easeOut' }}
          className="text-base md:text-lg text-orange-100/35 font-light leading-relaxed mb-12 italic"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          « Les meilleures amitiés, c'est celles où on peut être complètement fou
          ensemble sans se juger. » 🌟
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.button
            onClick={handleExplode}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 rounded-full overflow-hidden"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <div
              className={`absolute inset-0 transition-all duration-500 ${
                exploded
                  ? 'bg-gradient-to-r from-amber-500 to-orange-400'
                  : 'bg-gradient-to-r from-orange-600 to-orange-500 group-hover:from-orange-500 group-hover:to-amber-500'
              }`}
            />
            <span className="relative text-white font-medium text-lg tracking-wider">
              {exploded ? '🧡 Pour toujours !' : 'Touche pour la magie ✨'}
            </span>
          </motion.button>
        </motion.div>

        {/* Signature */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 2 }}
          className="mt-16 text-sm text-orange-300/20 tracking-widest"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          FAIT AVEC 🧡 POUR ANGIE
        </motion.p>
      </div>
    </section>
  );
}
