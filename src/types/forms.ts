export interface TableBooking {
  $id?: string;
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  bookingDate: string; // ISO format
  bookingTime: string;
  numberOfGuests: number;
  venue: 'restaurant' | 'foodcourt';
  status: 'requested' | 'confirmed' | 'cancelled';
  specialRequests?: string;
  $createdAt?: string;
  $updatedAt?: string;
}

export interface BanquetEnquiry {
  $id?: string;
  name: string;
  phone: string;
  email?: string;
  eventDate: string; // ISO format
  eventType: string;
  expectedGuests: number;
  message?: string;
  status: 'pending' | 'contacted' | 'confirmed' | 'cancelled';
  $createdAt?: string;
  $updatedAt?: string;
}

export interface ContactMessage {
  $id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  $createdAt?: string;
  $updatedAt?: string;
}