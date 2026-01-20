import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <div className="font-serif text-2xl font-medium text-white mb-1">Ritam Hotel</div>
              <div className="text-xs tracking-widest uppercase text-amber-500">Kanpur</div>
            </div>
            <p className="text-sm font-light leading-relaxed text-gray-400">
              Your premium stay destination in the heart of Kanpur with luxury rooms, fine dining, and event spaces.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-medium text-sm tracking-wider uppercase mb-4">Explore</h3>
            <ul className="space-y-2 text-sm font-light">
              <li>
                <Link href="/accommodations" className="hover:text-amber-400 transition-colors">
                  Rooms & Suites
                </Link>
              </li>
              <li>
                <Link href="/restaurant" className="hover:text-amber-400 transition-colors">
                  MotiMahal Restaurant
                </Link>
              </li>
              <li>
                <Link href="/food-court" className="hover:text-amber-400 transition-colors">
                  Food Court
                </Link>
              </li>
              <li>
                <Link href="/banquet" className="hover:text-amber-400 transition-colors">
                  Banquet Hall
                </Link>
              </li>
              <li>
                <Link href="/lounge" className="hover:text-amber-400 transition-colors">
                  The Lounge
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-medium text-sm tracking-wider uppercase mb-4">Services</h3>
            <ul className="space-y-2 text-sm font-light">
              <li className="hover:text-amber-400 transition-colors cursor-pointer">24/7 Room Service</li>
              <li className="hover:text-amber-400 transition-colors cursor-pointer">Free Wi-Fi</li>
              <li className="hover:text-amber-400 transition-colors cursor-pointer">Valet Parking</li>
              <li className="hover:text-amber-400 transition-colors cursor-pointer">Laundry Service</li>
              <li className="hover:text-amber-400 transition-colors cursor-pointer">Airport Transfer</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-medium text-sm tracking-wider uppercase mb-4">Contact</h3>
            <ul className="space-y-3 text-sm font-light">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-400" strokeWidth={1.5} />
                <span>123 Mall Road<br />Kanpur, UP 208001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 flex-shrink-0 text-amber-400" strokeWidth={1.5} />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0 text-amber-400" strokeWidth={1.5} />
                <span>info@ritamhotel.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-light text-gray-500">
            &copy; 2024 Ritam Hotel. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-amber-400 transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}