'use client';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { ScrollRightBtn } from './scroll-right-btn';
import { ScrollLeftBtn } from './scroll-left-btn';

interface PillsContainerProps {
  children: ReactNode;
}

const DEFAULT_TRANSLATE_AMT = 200;

export const PillsContainer: React.FC<PillsContainerProps> = ({ children }) => {
  const [isLeftVisible, setIsLeftVisible] = useState<boolean>(true);
  const [isRightVisible, setIsRightVisible] = useState<boolean>(true);
  const [translate, setTranslate] = useState<number>(0);
  const PillContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (PillContainerRef.current === null) return;
    const observer = new ResizeObserver((entries) => {
      const container = entries[0]?.target;
      if (container === null) return;
      setIsLeftVisible(translate > 0);
      setIsRightVisible(
        translate + container.clientWidth < container.scrollWidth
      );
    });
    observer.observe(PillContainerRef.current);
    return () => observer.disconnect();
  }, [translate]);

  return (
    <div className="w-max max-w-full lg:max-w-screen-lg z-10  sticky top-24">
      <div
        ref={PillContainerRef}
        className="overflow-hidden w-full bg-background p-2 lg:shadow-small lg:rounded-r-full lg:rounded-l-full mx-auto"
      >
        <div
          className="flex items-center whitespace-nowrap gap-3 transition-transform w-max"
          style={{ transform: `translateX(-${translate}px)` }}
        >
          {children}
        </div>
        {isLeftVisible && (
          <ScrollLeftBtn
            onClick={() =>
              setTranslate((prev) => Math.max(prev - DEFAULT_TRANSLATE_AMT, 0))
            }
          />
        )}
        {isRightVisible && (
          <ScrollRightBtn
            onClick={() => {
              if (PillContainerRef.current) {
                const { scrollWidth, clientWidth } = PillContainerRef.current;
                setTranslate((prev) =>
                  Math.min(
                    prev + DEFAULT_TRANSLATE_AMT,
                    scrollWidth - clientWidth
                  )
                );
              }
            }}
          />
        )}
      </div>
    </div>
  );
};
