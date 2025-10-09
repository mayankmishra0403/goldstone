import { roomService } from '@/services/roomService';
import { Room } from '@/types/room';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import FloatingCard from '@/components/ui/FloatingCard';
import { Users, BedDouble, Maximize, Star, Filter } from 'lucide-react';
// Removed 'Search' import
export default async function AccommodationsPage() {
  let rooms: Room[] = [];
  let error = null;

  try {
    rooms = await roomService.getAllRooms();
  } catch (err) {
    error = 'Failed to load rooms. Please try again later.';
    console.error(err);
  }

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const defaultImage = "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80";

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Hero Section */}
      <section className="relative h-[40vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1920&q=80"
            alt="Accommodations"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center text-center">
          <AnimatedSection>
            <h1 className="font-serif text-6xl md:text-7xl font-light text-white mb-4">
              Rooms & <span className="font-bold">Suites</span>
            </h1>
            <p className="text-xl text-white/90 font-light max-w-2xl mx-auto">
              Discover our collection of elegantly appointed accommodations
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 px-6 py-2 border border-gray-300 bg-white hover:bg-gray-50 transition">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              <select className="px-6 py-2 border border-gray-300 bg-white">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
            <div className="text-gray-600">
              Showing {rooms.length} rooms available
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 mb-12 max-w-2xl mx-auto text-center">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room, index) => {
              const imageUrl = room.imageUrls && room.imageUrls.length > 0 && isValidUrl(room.imageUrls[0])
                ? room.imageUrls[0]
                : defaultImage;

              return (
                <FloatingCard key={room.$id} delay={index * 0.1}>
                  <Link href={`/rooms/${room.slug}`} className="group block bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                    {/* Image */}
                    <div className="relative h-80 overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={room.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full">
                        <span className="text-lg font-medium">₹{(room.pricePerNight / 100).toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-serif text-2xl font-light">{room.name}</h3>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-amber-500" fill="currentColor" />
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 font-light leading-relaxed line-clamp-2">
                        {room.description}
                      </p>
                      
                      {/* Features */}
                      <div className="flex items-center gap-6 pt-4 border-t border-gray-100 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" strokeWidth={1.5} />
                          <span className="font-light">{room.capacity} Guests</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BedDouble className="w-4 h-4" strokeWidth={1.5} />
                          <span className="font-light">{room.beds} Bed{room.beds > 1 ? 's' : ''}</span>
                        </div>
                        {room.sizeSqFt && (
                          <div className="flex items-center gap-2">
                            <Maximize className="w-4 h-4" strokeWidth={1.5} />
                            <span className="font-light">{room.sizeSqFt} sq ft</span>
                          </div>
                        )}
                      </div>

                      {/* Amenities */}
                      {room.amenities && room.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-4">
                          {room.amenities.slice(0, 3).map((amenity, idx) => (
                            <span 
                              key={idx} 
                              className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* CTA */}
                      <div className="pt-4">
                        <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          View Details & Book →
                        </span>
                      </div>
                    </div>
                  </Link>
                </FloatingCard>
              );
            })}
          </div>

          {rooms.length === 0 && !error && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No rooms available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}