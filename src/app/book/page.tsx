'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { roomService } from '@/services/roomService';
import { bookingService } from '@/services/bookingService';
import { Room } from '@/types/room';
import { BookingFormData } from '@/types/booking';
import Image from 'next/image';
import { Calendar, Users, CreditCard, CheckCircle, ArrowLeft } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

// Helper function for safe image URLs
const getValidImageUrl = (imageUrls: string[] | undefined): string => {
  const defaultImage = 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80';
  
  if (!imageUrls || imageUrls.length === 0) return defaultImage;
  
  try {
    new URL(imageUrls[0]);
    return imageUrls[0];
  } catch {
    return defaultImage;
  }
};

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const roomIdFromUrl = searchParams.get('roomId');

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  
  const [formData, setFormData] = useState<BookingFormData>({
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: 1,
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    specialRequests: ''
  });

  const [bookingDetails, setBookingDetails] = useState({
    numberOfNights: 0,
    roomPrice: 0,
    taxAmount: 0,
    totalAmount: 0
  });

  useEffect(() => {
    loadRooms();
  }, []);

  useEffect(() => {
    if (roomIdFromUrl && availableRooms.length > 0) {
      const room = availableRooms.find(r => r.$id === roomIdFromUrl);
      if (room) {
        setSelectedRoom(room);
        setStep(2);
      }
    }
  }, [roomIdFromUrl, availableRooms]);

  const loadRooms = async () => {
    try {
      const rooms = await roomService.getAllRooms();
      setAvailableRooms(rooms);
    } catch (err) {
      console.error('Error loading rooms:', err);
      setError('Failed to load rooms');
    }
  };

  const calculateNights = (checkIn: string, checkOut: string): number => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleDateChange = (field: 'checkInDate' | 'checkOutDate', value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);

    if (newFormData.checkInDate && newFormData.checkOutDate) {
      const nights = calculateNights(newFormData.checkInDate, newFormData.checkOutDate);
      
      if (nights > 0 && selectedRoom) {
        const { roomPrice, taxAmount, totalAmount } = bookingService.calculateBookingAmount(
          selectedRoom.pricePerNight,
          nights,
          selectedRoom.taxPercent || 12
        );

        setBookingDetails({
          numberOfNights: nights,
          roomPrice,
          taxAmount,
          totalAmount
        });
      }
    }
  };

  const checkAvailability = async () => {
    if (!selectedRoom || !formData.checkInDate || !formData.checkOutDate) {
      setError('Please select dates');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { available } = await bookingService.checkAvailability(
        selectedRoom.$id,
        formData.checkInDate,
        formData.checkOutDate
      );

      if (available) {
        setStep(3);
      } else {
        setError('Room not available for selected dates. Please choose different dates.');
      }
    } catch (err) {
      setError('Error checking availability');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitBooking = async () => {
    if (!selectedRoom) return;

    setLoading(true);
    setError('');

    try {
      const bookingData = {
        roomId: selectedRoom.$id,
        roomName: selectedRoom.name,
        guestName: formData.guestName,
        guestEmail: formData.guestEmail,
        guestPhone: formData.guestPhone,
        checkInDate: new Date(formData.checkInDate).toISOString(),
        checkOutDate: new Date(formData.checkOutDate).toISOString(),
        numberOfGuests: formData.numberOfGuests,
        numberOfNights: bookingDetails.numberOfNights,
        roomPrice: bookingDetails.roomPrice,
        taxAmount: bookingDetails.taxAmount,
        totalAmount: bookingDetails.totalAmount,
        bookingStatus: 'pending' as const,
        paymentStatus: 'pending' as const,
        specialRequests: formData.specialRequests
      };

      const booking = await bookingService.createBooking(bookingData);
      setStep(4);
      console.log('Booking created:', booking);
      
    } catch (err: any) {
      setError(err.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="mb-12">
              <div className="flex items-center justify-between">
                {[
                  { num: 1, label: 'Select Room', icon: Calendar },
                  { num: 2, label: 'Choose Dates', icon: Calendar },
                  { num: 3, label: 'Guest Details', icon: Users },
                  { num: 4, label: 'Payment', icon: CreditCard }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        step >= item.num 
                          ? 'bg-amber-600 text-white' 
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        {step > item.num ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          <item.icon className="w-6 h-6" />
                        )}
                      </div>
                      <span className="text-sm mt-2 hidden md:block">{item.label}</span>
                    </div>
                    {idx < 3 && (
                      <div className={`h-1 flex-1 ${
                        step > item.num ? 'bg-amber-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg mb-6">
                {error}
              </div>
            )}

            {/* Step 1: Select Room */}
            {step === 1 && (
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="font-serif text-3xl mb-6">Select Your Room</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {availableRooms.map((room) => (
                    <div
                      key={room.$id}
                      onClick={() => {
                        setSelectedRoom(room);
                        setStep(2);
                      }}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedRoom?.$id === room.$id
                          ? 'border-amber-600 bg-amber-50'
                          : 'border-gray-200 hover:border-amber-300'
                      }`}
                    >
                      <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                        <Image
                          src={getValidImageUrl(room.imageUrls)}
                          alt={room.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      <h3 className="font-serif text-xl mb-2">{room.name}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{room.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-amber-600">
                          ₹{(room.pricePerNight / 100).toLocaleString('en-IN')}
                        </span>
                        <span className="text-sm text-gray-500">per night</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Choose Dates */}
            {step === 2 && selectedRoom && (
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Change Room
                </button>

                <h2 className="font-serif text-3xl mb-6">Choose Your Dates</h2>
                
                <div className="bg-amber-50 p-4 rounded-lg mb-6">
                  <div className="flex items-start gap-4">
                    <div className="relative h-20 w-32 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={getValidImageUrl(selectedRoom.imageUrls)}
                        alt={selectedRoom.name}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{selectedRoom.name}</h3>
                      <p className="text-gray-600 text-sm">
                        ₹{(selectedRoom.pricePerNight / 100).toLocaleString('en-IN')} per night + {selectedRoom.taxPercent || 12}% tax
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Check-in Date *</label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.checkInDate}
                      onChange={(e) => handleDateChange('checkInDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Check-out Date *</label>
                    <input
                      type="date"
                      required
                      min={formData.checkInDate || new Date().toISOString().split('T')[0]}
                      value={formData.checkOutDate}
                      onChange={(e) => handleDateChange('checkOutDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Number of Guests *</label>
                  <select
                    value={formData.numberOfGuests}
                    onChange={(e) => setFormData({ ...formData, numberOfGuests: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    {[...Array(selectedRoom.capacity)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1} Guest{i > 0 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                {bookingDetails.numberOfNights > 0 && (
                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <h3 className="font-medium text-lg mb-4">Booking Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>₹{(selectedRoom.pricePerNight / 100).toLocaleString('en-IN')} × {bookingDetails.numberOfNights} night{bookingDetails.numberOfNights > 1 ? 's' : ''}</span>
                        <span>₹{(bookingDetails.roomPrice / 100).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax ({selectedRoom.taxPercent || 12}%)</span>
                        <span>₹{(bookingDetails.taxAmount / 100).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
                        <span>Total Amount</span>
                        <span className="text-amber-600">₹{(bookingDetails.totalAmount / 100).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={checkAvailability}
                  disabled={!formData.checkInDate || !formData.checkOutDate || loading}
                  className="w-full bg-amber-600 text-white py-4 rounded-lg font-medium hover:bg-amber-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {loading ? 'Checking Availability...' : 'Continue to Guest Details'}
                </button>
              </div>
            )}

            {/* Step 3: Guest Details */}
            {step === 3 && (
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Change Dates
                </button>

                <h2 className="font-serif text-3xl mb-6">Guest Details</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.guestName}
                      onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.guestEmail}
                        onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={formData.guestPhone}
                        onChange={(e) => setFormData({ ...formData, guestPhone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Special Requests (Optional)</label>
                    <textarea
                      rows={3}
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Any special requirements or preferences..."
                    />
                  </div>
                </div>

                <button
                  onClick={handleSubmitBooking}
                  disabled={!formData.guestName || !formData.guestEmail || !formData.guestPhone || loading}
                  className="w-full bg-amber-600 text-white py-4 rounded-lg font-medium hover:bg-amber-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed mt-6"
                >
                  {loading ? 'Processing...' : 'Proceed to Payment'}
                </button>
              </div>
            )}

            {/* Step 4: Payment Success */}
            {step === 4 && (
              <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="font-serif text-3xl mb-4">Booking Confirmed!</h2>
                <p className="text-gray-600 mb-8">
                  Payment integration coming soon. Your booking has been created successfully.
                </p>
                <button
                  onClick={() => router.push('/')}
                  className="bg-amber-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
                >
                  Return to Homepage
                </button>
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-600 border-t-transparent"></div>
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}