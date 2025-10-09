import Image from 'next/image';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import FloatingCard from '@/components/ui/FloatingCard';
import CountUpNumber from '@/components/ui/CountUpNumber';
import { Star, ArrowRight, Calendar, Award, Shield, Hotel, Utensils, Music, Users } from 'lucide-react';
import HeroContent from '@/components/HeroContent';

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1920&q=80"
            alt="Gold Stone Hotel"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center">
          <HeroContent />
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <div className="w-px h-16 bg-white/50"></div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gradient-to-r from-amber-900 to-amber-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 16, suffix: '', label: 'Luxury Rooms' },
              { value: 150, suffix: '', label: 'Banquet Capacity' },
              { value: 4, suffix: '', label: 'Dining Options' },
              { value: 100, suffix: '%', label: 'Guest Satisfaction' }
            ].map((stat, index) => (
              <div key={index} className="text-center border-r border-white/10 last:border-0">
                <div className="text-4xl md:text-5xl font-light mb-2">
                  <CountUpNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-amber-100 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Facilities */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <div className="h-px w-12 bg-amber-900 mx-auto mb-6"></div>
            <h2 className="font-serif text-5xl md:text-6xl font-light text-gray-900 mb-6">
              Our <span className="font-bold">Facilities</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-light">
              Experience the perfect blend of comfort, luxury, and convenience
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { 
                icon: Hotel,
                title: '16 Luxury Rooms', 
                description: 'Standard, Deluxe & Executive options',
                link: '/accommodations'
              },
              { 
                icon: Utensils,
                title: 'MotiMahal Restaurant', 
                description: 'Premium dining experience',
                link: '/restaurant'
              },
              { 
                icon: Users,
                title: 'Banquet Hall', 
                description: '150 guests capacity',
                link: '/banquet'
              },
              { 
                icon: Music,
                title: 'Lounge Bar', 
                description: 'Cocktails & hookah',
                link: '/lounge'
              }
            ].map((facility, index) => (
              <FloatingCard key={index} delay={index * 0.1}>
                <Link href={facility.link} className="block group">
                  <div className="text-center space-y-4 p-6 bg-gradient-to-b from-gray-50 to-white border border-gray-100 rounded-xl hover:shadow-xl hover:border-amber-200 transition-all duration-300 h-full">
                    <div className="flex justify-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <facility.icon className="w-8 h-8 text-amber-900" strokeWidth={1.5} />
                      </div>
                    </div>
                    <h3 className="font-medium text-xl text-gray-900">{facility.title}</h3>
                    <p className="text-gray-600 font-light">{facility.description}</p>
                    <div className="text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn More →
                    </div>
                  </div>
                </Link>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-24 bg-gradient-to-br from-amber-50 via-white to-amber-50">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <div className="h-px w-12 bg-amber-900 mx-auto mb-6"></div>
            <h2 className="font-serif text-5xl md:text-6xl font-light text-gray-900 mb-6">
              Special <span className="font-bold">Offers</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-light">
              Exclusive deals and packages for our valued guests
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Student Offer */}
            <FloatingCard delay={0.1}>
              <div className="bg-white shadow-lg rounded-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white text-center">
                  <div className="text-sm font-bold tracking-wide">STUDENT SPECIAL</div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl mb-3">Food Court Offers</h3>
                  <p className="text-gray-600 font-light mb-4 leading-relaxed">
                    Show your student ID and get 20% off on all food court items
                  </p>
                  <Link href="/food-court" className="inline-flex items-center gap-2 text-amber-600 font-medium group-hover:text-amber-700 transition-colors">
                    Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </FloatingCard>

            {/* Weekend Package */}
            <FloatingCard delay={0.2}>
              <div className="bg-white shadow-lg rounded-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 text-white text-center">
                  <div className="text-sm font-bold tracking-wide">WEEKEND SPECIAL</div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl mb-3">Stay 2 Nights</h3>
                  <p className="text-gray-600 font-light mb-4 leading-relaxed">
                    Book 2 nights and get 15% off + complimentary breakfast
                  </p>
                  <Link href="/accommodations" className="inline-flex items-center gap-2 text-amber-600 font-medium group-hover:text-amber-700 transition-colors">
                    Book Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </FloatingCard>

            {/* Event Package */}
            <FloatingCard delay={0.3}>
              <div className="bg-white shadow-lg rounded-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 text-white text-center">
                  <div className="text-sm font-bold tracking-wide">EVENT PACKAGE</div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl mb-3">Banquet Booking</h3>
                  <p className="text-gray-600 font-light mb-4 leading-relaxed">
                    Book banquet hall with rooms and get special group rates
                  </p>
                  <Link href="/banquet" className="inline-flex items-center gap-2 text-amber-600 font-medium group-hover:text-amber-700 transition-colors">
                    Enquire Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </FloatingCard>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <div className="h-px w-12 bg-amber-900 mx-auto mb-6"></div>
            <h2 className="font-serif text-5xl md:text-6xl font-light text-gray-900 mb-6">
              Why <span className="font-bold">Gold Stone?</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Shield, title: 'Safe & Secure', desc: '24/7 security & CCTV' },
              { icon: Award, title: 'Prime Location', desc: 'Heart of Kanpur' },
              { icon: Calendar, title: 'Easy Booking', desc: 'Online & offline booking' },
              { icon: Hotel, title: 'Best Price', desc: 'Guaranteed best rates' }
            ].map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="text-center space-y-4 p-6 hover:bg-amber-50 rounded-xl transition-colors">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                      <item.icon className="w-8 h-8 text-amber-900" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="font-medium text-lg">{item.title}</h3>
                  <p className="text-gray-600 font-light text-sm">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <div className="h-px w-12 bg-amber-900 mx-auto mb-6"></div>
            <h2 className="font-serif text-5xl md:text-6xl font-light text-gray-900 mb-6">
              Hotel <span className="font-bold">Gallery</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { 
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
                title: 'Swimming Pool',
                desc: 'Rooftop pool with city views'
              },
              { 
                image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
                title: 'Luxury Rooms',
                desc: 'Comfort redefined'
              },
              { 
                image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
                title: 'Restaurant',
                desc: 'Fine dining experience'
              }
            ].map((item, index) => (
              <FloatingCard key={index} delay={index * 0.15}>
                <div className="group relative overflow-hidden rounded-xl shadow-lg">
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="font-serif text-2xl mb-2">{item.title}</h3>
                      <p className="font-light text-white/90">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <div className="h-px w-12 bg-amber-900 mx-auto mb-6"></div>
            <h2 className="font-serif text-5xl md:text-6xl font-light text-gray-900">
              Guest <span className="font-bold">Reviews</span>
            </h2>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <FloatingCard>
              <div className="bg-gradient-to-br from-amber-50 to-white p-12 rounded-2xl text-center shadow-xl">
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-amber-500" fill="currentColor" />
                  ))}
                </div>
                <p className="text-2xl font-light text-gray-700 mb-8 italic leading-relaxed">
  &quot;Excellent hospitality and service. The rooms are clean and comfortable. 
  MotiMahal restaurant serves amazing food. Perfect for both business and leisure stays.&quot;
</p>
                <div>
                  <div className="font-medium text-lg">Rajesh Sharma</div>
                  <div className="text-gray-500 font-light">Business Traveler</div>
                </div>
              </div>
            </FloatingCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-amber-900 to-amber-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] animate-slide"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <AnimatedSection>
            <h2 className="font-serif text-5xl md:text-6xl font-light mb-8">
              Ready to <span className="font-bold">Book Your Stay?</span>
            </h2>
            <p className="text-xl font-light text-amber-100 mb-12 max-w-2xl mx-auto">
              Experience comfort and luxury at Gold Stone Hotel
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/accommodations"
                className="inline-flex items-center justify-center px-10 py-4 bg-white text-amber-900 font-medium tracking-wide hover:bg-amber-50 transform hover:scale-105 transition-all duration-300 shadow-xl"
              >
                View Rooms & Rates
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-10 py-4 border-2 border-white text-white font-medium tracking-wide hover:bg-white hover:text-amber-900 transform hover:scale-105 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}