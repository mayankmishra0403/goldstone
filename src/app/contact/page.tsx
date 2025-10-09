'use client';

import Image from 'next/image';
import { useState } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import FloatingCard from '@/components/ui/FloatingCard';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { formsService } from '@/services/formsService';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
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
      await formsService.createContactMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.subject,
        message: formData.message,
        status: 'unread'
      });

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      console.error(err);
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Hero Section */}
      <section className="relative h-[40vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
            alt="Contact Us"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center text-center">
          <AnimatedSection>
            <h1 className="font-serif text-6xl md:text-7xl font-light text-white mb-4">
              Get in <span className="font-bold">Touch</span>
            </h1>
            <p className="text-xl text-white/90 font-light max-w-2xl mx-auto">
              We&apos;re here to assist you with your perfect stay
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: MapPin,
                title: 'Address',
                lines: ['The Grand Palace Hotel', '123 Mall Road', 'Kanpur, UP 208001']
              },
              {
                icon: Phone,
                title: 'Phone',
                lines: ['Reception: +91 98765 43210', 'Reservations: +91 98765 43211', 'Emergency: +91 98765 43212']
              },
              {
                icon: Mail,
                title: 'Email',
                lines: ['info@goldstonehotel.com', 'reservations@goldstonehotel.com', 'events@goldstonehotel.com']
              },
              {
                icon: Clock,
                title: 'Hours',
                lines: ['Check-in: 2:00 PM', 'Check-out: 12:00 PM', 'Reception: 24/7']
              }
            ].map((item, index) => (
              <FloatingCard key={index} delay={index * 0.1}>
                <div className="bg-white p-6 text-center space-y-4 h-full">
                  <div className="flex justify-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <div className="space-y-1">
                    {item.lines.map((line, idx) => (
                      <p key={idx} className="text-gray-600 font-light text-sm">{line}</p>
                    ))}
                  </div>
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <AnimatedSection delay={0.1}>
              <div className="bg-white p-8 shadow-lg">
                <h2 className="font-serif text-3xl mb-6">Send us a Message</h2>

                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg mb-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      <span>Message sent successfully! We&apos;ll respond within 24 hours.</span>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg mb-6">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                      <select
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      >
                        <option value="">Select Subject</option>
                        <option value="reservation">Reservation Inquiry</option>
                        <option value="feedback">Feedback</option>
                        <option value="events">Events & Conferences</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gray-900 text-white py-4 font-medium tracking-wide hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </AnimatedSection>

            {/* Map */}
            <AnimatedSection delay={0.2}>
              <div className="bg-gray-200 h-full min-h-[500px] relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28656.47924194077!2d80.3318736!3d26.4499232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c4770b127c46f%3A0x1778302a9fbe7b41!2sKanpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1640000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '500px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl mb-4">Need Immediate Assistance?</h2>
          <p className="text-white/80 mb-8">Our team is available 24/7 to help you</p>
          <a
            href="tel:+919876543210"
            className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 font-medium hover:bg-gray-100 transition"
          >
            <Phone className="w-5 h-5" />
            Call Now: +91 98765 43210
          </a>
        </div>
      </section>
    </div>
  );
}