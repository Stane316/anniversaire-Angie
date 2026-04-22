import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface StorySectionProps {
  emoji: string;
  label: string;
  title: string;
  text: string;
  date?: string;
  index: number;
}

export default function StorySection({ emoji, label, title, text, date, index }: StorySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-center gap-8 md:gap-16 min-h-[70vh] px-6 md:px-8 py-16 max-w-6xl mx-auto"
    >
      {/* Timeline line */}
      <div className="absolute left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-orange-500/10 to-transparent hidden md:block" />

      {/* Timeline dot */}
      <div className="absolute left-[50%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-orange-500/30 hidden md:block">
        <div className="absolute inset-0 rounded-full bg-orange-500/20 animate-ping" style={{ animationDuration: '3s' }} />
      </div>

      {/* Content */}
      <div
        className={`w-full md:w-[45%] ${isEven ? 'md:ml-auto md:pl-12' : 'md:mr-auto md:pr-12'}`}
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-2xl md:text-3xl">{emoji}</span>
          <span
            className="text-xs tracking-[0.3em] uppercase text-orange-400/40 font-medium"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {label}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-2xl md:text-4xl font-bold mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span className="text-gradient">{title}</span>
        </motion.h2>

        {/* Date */}
        {date && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={isInView ? { opacity: 1, width: 'auto' } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-4"
          >
            <span
              className="inline-block px-3 py-1 rounded-full text-xs tracking-wider text-orange-300/60 border border-orange-500/20 bg-orange-500/5"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              📅 {date}
            </span>
          </motion.div>
        )}

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, originX: isEven ? 0 : 1 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="orange-line w-16 mb-6"
        />

        {/* Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-orange-100/50 text-base md:text-lg leading-relaxed font-light max-w-lg"
        >
          {text}
        </motion.p>
      </div>
    </motion.div>
  );
}
