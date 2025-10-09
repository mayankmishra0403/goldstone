import { databases } from '@/lib/appwrite';
import { TableBooking, BanquetEnquiry, ContactMessage } from '@/types/forms';
import { ID } from 'appwrite';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const TABLE_BOOKINGS_COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_TABLE_BOOKINGS_COLLECTION_ID!;
const BANQUET_ENQUIRIES_COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_BANQUET_ENQUIRIES_COLLECTION_ID!;
const CONTACT_MESSAGES_COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_CONTACT_MESSAGES_COLLECTION_ID!;

export const formsService = {
  /**
   * Submit table booking request
   */
  async createTableBooking(data: Omit<TableBooking, '$id' | '$createdAt' | '$updatedAt'>): Promise<TableBooking> {
    try {
      const booking = await databases.createDocument(
        DATABASE_ID,
        TABLE_BOOKINGS_COLLECTION,
        ID.unique(),
        data
      );
      return booking as unknown as TableBooking;
    } catch (error) {
      console.error('Error creating table booking:', error);
      throw error;
    }
  },

  /**
   * Submit banquet enquiry
   */
  async createBanquetEnquiry(data: Omit<BanquetEnquiry, '$id' | '$createdAt' | '$updatedAt'>): Promise<BanquetEnquiry> {
    try {
      const enquiry = await databases.createDocument(
        DATABASE_ID,
        BANQUET_ENQUIRIES_COLLECTION,
        ID.unique(),
        data
      );
      return enquiry as unknown as BanquetEnquiry;
    } catch (error) {
      console.error('Error creating banquet enquiry:', error);
      throw error;
    }
  },

  /**
   * Submit contact message
   */
  async createContactMessage(data: Omit<ContactMessage, '$id' | '$createdAt' | '$updatedAt'>): Promise<ContactMessage> {
    try {
      const message = await databases.createDocument(
        DATABASE_ID,
        CONTACT_MESSAGES_COLLECTION,
        ID.unique(),
        data
      );
      return message as unknown as ContactMessage;
    } catch (error) {
      console.error('Error creating contact message:', error);
      throw error;
    }
  }
};