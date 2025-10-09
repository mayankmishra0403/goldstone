export interface Room {
  $id: string;
  name: string;
  slug: string;
  description: string;
  pricePerNight: number;
  capacity: number;
  beds: number;
  sizeSqFt?: number;
  imageUrls: string[];
  amenities?: string[];
  isAvailable: boolean;
}