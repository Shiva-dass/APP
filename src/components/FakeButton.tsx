import React, { useState } from 'react';
import { useAntiUX } from '../hooks/useAntiUX';
import { playSound } from '../utils/audio';

interface FakeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  evasive?: boolean;
  fakeSuccessMessage?: string;
  mutationText?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  onFakeClick?: () => void;
}

export const FakeButton: React.FC<FakeButtonProps> = ({
  children,
  evasive = false,
  fakeSuccessMessage = 'Action completed successfully.',
  mutationText,
  variant = 'primary',
  onFakeClick,
  className = '',
  onClick,
  ...props
}) => {
  const { config, recordInteraction, addToast } = useAntiUX();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [escapes, setEscapes] = useState(0);
  const [displayText, setDisplayText] = useState<React.ReactNode>(children);
  const [isFakeLoading, setIsFakeLoading] = useState(false);

  const handleMouseEnter = () => {
    if (config.normalMode) return;

    // Mutation of text at the last second (Section 7)
    if (mutationText && Math.random() < 0.4) {
      setDisplayText(mutationText);
    }

    // Evasive dodging behavior (Section 7)
    if (evasive && config.buttonMovement && escapes < 3) {
      setEscapes((prev) => prev + 1);
      const angle = Math.random() * Math.PI * 2;
      const dist = 75;
      setOffset({ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist });
      playSound('dodge');
      recordInteraction('button_ignored', 7);

      if (escapes === 2) {
        setTimeout(() => setOffset({ x: 0, y: 0 }), 1500);
      }
    }
  };

  const handleMouseLeave = () => {
    if (mutationText) {
      setDisplayText(children);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (config.normalMode) {
      if (onClick) onClick(e);
      return;
    }

    playSound('click');
    setIsFakeLoading(true);

    setTimeout(() => {
      setIsFakeLoading(false);
      recordInteraction('button_ignored', 5);
      addToast(fakeSuccessMessage, 'success');
      if (onFakeClick) onFakeClick();
    }, 600);
  };

  const variantStyles = {
    primary: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700',
    danger: 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/25',
    ghost: 'bg-transparent hover:bg-slate-800 text-slate-300',
  };

  return (
    <button
      {...props}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: 'transform 0.12s cubic-bezier(0.1, 0.9, 0.2, 1)',
      }}
      className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors flex items-center justify-center gap-2 select-none ${variantStyles[variant]} ${className}`}
    >
      {isFakeLoading && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
      <span>{displayText}</span>
    </button>
  );
};
