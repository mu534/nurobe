export interface Room {
  id: number;
  name: string;
  type: string;
  price: number;
  available: boolean;
  image: string;
  maxGuests: number;
  size: string;
  bedType: string;
}

export interface Payment {
  id: number;
  bookingId: number;
  amount: number;
  method: string;
  status: string;
  date: string;
}

export interface Booking {
  id: number;
  roomId: number;
  guestName: string;
  totalPrice: number;
  paymentStatus: string;
  startDate: string;
  endDate: string;
}
