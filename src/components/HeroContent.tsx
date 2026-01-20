'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.21, 0.47, 0.32, 0.98]
    }
  }
};

export default function HeroContent() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-4xl text-white"
    >
      <motion.div variants={item} className="h-1 w-20 bg-amber-500 mb-8" />
      
      <motion.h1 
        variants={item}
        className="font-serif text-7xl md:text-8xl font-light tracking-wide mb-6"
      >
        Ritam<br />
        <span className="font-bold text-amber-300">Hotel</span>
      </motion.h1>
      
      <motion.p 
        variants={item}
        className="text-xl md:text-2xl font-light text-white/90 max-w-2xl leading-relaxed mb-8"
      >
        Your premium stay in the heart of Kanpur
      </motion.p>
      
      <motion.div 
        variants={item}
        className="flex flex-col sm:flex-row gap-6"
      >
        <Link 
          href="/accommodations" 
          className="group inline-flex items-center justify-center px-10 py-4 bg-amber-600 text-white font-medium tracking-wide hover:bg-amber-700 transform hover:scale-105 transition-all duration-300"
        >
          <span>Book Your Room</span>
        </Link>
        <Link 
          href="/restaurant" 
          className="group inline-flex items-center justify-center px-10 py-4 border-2 border-white text-white font-medium tracking-wide hover:bg-white hover:text-amber-900 transform hover:scale-105 transition-all duration-300"
        >
          <span>Explore Dining</span>
        </Link>
      </motion.div>
    </motion.div>
  );
}