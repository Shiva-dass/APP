import { useState, useEffect } from 'react';
import { AntiUX } from '../engine/AntiUXEngine';
import { PageId, AntiUXConfig, RageState, ToastItem } from '../types';

export function useAntiUX() {
  const [config, setConfig] = useState<AntiUXConfig>(AntiUX.getConfig());
  const [rageState, setRageState] = useState<RageState>(AntiUX.getRageState());
  const [currentPage, setCurrentPage] = useState<PageId>(AntiUX.getCurrentPage());
  const [toasts, setToasts] = useState<ToastItem[]>(AntiUX.getToasts());

  useEffect(() => {
    return AntiUX.subscribe(() => {
      setConfig(AntiUX.getConfig());
      setRageState(AntiUX.getRageState());
      setCurrentPage(AntiUX.getCurrentPage());
      setToasts(AntiUX.getToasts());
    });
  }, []);

  return {
    config,
    rageState,
    currentPage,
    toasts,
    navigate: (page: PageId) => AntiUX.navigate(page),
    recordInteraction: (type: 'button_ignored' | 'fake_error' | 'nav_mistake' | 'general', delta?: number) =>
      AntiUX.recordInteraction(type, delta),
    increaseRage: (delta: number) => AntiUX.increaseRage(delta),
    toggleNormalMode: () => AntiUX.toggleNormalMode(),
    updateConfig: (updates: Partial<AntiUXConfig>) => AntiUX.setConfig(updates),
    addToast: (message: string, type?: 'info' | 'warning' | 'error' | 'success') => AntiUX.addToast(message, type),
    dismissToast: (id: string) => AntiUX.dismissToast(id),
  };
}
