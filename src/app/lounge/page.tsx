'use client';

import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import FloatingCard from '@/components/ui/FloatingCard';
import { Clock, Music, Wine, Coffee, Users, Star } from 'lucide-react';

export default function LoungePage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1920&q=80" 
            alt="Lounge Bar" 
            fill 
            className="object-cover opacity-70" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center text-center">
          <AnimatedSection>
            <h1 className="font-serif text-6xl md:text-7xl font-light text-white mb-4">
              The <span className="font-bold text-amber-400">Lounge</span>
            </h1>
            <p className="text-2xl text-white/80 font-light">
              Cocktails • Mocktails • Hookah Bar
            </p>
            <p className="text-lg text-amber-400 mt-4">Open 6 PM - 2 AM</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-4">
              Unwind in <span className="font-bold text-amber-400">Style</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Experience the perfect blend of ambiance, music, and premium beverages
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Wine,
                title: 'Premium Bar',
                desc: 'Extensive collection of spirits, wines, and craft cocktails'
              },
              {
                icon: Coffee,
                title: 'Mocktails',
                desc: 'Creative non-alcoholic beverages for every taste'
              },
              {
                icon: Music,
                title: 'Hookah Lounge',
                desc: 'Premium flavors in a relaxed atmosphere'
              }
            ].map((feature, i) => (
              <FloatingCard key={i} delay={i * 0.15}>
                <div className="bg-gray-800/50 backdrop-blur p-8 text-center border border-amber-400/20 hover:border-amber-400/50 transition-colors">
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-amber-400" strokeWidth={1.5} />
                  <h3 className="font-medium text-xl mb-3">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Highlights */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-serif text-4xl font-light">
              Signature <span className="font-bold text-amber-400">Collections</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Cocktails */}
            <FloatingCard delay={0.1}>
              <div className="bg-black/50 p-6 border border-gray-700">
                <h3 className="font-medium text-xl mb-4 text-amber-400">Classic Cocktails</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Old Fashioned</span>
                    <span className="text-amber-400">₹450</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Mojito</span>
                    <span className="text-amber-400">₹350</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Cosmopolitan</span>
                    <span className="text-amber-400">₹400</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Long Island</span>
                    <span className="text-amber-400">₹500</span>
                  </div>
                </div>
              </div>
            </FloatingCard>

            {/* Mocktails */}
            <FloatingCard delay={0.2}>
              <div className="bg-black/50 p-6 border border-gray-700">
                <h3 className="font-medium text-xl mb-4 text-amber-400">Mocktails</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Virgin Mojito</span>
                    <span className="text-amber-400">₹200</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Blue Lagoon</span>
                    <span className="text-amber-400">₹220</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Fruit Punch</span>
                    <span className="text-amber-400">₹180</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Shirley Temple</span>
                    <span className="text-amber-400">₹200</span>
                  </div>
                </div>
              </div>
            </FloatingCard>

            {/* Hookah */}
            <FloatingCard delay={0.3}>
              <div className="bg-black/50 p-6 border border-gray-700">
                <h3 className="font-medium text-xl mb-4 text-amber-400">Hookah Flavors</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Double Apple</span>
                    <span className="text-amber-400">₹500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Mint</span>
                    <span className="text-amber-400">₹500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Watermelon</span>
                    <span className="text-amber-400">₹550</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Premium Mix</span>
                    <span className="text-amber-400">₹700</span>
                  </div>
                </div>
              </div>
            </FloatingCard>
          </div>
        </div>
      </section>

      {/* House Rules */}
      <section className="py-16 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="font-serif text-2xl mb-6 text-amber-400">House Rules</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-400">
              <div>
                <Clock className="w-8 h-8 mx-auto mb-3 text-amber-400/50" />
                <p>Open Daily<br />6:00 PM - 2:00 AM</p>
              </div>
              <div>
                <Users className="w-8 h-8 mx-auto mb-3 text-amber-400/50" />
                <p>Smart Casual Dress Code<br />Age 21+ for alcohol</p>
              </div>
              <div>
                <Star className="w-8 h-8 mx-auto mb-3 text-amber-400/50" />
                <p>Reservations Recommended<br />Walk-ins subject to availability</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}