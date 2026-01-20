"use client";

import React, { useEffect, useState } from 'react';
import client from '@/lib/appwrite';
import { roomService } from '@/services/roomService';
import { Room } from '@/types/room';
import Image from 'next/image';
import Link from 'next/link';
import FloatingCard from '@/components/ui/FloatingCard';
import { Users, BedDouble, Maximize, Star } from 'lucide-react';

type Props = {
  initialRooms: Room[];
};

const defaultImage =
  'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80';

export default function RoomsRealtime({ initialRooms }: Props) {
  const [rooms, setRooms] = useState<Room[]>(initialRooms || []);

  useEffect(() => {
    let mounted = true;
    let cleanup: (() => void) | null = null;

    (async () => {
      try {
        // dynamic import to avoid static build-time errors with Turbopack
        const mod = await import('appwrite');

        type RealtimeConstructor = new (client: unknown) => {
          subscribe: (channel: string, cb: (...args: unknown[]) => unknown) => unknown;
        };

        const RealtimeClass = (mod as unknown as { Realtime?: RealtimeConstructor }).Realtime;
        if (!RealtimeClass) {
          throw new Error('Realtime export not found in appwrite SDK');
        }

        const realtime = new RealtimeClass(client);
        const channel = `databases.${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}.collections.${process.env.NEXT_PUBLIC_APPWRITE_ROOMS_COLLECTION_ID}.documents`;

        const sub = realtime.subscribe(channel, () => {
          roomService
            .getAllRooms()
            .then((r) => mounted && setRooms(r))
            .catch((err) => console.error('Realtime fetch failed', err));
        });

        // normalize unsubscribe function
        if (typeof sub === 'function') {
          cleanup = sub as () => void;
        } else if (sub && typeof (sub as unknown as { unsubscribe?: unknown }).unsubscribe === 'function') {
          cleanup = () => (sub as unknown as { unsubscribe?: () => void }).unsubscribe?.();
        } else {
          // unknown shape — provide a no-op
          cleanup = null;
        }
      } catch (err) {
        console.warn('Appwrite Realtime not available, falling back to polling:', err);

        // fallback: poll every 10s
        const iv = setInterval(() => {
          roomService
            .getAllRooms()
            .then((r) => mounted && setRooms(r))
            .catch((e) => console.error('Polling fetch failed', e));
        }, 10000);
        cleanup = () => clearInterval(iv);
      }
    })();

    return () => {
      mounted = false;
      try {
        cleanup?.();
      } catch (e) {
        console.error('Error during realtime cleanup', e);
      }
    };
  }, []);

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.map((room, index) => {
          const imageUrl = room.imageUrls && room.imageUrls.length > 0 && isValidUrl(room.imageUrls[0])
            ? room.imageUrls[0]
            : defaultImage;

          return (
            <FloatingCard key={room.$id} delay={index * 0.1}>
              <Link href={`/rooms/${room.slug}`} className="group block bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
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

                  {room.amenities && room.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-4">
                      {room.amenities.slice(0, 3).map((amenity, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  )}

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

      {rooms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No rooms available at the moment.</p>
        </div>
      )}
    </div>
  );
}
