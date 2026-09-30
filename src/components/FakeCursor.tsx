import React, { useEffect, useState, useRef } from 'react';
import { useAntiUX } from '../hooks/useAntiUX';
import { CursorBehaviorManager } from '../engine/cursorBehavior';

export const FakeCursor: React.FC = () => {
  const { config } = useAntiUX();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const managerRef = useRef<CursorBehaviorManager | null>(null);

  if (!managerRef.current) {
    managerRef.current = new CursorBehaviorManager();
  }

  useEffect(() => {
    if (config.normalMode || !config.cursorInversion) return;

    managerRef.current?.setInversions(config.cursorInvertX, config.cursorInvertY);
    managerRef.current?.setDrift(config.cursorDrift);

    const handleMouseMove = (e: MouseEvent) => {
      managerRef.current?.updatePhysicalPosition(e.clientX, e.clientY);
    };

    let animId: number;
    const loop = () => {
      if (managerRef.current) {
        const nextPos = managerRef.current.tick();
        setPos(nextPos);
      }
      animId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [config.normalMode, config.cursorInversion, config.cursorInvertX, config.cursorInvertY, config.cursorDrift]);

  if (config.normalMode || !config.cursorInversion) {
    return null;
  }

  return (
    <div
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
      className="fixed top-0 left-0 pointer-events-none z-[999999] transition-transform duration-75 select-none"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-indigo-400 drop-shadow-md">
        <path d="M4 3L18 13L11.5 14L8.5 21L4 3Z" fill="currentColor" stroke="#000" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <span className="absolute top-5 left-4 bg-slate-900 border border-indigo-500/40 text-[9px] font-mono px-1.5 py-0.5 rounded text-indigo-300 shadow">
        offset: +14px
      </span>
    </div>
  );
};
