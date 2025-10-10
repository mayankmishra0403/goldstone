import { NextRequest, NextResponse } from 'next/server';
import { adminDatabases } from '@/lib/appwrite-admin'; // This should point to your admin client in the main app
import { Query } from 'node-appwrite';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const BOOKINGS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_BOOKINGS_COLLECTION_ID!;
const ROOMS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_ROOMS_COLLECTION_ID!;
const ROOM_BLOCKS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_ROOM_BLOCKS_COLLECTION_ID!;

export async function POST(request: NextRequest) {
  try {
    const { roomId, checkInDate, checkOutDate } = await request.json();

    if (!roomId || !checkInDate || !checkOutDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get room details
    const room = await adminDatabases.getDocument(
      DATABASE_ID,
      ROOMS_COLLECTION_ID,
      roomId
    );
    const totalUnits = room.totalUnits || 1;

    // 1. Find overlapping BOOKINGS
    const overlappingBookings = await adminDatabases.listDocuments(
      DATABASE_ID,
      BOOKINGS_COLLECTION_ID,
      [
        Query.equal('roomId', roomId),
        Query.equal('bookingStatus', ['confirmed', 'checked_in']),
        Query.lessThanEqual('checkInDate', checkOutDate),
        Query.greaterThanEqual('checkOutDate', checkInDate),
        Query.limit(totalUnits) // Optimization
      ]
    );

    // 2. Find overlapping BLOCKS
    const overlappingBlocks = await adminDatabases.listDocuments(
      DATABASE_ID,
      ROOM_BLOCKS_COLLECTION_ID,
      [
        Query.equal('roomId', roomId),
        Query.lessThanEqual('startDate', checkOutDate),
        Query.greaterThanEqual('endDate', checkInDate),
        Query.limit(1) // Optimization: we just need to know if at least one block exists
      ]
    );

    // 3. Calculate availability
    const bookedUnits = overlappingBookings.total;
    let availableUnits = totalUnits - bookedUnits;

    // If the room type is fully blocked for the date range, set available units to 0
    if (overlappingBlocks.total > 0) {
      // NOTE: This simple logic assumes blocking one unit blocks the entire room type.
      // A more complex system would handle blocking a specific number of units.
      availableUnits = 0; 
    }

    return NextResponse.json({
      available: availableUnits > 0,
      availableUnits,
    });

  } catch (error: any) {
    console.error('Availability check error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to check availability' },
      { status: 500 }
    );
  }
}