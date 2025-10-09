'use client';

import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import FloatingCard from '@/components/ui/FloatingCard';
import { Clock, Users, CreditCard, Award } from 'lucide-react';

export default function FoodCourtPage() {
  return (
    <div className="min-h-screen bg-white pt-24">
      <section className="relative h-[40vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1920&q=80" 
            alt="Food Court" 
            fill 
            className="object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/60" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center text-center">
          <AnimatedSection>
            <h1 className="font-serif text-6xl font-light text-white mb-4">
              Food <span className="font-bold">Court</span>
            </h1>
            <p className="text-xl text-white/90 font-light">
              Budget-friendly dining with special student offers
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Student Special Banner */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 rounded-lg mb-12">
              <h2 className="text-3xl font-bold mb-4">🎓 Student Special!</h2>
              <p className="text-xl mb-4">Show your valid student ID and get 20% OFF on all items</p>
              <p className="text-sm opacity-90">* Valid for dine-in only. Cannot be combined with other offers.</p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {[
                { icon: Clock, title: 'Open All Day', desc: '8 AM - 11 PM' },
                { icon: Users, title: 'Group Friendly', desc: 'Large seating area' },
                { icon: CreditCard, title: 'All Payments', desc: 'Cash, Card, UPI' },
                { icon: Award, title: 'Value Meals', desc: 'Starting ₹99' }
              ].map((item, i) => (
                <FloatingCard key={i} delay={i * 0.1}>
                  <div className="bg-gray-50 p-6 text-center">
                    <item.icon className="w-8 h-8 mx-auto mb-3 text-amber-600" />
                    <h3 className="font-medium mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </FloatingCard>
              ))}
            </div>

            {/* Menu Categories */}
            <h2 className="font-serif text-3xl mb-8">Popular Items</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border p-6">
                <h3 className="font-medium text-xl mb-4 text-amber-900">Quick Bites</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Sandwich Combo</span>
                    <span className="font-medium">₹99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Burger + Fries</span>
                    <span className="font-medium">₹149</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pizza Slice</span>
                    <span className="font-medium">₹89</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pasta Bowl</span>
                    <span className="font-medium">₹129</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border p-6">
                <h3 className="font-medium text-xl mb-4 text-amber-900">Indian Meals</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Thali Special</span>
                    <span className="font-medium">₹159</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Biryani</span>
                    <span className="font-medium">₹179</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chole Bhature</span>
                    <span className="font-medium">₹99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dosa Platter</span>
                    <span className="font-medium">₹119</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}