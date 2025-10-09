import { roomService } from '@/services/roomService';
import { Room } from '@/types/room';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface RoomPageProps {
  params: {
    slug: string;
  };
}

export default async function RoomPage({ params }: RoomPageProps) {
  const { slug } = params;
  
  let room: Room | null = null;

  try {
    room = await roomService.getRoomBySlug(slug);
  } catch (error) {
    console.error('Error fetching room:', error);
  }

  // If room not found, show 404
  if (!room) {
    notFound();
  }

  // Helper function for valid URLs
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const defaultImage = "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80";
  const validImages = room.imageUrls?.filter(isValidUrl) || [defaultImage];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <span className="text-gray-900">{room.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Room Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{room.name}</h1>
          <div className="flex items-center gap-4 text-gray-600">
            <span>👥 Up to {room.capacity} guests</span>
            <span>•</span>
            <span>🛏️ {room.beds} Bed{room.beds > 1 ? 's' : ''}</span>
            {room.sizeSqFt && (
              <>
                <span>•</span>
                <span>📐 {room.sizeSqFt} sq ft</span>
              </>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="grid grid-cols-2 gap-4">
                {/* Main Image */}
                <div className="col-span-2 relative h-96 rounded-lg overflow-hidden">
                  <Image
                    src={validImages[0]}
                    alt={room.name}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                </div>
                
                {/* Additional Images */}
                {validImages.slice(1, 5).map((imageUrl, index) => (
                  <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={`${room.name} - View ${index + 2}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">About This Room</h2>
              <p className="text-gray-700 leading-relaxed">{room.description}</p>
            </div>

            {/* Amenities */}
            {room.amenities && room.amenities.length > 0 && (
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Amenities</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {room.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <svg 
                        className="w-5 h-5 text-green-500" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M5 13l4 4L19 7" 
                        />
                      </svg>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-blue-600">
                    ₹{(room.pricePerNight / 100).toLocaleString('en-IN')}
                  </span>
                  <span className="text-gray-600">/night</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Exclusive of taxes</p>
              </div>

              <div className="space-y-4">
                <Link
                  href={`/book?roomId=${room.$id}`}
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Book Now
                </Link>
                
                <Link
                  href="/"
                  className="block w-full border-2 border-gray-300 text-gray-700 text-center py-3 rounded-lg font-semibold hover:border-gray-400 transition"
                >
                  View All Rooms
                </Link>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold mb-3">Quick Info</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Max Guests:</span>
                    <span className="font-medium">{room.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Beds:</span>
                    <span className="font-medium">{room.beds}</span>
                  </div>
                  {room.sizeSqFt && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Room Size:</span>
                      <span className="font-medium">{room.sizeSqFt} sq ft</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: RoomPageProps) {
  const room = await roomService.getRoomBySlug(params.slug);
  
  if (!room) {
    return {
      title: 'Room Not Found',
    };
  }

  return {
    title: `${room.name} - [Hotel Name]`,
    description: room.description,
  };
}