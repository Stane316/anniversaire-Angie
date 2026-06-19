import { useEffect, useRef } from 'react';

interface Heart {
  x: number;
  y: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  swayOffset: number;
  swaySpeed: number;
}

const COLORS = [
  'rgba(249, 115, 22, 0.5)',   // orange-500
  'rgba(251, 146, 60, 0.45)',  // orange-400
  'rgba(251, 191, 36, 0.4)',   // gold-400
  'rgba(254, 215, 170, 0.35)', // orange-200
  'rgba(253, 186, 116, 0.4)',  // orange-300
];

const HEART_PATH = 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';

export default function FloatingHearts({ count = 28 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ajouter dans le useEffect après le setup initial :
    const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
               if (!animId) animId = requestAnimationFrame(animate);
            } else {
              cancelAnimationFrame(animId);
              animId = 0;
            }
         });
       },
       { threshold: 0 }
    );
    observer.observe(canvas);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create hearts distributed across the full page height
    const hearts: Heart[] = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vy: -(0.15 + Math.random() * 0.4),
      size: 12 + Math.random() * 28,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.6,
      opacity: 0.3 + Math.random() * 0.4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      swayOffset: Math.random() * Math.PI * 2,
      swaySpeed: 0.005 + Math.random() * 0.01,
    }));

    const drawHeart = (h: Heart, time: number) => {
      const sway = Math.sin(time * h.swaySpeed + h.swayOffset) * 30;
      ctx.save();
      ctx.translate(h.x + sway, h.y);
      ctx.rotate((h.rotation * Math.PI) / 180);
      ctx.scale(h.size / 24, h.size / 24);
      ctx.fillStyle = h.color;
      ctx.shadowColor = h.color;
      ctx.shadowBlur = 8;
      const path = new Path2D(HEART_PATH);
      ctx.fill(path);
      ctx.restore();
    };

    let animId: number;
    const startTime = performance.now();

    const animate = (now: number) => {
      const time = now - startTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      hearts.forEach((heart) => {
        heart.y += heart.vy;
        heart.rotation += heart.rotationSpeed;

        // Wrap around (when heart goes above viewport, recycle at bottom)
        if (heart.y < -60) {
          heart.y = canvas.height + 60;
          heart.x = Math.random() * canvas.width;
        }

        drawHeart(heart, time);
      });

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
}