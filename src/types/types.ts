export interface Room {
  id: number;
  name: string;
  type: string;
  price: number;
  image: string;
  amenities: string;
  maxGuests: number;
  size: string;
  bedType: string;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

// Helper to get image array from comma-separated string
export function getRoomImages(room: Room): string[] {
  return room.image ? room.image.split(",").filter(Boolean) : [];
}
export function getRoomAmenities(room: Room): string[] {
  return room.amenities ? room.amenities.split(",").filter(Boolean) : [];
}
