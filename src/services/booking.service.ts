import { api } from "./api";

export interface Booking {
  id: number;
  roomId: number;
  userId: number;
  checkIn: string;
  checkOut: string;
  status: string;
}

export const getBookings = async () => {
  const response = await api.get("/bookings");
  return response.data;
};

export const createBooking = async (data: {
  roomId: number;
  checkIn: string;
  checkOut: string;
}) => {
  const response = await api.post("/bookings", data);
  return response.data;
};
