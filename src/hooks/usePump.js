import { useState, useEffect } from 'react';
import { PUMP_INITIAL_STATE } from '../utils/constants';

export const usePump = () => {
  const [pump, setPump] = useState(PUMP_INITIAL_STATE);

  useEffect(() => {
    const interval = setInterval(() => {
      setPump(prev => ({
        ...prev,
        waterLevel: prev.isOn 
          ? Math.min(100, prev.waterLevel + Math.random() * 2)
          : Math.max(0, prev.waterLevel - Math.random() * 1),
        pressure: prev.isOn ? 2.5 + Math.random() * 0.5 : 0,
        flowRate: prev.isOn ? 12 + Math.random() * 3 : 0
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [pump.isOn]);

  const togglePump = () => {
    setPump(prev => ({ ...prev, isOn: !prev.isOn }));
  };

  return { pump, togglePump };
};