'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarStyle = {
    background: !isHomePage || scrolled ? 'bg-white shadow-sm' : 'bg-transparent',
    logoColor: !isHomePage || scrolled ? 'text-amber-900' : 'text-white',
    logoSubColor: !isHomePage || scrolled ? 'text-amber-700' : 'text-white/70',
    linkColor: !isHomePage || scrolled ? 'text-gray-700 hover:text-amber-900' : 'text-white/90 hover:text-white',
    borderColor: !isHomePage || scrolled ? 'bg-amber-900' : 'bg-white',
    buttonStyle: !isHomePage || scrolled 
      ? 'bg-amber-900 text-white hover:bg-amber-800' 
      : 'bg-white text-amber-900 hover:bg-amber-50',
    mobileButtonColor: !isHomePage || scrolled ? 'text-amber-900' : 'text-white'
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navbarStyle.background}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="group flex items-center space-x-3">
            <div className={`w-12 h-12 border-2 ${navbarStyle.logoColor === 'text-white' ? 'border-white' : 'border-amber-900'} flex items-center justify-center`}>
              <span className={`font-serif text-2xl font-bold transition-colors ${navbarStyle.logoColor}`}>G</span>
            </div>
            <div>
              <div className={`font-serif text-xl font-medium tracking-wide transition-colors ${navbarStyle.logoColor}`}>
                Ritam Hotel
              </div>
              <div className={`text-xs tracking-widest uppercase transition-colors ${navbarStyle.logoSubColor}`}>
                Kanpur
              </div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {[
              { name: 'Home', href: '/' },
              { name: 'Rooms', href: '/accommodations' },
              { name: 'Restaurant', href: '/restaurant' },
              { name: 'Banquet', href: '/banquet' },
              { name: 'Food Court', href: '/food-court' },
              { name: 'Lounge', href: '/lounge' },
              { name: 'Contact', href: '/contact' }
            ].map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  href={item.href}
                  className={`text-sm font-medium transition-all relative group ${navbarStyle.linkColor}`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${navbarStyle.borderColor}`}></span>
                </Link>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Link 
                href="/book" 
                className={`px-6 py-2.5 text-sm font-medium transition-all duration-300 ${navbarStyle.buttonStyle}`}
              >
                Book Now
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors ${navbarStyle.mobileButtonColor}`}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" strokeWidth={1.5} />
            ) : (
              <Menu className="w-6 h-6" strokeWidth={1.5} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden bg-white rounded-b-lg shadow-lg"
            >
              <div className="py-6 space-y-4">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'Rooms', href: '/accommodations' },
                  { name: 'Restaurant', href: '/restaurant' },
                  { name: 'Banquet', href: '/banquet' },
                  { name: 'Food Court', href: '/food-court' },
                  { name: 'Lounge', href: '/lounge' },
                  { name: 'Contact', href: '/contact' }
                ].map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link 
                      href={item.href}
                      className="block px-4 py-2 text-gray-700 hover:text-amber-900 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <div className="px-4 pt-4">
                  <Link 
                    href="/book" 
                    className="block text-center bg-amber-900 text-white px-6 py-3 hover:bg-amber-800 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}