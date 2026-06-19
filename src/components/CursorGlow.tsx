import { useEffect, useState, useCallback, useRef } from 'react';

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [clicking, setClicking] = useState(false);
  const animFrameRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });

  const handleMove = useCallback((e: MouseEvent) => {
    targetRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseDown = useCallback(() => setClicking(true), []);
  const handleMouseUp = useCallback(() => setClicking(false), []);

  useEffect(() => {
    // Smooth follow using requestAnimationFrame
    const animate = () => {
      setPos((prev) => {
        const dx = targetRef.current.x - prev.x;
        const dy = targetRef.current.y - prev.y;
        return {
          x: prev.x + dx * 0.35,
          y: prev.y + dy * 0.35,
        };
      });
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [handleMove, handleMouseDown, handleMouseUp]);

  return (
    <>
      {/* Large outer glow */}
      <div
        className="fixed pointer-events-none z-[9997]"
        style={{
          left: pos.x - 250,
          top: pos.y - 250,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249,115,22,0.10) 0%, rgba(249,115,22,0.03) 40%, transparent 70%)',
          transition: 'opacity 0.3s ease',
        }}
      />
      {/* Click ring */}
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: pos.x - 16,
          top: pos.y - 16,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1.5px solid rgba(249, 115, 22, 0.6)',
          transform: clicking ? 'scale(0.6)' : 'scale(1)',
          opacity: 0.7,
          transition: 'transform 0.15s ease, border-color 0.2s ease',
        }}
      />
      {/* Center dot */}
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: pos.x - 5,
          top: pos.y - 5,
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: '#fb923c',
          boxShadow: '0 0 10px rgba(251, 146, 60, 0.8), 0 0 20px rgba(249, 115, 22, 0.4)',
          transform: clicking ? 'scale(0.5)' : 'scale(1)',
          transition: 'transform 0.1s ease',
        }}
      />
    </>
  );
}