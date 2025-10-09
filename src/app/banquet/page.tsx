'use client';

import Image from 'next/image';
import { useState } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import FloatingCard from '@/components/ui/FloatingCard';
import { Users, Wifi, Music, Car, Phone, CheckCircle } from 'lucide-react';
import { formsService } from '@/services/formsService';

export default function BanquetPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventDate: '',
    eventType: '',
    guests: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await formsService.createBanquetEnquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || undefined,
        eventDate: new Date(formData.eventDate).toISOString(),
        eventType: formData.eventType,
        expectedGuests: parseInt(formData.guests),
        message: formData.message || undefined,
        status: 'pending'
      });

      setSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        eventDate: '',
        eventType: '',
        guests: '',
        message: ''
      });
    } catch (err) {
      console.error(err);
      setError('Failed to submit enquiry. Please call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=80" 
            alt="Banquet Hall" 
            fill 
            className="object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center text-center">
          <AnimatedSection>
            <h1 className="font-serif text-6xl md:text-7xl font-light text-white mb-4">
              Banquet <span className="font-bold">Hall</span>
            </h1>
            <p className="text-2xl text-white/90 font-light">
              Celebrate your special moments • Capacity up to 150 guests
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Users, title: '150 Capacity', desc: 'Spacious hall' },
              { icon: Wifi, title: 'Free WiFi', desc: 'High-speed internet' },
              { icon: Music, title: 'AV System', desc: 'Sound & projection' },
              { icon: Car, title: 'Valet Parking', desc: 'Complimentary' }
            ].map((feature, i) => (
              <FloatingCard key={i} delay={i * 0.1}>
                <div className="bg-white p-6 text-center shadow-sm">
                  <feature.icon className="w-10 h-10 mx-auto mb-3 text-amber-600" strokeWidth={1.5} />
                  <h3 className="font-medium mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Services & Booking */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Services */}
            <AnimatedSection delay={0.1}>
              <h2 className="font-serif text-4xl mb-8">Perfect for Every <span className="font-bold">Occasion</span></h2>
              
              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="font-medium text-xl mb-3 text-amber-900">Weddings & Receptions</h3>
                  <p className="text-gray-600">Create unforgettable memories with our elegant setup and premium catering services.</p>
                </div>
                <div>
                  <h3 className="font-medium text-xl mb-3 text-amber-900">Corporate Events</h3>
                  <p className="text-gray-600">Professional atmosphere with state-of-the-art AV equipment for presentations and conferences.</p>
                </div>
                <div>
                  <h3 className="font-medium text-xl mb-3 text-amber-900">Birthday & Anniversary</h3>
                  <p className="text-gray-600">Celebrate milestones with customized decorations and special arrangements.</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-medium text-lg mb-4">Included Services:</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Basic Decoration',
                    'AC Hall',
                    'Sound System',
                    'Stage Setup',
                    'Guest Parking',
                    'Power Backup',
                    'Security',
                    'Cleaning Service'
                  ].map((service, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Enquiry Form */}
            <AnimatedSection delay={0.2}>
              <div className="bg-white p-8 shadow-lg border">
                <h3 className="font-serif text-2xl mb-6">Send Enquiry</h3>

                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg mb-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      <span>Enquiry submitted successfully! We&apos;ll contact you soon.</span>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg mb-6">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Event Date *</label>
                      <input
                        type="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.eventDate}
                        onChange={(e) => setFormData({...formData, eventDate: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Event Type *</label>
                      <select
                        required
                        value={formData.eventType}
                        onChange={(e) => setFormData({...formData, eventType: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      >
                        <option value="">Select Event</option>
                        <option value="wedding">Wedding/Reception</option>
                        <option value="birthday">Birthday Party</option>
                        <option value="anniversary">Anniversary</option>
                        <option value="corporate">Corporate Event</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expected Guests *</label>
                    <input
                      type="number"
                      required
                      max={150}
                      value={formData.guests}
                      onChange={(e) => setFormData({...formData, guests: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Maximum 150"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Requirements</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Catering needs, decoration preferences, etc."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-amber-600 text-white py-3 font-medium hover:bg-amber-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Submitting...' : 'Send Enquiry'}
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t text-center">
                  <p className="text-sm text-gray-600 mb-3">For immediate assistance:</p>
                  <a href="tel:+919876543210" className="flex items-center justify-center gap-2 text-amber-600 font-medium">
                    <Phone className="w-4 h-4" />
                    +91 98765 43210
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}