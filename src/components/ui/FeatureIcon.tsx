'use client';

import { Hotel, UtensilsCrossed, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeatureIconProps {
  iconName: 'hotel' | 'utensils' | 'sparkles';
  gradient?: string;
}

export default function FeatureIcon({ iconName, gradient = 'from-blue-600 to-purple-600' }: FeatureIconProps) {
  const icons = {
    hotel: Hotel,
    utensils: UtensilsCrossed,
    sparkles: Sparkles
  };

  const Icon = icons[iconName];

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 5 }}
      className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shadow-2xl`}
    >
      <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
    </motion.div>
  );
}