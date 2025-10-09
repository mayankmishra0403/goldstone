'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef, memo } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}

const AnimatedSection = memo(function AnimatedSection({ 
  children, 
  className = '', 
  delay = 0,
  threshold = 0.1 
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true,
    amount: threshold,
    margin: "0px 0px -100px 0px"
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ 
        duration: 0.6,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98], // Custom easing for smoothness
        type: "tween"
      }}
      className={className}
      style={{ willChange: 'transform' }} // GPU acceleration
    >
      {children}
    </motion.div>
  );
});

export default AnimatedSection;