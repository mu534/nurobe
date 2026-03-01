import axios from "axios";
import type { Booking } from "../types/types";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function createBooking(data: {
  guestName: string;
  email: string;
  phone: string;
  specialRequests: string;
  roomId: number;
  checkIn: string;
  checkOut: string;
  guests: number;
}): Promise<Booking> {
  const res = await axios.post(`${API}/bookings`, data);
  return res.data;
}

export async function getBookings(): Promise<Booking[]> {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API}/bookings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function updateBookingStatus(
  id: number,
  status?: string,
  paymentStatus?: string,
): Promise<Booking> {
  const token = localStorage.getItem("token");
  const res = await axios.patch(
    `${API}/bookings/${id}/status`,
    { status, paymentStatus },
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return res.data;
}

export async function deleteBooking(id: number): Promise<void> {
  const token = localStorage.getItem("token");
  await axios.delete(`${API}/bookings/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
