export interface Room {
  id: number;
  name: string;
  type: string;
  price: number;
  image: string; // comma-separated URLs e.g. "url1,url2"
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
