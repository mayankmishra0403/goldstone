import { NextRequest, NextResponse } from 'next/server';
import { adminDatabases } from '@/lib/appwrite-admin';
import { ID } from 'node-appwrite';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const ROOM_BLOCKS_COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_ROOM_BLOCKS_COLLECTION_ID!;

export async function POST(request: NextRequest) {
  try {
    const cookie = request.cookies.get('admin-session');
    if (!cookie?.value) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { roomId, roomName, startDate, endDate, reason } = await request.json();

    if (!roomId || !roomName || !startDate || !endDate || !reason) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const block = await adminDatabases.createDocument(
      DATABASE_ID,
      ROOM_BLOCKS_COLLECTION,
      ID.unique(),
      {
        roomId,
        roomName,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        reason,
      }
    );

    return NextResponse.json({ ok: true, block });
  } catch (error) {
    console.error('Create room block error:', error);
    return NextResponse.json({ error: 'Failed to create room block' }, { status: 500 });
  }
}