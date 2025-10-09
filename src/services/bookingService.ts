import { databases } from '@/lib/appwrite';
import { Booking } from '@/types/booking';
import { ID } from 'appwrite';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const BOOKINGS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_BOOKINGS_COLLECTION_ID!;

export const bookingService = {
  async checkAvailability(
    roomId: string, 
    checkInDate: string, 
    checkOutDate: string
  ): Promise<{ available: boolean; availableUnits: number }> {
    try {
      const response = await fetch('/api/check-availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomId,
          checkInDate,
          checkOutDate
        })
      });

      if (!response.ok) {
        throw new Error('Failed to check availability');
      }

      const data = await response.json();
      return {
        available: data.available,
        availableUnits: data.availableUnits
      };
    } catch (error) {
      console.error('Error checking availability:', error);
      throw error;
    }
  },

  calculateBookingAmount(
    pricePerNight: number,
    numberOfNights: number,
    taxPercent: number = 12
  ): { roomPrice: number; taxAmount: number; totalAmount: number } {
    const roomPrice = pricePerNight * numberOfNights;
    const taxAmount = Math.round((roomPrice * taxPercent) / 100);
    const totalAmount = roomPrice + taxAmount;

    return { roomPrice, taxAmount, totalAmount };
  },

  async createBooking(bookingData: Omit<Booking, '$id' | '$createdAt' | '$updatedAt'>): Promise<Booking> {
    try {
      const booking = await databases.createDocument(
        DATABASE_ID,
        BOOKINGS_COLLECTION_ID,
        ID.unique(),
        bookingData
      );

      return booking as unknown as Booking;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  async getBookingById(bookingId: string): Promise<Booking> {
    try {
      const booking = await databases.getDocument(
        DATABASE_ID,
        BOOKINGS_COLLECTION_ID,
        bookingId
      );
      return booking as unknown as Booking;
    } catch (error) {
      console.error('Error fetching booking:', error);
      throw error;
    }
  },

  async updateBookingStatus(
    bookingId: string, 
    bookingStatus: Booking['bookingStatus'],
    paymentStatus?: Booking['paymentStatus'],
    paymentId?: string
  ): Promise<Booking> {
    try {
      const updateData: Record<string, string> = { bookingStatus };
      
      if (paymentStatus) updateData.paymentStatus = paymentStatus;
      if (paymentId) updateData.paymentId = paymentId;

      const booking = await databases.updateDocument(
        DATABASE_ID,
        BOOKINGS_COLLECTION_ID,
        bookingId,
        updateData
      );

      return booking as unknown as Booking;
    } catch (error) {
      console.error('Error updating booking:', error);
      throw error;
    }
  }
};