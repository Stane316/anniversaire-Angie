import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

interface Message {
  text: string;
  author: string;
}

interface MessageSectionProps {
  messages: Message[];
}

export default function MessageSection({ messages }: MessageSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="relative py-24 md:py-40 px-6 md:px-8 overflow-hidden">
      {/* Section header */}
      <div className="text-center mb-20 md:mb-28">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-xs tracking-[0.4em] uppercase text-orange-400/40 mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          ✦ Mots du cœur
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-3xl md:text-5xl font-bold text-gradient"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Ce que je voulais te dire
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="orange-line w-24 mx-auto mt-6"
        />
      </div>

      {/* Messages */}
      <div className="max-w-3xl mx-auto space-y-12">
        {messages.map((msg, i) => (
          <TypewriterMessage key={i} message={msg.text} author={msg.author} index={i} isInView={isInView} />
        ))}
      </div>
    </section>
  );
}

function TypewriterMessage({
  message,
  author,
  index,
  isInView,
}: {
  message: string;
  author: string;
  index: number;
  isInView: boolean;
}) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (isInView && !started) {
      const timeout = setTimeout(() => {
        setStarted(true);
      }, 300 + index * 600);
      return () => clearTimeout(timeout);
    }
  }, [isInView, started, index]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= message.length) {
        setDisplayed(message.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [started, message]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative pl-8 md:pl-12"
    >
      {/* Quote mark */}
      <span
        className="absolute left-0 top-0 text-4xl md:text-5xl text-orange-500/15 font-serif select-none"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        "
      </span>

      {/* Message text */}
      <p className="text-lg md:text-xl text-orange-100/60 leading-relaxed font-light min-h-[3rem]">
        {displayed}
        {started && displayed.length < message.length && (
          <span className="inline-block w-0.5 h-5 bg-orange-400/60 ml-0.5 animate-pulse" />
        )}
      </p>

      {/* Author */}
      {started && displayed.length >= message.length && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-4 text-sm text-orange-400/30 italic"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          — {author}
        </motion.p>
      )}
    </motion.div>
  );
}
