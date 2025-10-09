'use client';

import { motion } from 'framer-motion';
import { ReactNode, memo } from 'react';

interface FloatingCardProps {
  children: ReactNode;
  delay?: number;
  index?: number;
}

const FloatingCard = memo(function FloatingCard({ 
  children, 
  delay = 0,
  index = 0 
}: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 0.5,
        delay: delay || index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { 
          duration: 0.3,
          ease: "easeOut"
        }
      }}
      style={{ 
        willChange: 'transform',
        transform: 'translateZ(0)' // Force GPU
      }}
    >
      {children}
    </motion.div>
  );
});

export default FloatingCard;