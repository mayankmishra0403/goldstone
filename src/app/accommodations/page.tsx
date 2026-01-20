import { roomService } from '@/services/roomService';
import { Room } from '@/types/room';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import RoomsRealtime from '@/components/RoomsRealtime';
import { Filter } from 'lucide-react';
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

  // `RoomsRealtime` handles image validation and defaults on the client.

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

          <div>
            <RoomsRealtime initialRooms={rooms} />
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