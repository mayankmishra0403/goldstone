export interface Booking {
  $id?: string;
  roomId: string;
  roomName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkInDate: string; // ISO format
  checkOutDate: string; // ISO format
  numberOfGuests: number;
  numberOfNights: number;
  roomPrice: number; // per night in paise
  taxAmount: number; // total tax in paise
  totalAmount: number; // final amount in paise
  bookingStatus: 'pending' | 'confirmed' | 'cancelled' | 'checked_in' | 'checked_out';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentId?: string;
  specialRequests?: string;
  $createdAt?: string;
  $updatedAt?: string;
}

export interface BookingFormData {
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
}