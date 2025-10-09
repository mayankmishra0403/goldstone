'use client';

import { useEffect, useRef, useState, memo } from 'react';
import { useInView } from 'framer-motion';

interface CountUpNumberProps {
  value: number;
  duration?: number;
  suffix?: string;
}

const CountUpNumber = memo(function CountUpNumber({ 
  value, 
  duration = 2, 
  suffix = '' 
}: CountUpNumberProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * value));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
});

export default CountUpNumber;