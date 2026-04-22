import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Quality {
  emoji: string;
  title: string;
  description: string;
}

interface QualitiesSectionProps {
  qualities: Quality[];
}

export default function QualitiesSection({ qualities }: QualitiesSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="relative py-24 md:py-40 px-6 md:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
      {/* Section header */}
      <div className="text-center mb-20 md:mb-28">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-xs tracking-[0.4em] uppercase text-orange-400/40 mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          ✦ Ses super-pouvoirs
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-3xl md:text-5xl font-bold text-gradient"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Ce qui rend Angie unique
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="orange-line w-24 mx-auto mt-6"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {qualities.map((q, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.2 + i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="glass-card rounded-2xl p-8 group relative overflow-hidden"
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'radial-gradient(circle at 50% 0%, rgba(249,115,22,0.08) 0%, transparent 60%)',
              }}
            />

            {/* Emoji */}
            <div className="text-4xl mb-5">{q.emoji}</div>

            {/* Title */}
            <h3
              className="text-xl font-bold text-orange-100/90 mb-3 group-hover:text-orange-200 transition-colors duration-300"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {q.title}
            </h3>

            {/* Description */}
            <p className="text-orange-100/35 text-sm leading-relaxed font-light">
              {q.description}
            </p>

            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-16 h-16">
              <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-orange-500/0 group-hover:bg-orange-500/30 transition-all duration-500" />
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
}
