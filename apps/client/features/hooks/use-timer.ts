'use client';

import { useEffect, useState } from 'react';

export const useTimer = (
  defaultTimer: number
): {
  timer: number;
  isTimerActive: boolean;
  startTimer: (delay?: number) => void;
} => {
  const [timer, setTimer] = useState<number>(0);
  const isTimerActive = !!timer;
  const startTimer = (newTimer?: number) => {
    setTimer(newTimer ?? defaultTimer);
  };
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer - 1;
          if (newTimer === 0) {
            clearInterval(interval);
          }
          return newTimer;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTimerActive]);

  return { timer, isTimerActive, startTimer };
};
