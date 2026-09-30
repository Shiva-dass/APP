import { useState, useCallback } from 'react';
import { AntiUX } from '../engine/AntiUXEngine';

export function useFakeLoading(onComplete?: (success: boolean) => void) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');

  const startFakeLoading = useCallback((actionName = 'Processing') => {
    setIsLoading(true);
    setProgress(0);
    setStatusText(`${actionName}... 0%`);

    const milestones = [
      { p: 25, t: 'Allocating synergy matrices... 25%', delay: 400 },
      { p: 50, t: 'Consulting consensus ledger... 50%', delay: 900 },
      { p: 75, t: 'Finalizing quantum handshakes... 75%', delay: 1400 },
      { p: 99, t: 'Almost done... 99%', delay: 2000 },
      { p: 98, t: 'Re-verifying parameters... 98%', delay: 2700 },
      { p: 99, t: 'One moment... 99%', delay: 3400 },
      { p: 97, t: 'Optimizing packet buffers... 97%', delay: 4100 },
      { p: 99, t: 'Almost there... 99%', delay: 4800 },
    ];

    milestones.forEach(({ p, t, delay }) => {
      setTimeout(() => {
        setProgress(p);
        setStatusText(t);
      }, delay);
    });

    // Final failure / stall
    setTimeout(() => {
      setStatusText('Something went approximately wrong.');
      AntiUX.recordInteraction('fake_error', 10);
      AntiUX.addToast('Action completed: Result was quietly discarded.', 'error');
      setTimeout(() => {
        setIsLoading(false);
        if (onComplete) onComplete(false);
      }, 1500);
    }, 5800);
  }, [onComplete]);

  return {
    isLoading,
    progress,
    statusText,
    startFakeLoading,
  };
}
