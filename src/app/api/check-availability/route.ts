import { NextRequest, NextResponse } from 'next/server';
import { adminDatabases } from '@/lib/appwrite-admin';
import { Query } from 'node-appwrite';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const BOOKINGS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_BOOKINGS_COLLECTION_ID!;
const ROOMS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_ROOMS_COLLECTION_ID!;

export async function POST(request: NextRequest) {
  try {
    const { roomId, checkInDate, checkOutDate } = await request.json();

    // Validate input
    if (!roomId || !checkInDate || !checkOutDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get room details to know total units
    const room = await adminDatabases.getDocument(
      DATABASE_ID,
      ROOMS_COLLECTION_ID,
      roomId
    );
    
    const totalUnits = room.totalUnits || 1;

    // Find overlapping bookings (confirmed or checked-in only)
    const overlappingBookings = await adminDatabases.listDocuments(
      DATABASE_ID,
      BOOKINGS_COLLECTION_ID,
      [
        Query.equal('roomId', roomId),
        Query.equal('bookingStatus', ['confirmed', 'checked_in']),
        Query.lessThanEqual('checkInDate', checkOutDate),
        Query.greaterThanEqual('checkOutDate', checkInDate)
      ]
    );

    const bookedUnits = overlappingBookings.total;
    const availableUnits = totalUnits - bookedUnits;

    return NextResponse.json({
      available: availableUnits > 0,
      availableUnits,
      totalUnits,
      bookedUnits
    });

  } catch (error: any) {
    console.error('Availability check error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to check availability' },
      { status: 500 }
    );
  }
}