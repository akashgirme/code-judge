'use client';
import React, { useState, useEffect } from 'react';

interface TypingEffectProps {
  children: string;
  speed?: number;
  onComplete?: () => void;
  hideCaret?: boolean;
  customCaret?: string;
}

export const TypingEffect: React.FC<TypingEffectProps> = ({
  children,
  speed = 100,
  onComplete,
  hideCaret = false,
  customCaret,
}) => {
  const [displayedText, setDisplayedText] = useState<string>('');

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    timeoutId = setTimeout(() => {
      const typeText = () => {
        if (children.length === displayedText.length) {
          if (onComplete) onComplete();
          return;
        }
        timeoutId = setTimeout(() => {
          setDisplayedText(
            (prevText) => prevText + children.charAt(prevText.length)
          );
          typeText();
        }, speed);
      };
      typeText();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [children, speed, displayedText, onComplete]);

  return (
    <span className="inline-block text-inherit">
      {displayedText}
      {!hideCaret && (
        <span
          style={{ animationDuration: '1s' }}
          className="animate-caret-blink"
        >
          {customCaret ?? ' |'}
        </span>
      )}
    </span>
  );
};
