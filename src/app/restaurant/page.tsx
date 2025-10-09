'use client';

import Image from 'next/image';

import { useState } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import FloatingCard from '@/components/ui/FloatingCard';
import { Clock, Phone, Award, ChefHat } from 'lucide-react';

export default function RestaurantPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reservation request:', formData);
    // Add Appwrite submission logic
  };

  const menuCategories = [
    {
      name: "Starters",
      items: [
        { name: "Paneer Tikka", price: 32000, description: "Grilled cottage cheese with spices" },
        { name: "Chicken Seekh Kebab", price: 38000, description: "Minced chicken skewers" },
        { name: "Veg Manchurian", price: 28000, description: "Crispy vegetable balls in sauce" },
      ]
    },
    {
      name: "Main Course",
      items: [
        { name: "Dal Makhani", price: 42000, description: "Creamy black lentils" },
        { name: "Butter Chicken", price: 48000, description: "Tender chicken in rich gravy" },
        { name: "Biryani (Veg/Chicken)", price: 45000, description: "Aromatic rice with spices" },
        { name: "Kadhai Paneer", price: 44000, description: "Cottage cheese in spicy gravy" },
      ]
    },
    {
      name: "Breads & Rice",
      items: [
        { name: "Butter Naan", price: 8000, description: "Soft leavened bread" },
        { name: "Garlic Naan", price: 9000, description: "Naan with garlic" },
        { name: "Jeera Rice", price: 22000, description: "Cumin flavored rice" },
      ]
    },
    {
      name: "Desserts",
      items: [
        { name: "Gulab Jamun", price: 18000, description: "Sweet dumplings in syrup" },
        { name: "Rasmalai", price: 22000, description: "Cottage cheese in sweetened milk" },
        { name: "Ice Cream", price: 15000, description: "Assorted flavors" },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80"
            alt="MotiMahal Restaurant"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center text-center">
          <AnimatedSection>
            <h1 className="font-serif text-6xl md:text-7xl font-light text-white mb-4">
              MotiMahal <span className="font-bold">Restaurant</span>
            </h1>
            <p className="text-xl text-white/90 font-light">
              Premium Dining • Authentic Flavors • Luxury Service
            </p>
            <div className="flex gap-6 justify-center mt-6 text-amber-300">
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                7 AM - 11 PM
              </span>
              <span className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                +91 98765 43210
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { icon: ChefHat, title: 'Expert Chefs', desc: 'Master culinary team' },
              { icon: Award, title: 'Premium Quality', desc: 'Finest ingredients' },
              { icon: Clock, title: 'All Day Dining', desc: '7 AM to 11 PM' },
              { icon: Phone, title: 'Room Service', desc: '24/7 available' }
            ].map((item, i) => (
              <FloatingCard key={i} delay={i * 0.1}>
                <div className="text-center">
                  <item.icon className="w-10 h-10 mx-auto mb-3 text-amber-600" />
                  <h3 className="font-medium mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <div className="h-px w-12 bg-amber-900 mx-auto mb-6"></div>
            <h2 className="font-serif text-5xl font-light">Our <span className="font-bold">Menu</span></h2>
            <p className="text-gray-600 mt-4">Experience the finest in Indian and Continental cuisine</p>
          </AnimatedSection>
          
          <div className="max-w-4xl mx-auto space-y-8">
            {menuCategories.map((category, categoryIndex) => (
              <FloatingCard key={categoryIndex} delay={categoryIndex * 0.1}>
                <div className="bg-white border p-8">
                  <h3 className="font-serif text-2xl font-light mb-6 text-amber-900 text-center border-b pb-4">
                    {category.name}
                  </h3>
                  
                  <div className="space-y-4">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <h4 className="text-lg font-medium mb-1">{item.name}</h4>
                          <p className="text-gray-600 text-sm font-light">{item.description}</p>
                        </div>
                        <div className="text-lg font-light text-amber-900">
                          ₹{(item.price / 100).toLocaleString('en-IN')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section id="book-table" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <div className="h-px w-12 bg-amber-900 mx-auto mb-6"></div>
            <h2 className="font-serif text-5xl font-light">Make a <span className="font-bold">Reservation</span></h2>
          </AnimatedSection>
          
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
                  <select
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="">Select time</option>
                    <option value="07:00">07:00 AM</option>
                    <option value="08:00">08:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">01:00 PM</option>
                    <option value="19:00">07:00 PM</option>
                    <option value="20:00">08:00 PM</option>
                    <option value="21:00">09:00 PM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Guests *</label>
                  <select
                    required
                    value={formData.guests}
                    onChange={(e) => setFormData({...formData, guests: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    {[1,2,3,4,5,6,7,8,9,10].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-600 text-white py-4 font-medium tracking-wide hover:bg-amber-700 transition-colors"
              >
                Reserve Table
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}