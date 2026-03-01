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

export interface Booking {
  id: number;
  confirmationNo: string;
  guestName: string;
  email: string;
  phone: string;
  specialRequests: string;
  roomId: number;
  userId?: number;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  subtotal: number;
  tax: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "checked-in" | "completed" | "cancelled";
  paymentStatus: "unpaid" | "paid" | "refunded";
  createdAt: string;
  updatedAt: string;
  room?: Room;
}
