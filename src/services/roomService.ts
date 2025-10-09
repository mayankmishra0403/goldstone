import { databases } from '@/lib/appwrite';
import { Room } from '@/types/room';
import { Query } from 'appwrite';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const ROOMS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_ROOMS_COLLECTION_ID!;

export const roomService = {
  /**
   * Fetch all available rooms
   */
  async getAllRooms(): Promise<Room[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        ROOMS_COLLECTION_ID,
        [
          Query.equal('isAvailable', true),
          Query.orderAsc('pricePerNight')
        ]
      );
      
      return response.documents as unknown as Room[];
    } catch (error) {
      console.error('Error fetching rooms:', error);
      throw error;
    }
  },

  /**
   * Fetch a single room by slug
   */
  async getRoomBySlug(slug: string): Promise<Room | null> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        ROOMS_COLLECTION_ID,
        [
          Query.equal('slug', slug),
          Query.equal('isAvailable', true)
        ]
      );
      
      return (response.documents[0] as unknown as Room) || null;
    } catch (error) {
      console.error('Error fetching room:', error);
      throw error;
    }
  }
};