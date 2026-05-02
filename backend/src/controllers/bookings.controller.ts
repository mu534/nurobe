import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.ts";

// AuthRequest typed according to your User model
export interface AuthRequest extends Request {
  user?: {
    id: number;
    name: string;
    email: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
  };
}

export const getBookings = async (req: AuthRequest, res: Response) => {
  const bookings = await prisma.booking.findMany({
    include: { room: true, user: true, payment: true },
  });
  res.json(bookings);
};

export const createBooking = async (req: AuthRequest, res: Response) => {
  const { roomId, checkIn, checkOut, guestName, email, phone, specialRequests, guests } = req.body;

  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  const room = await prisma.room.findUnique({ where: { id: Number(roomId) } });
  if (!room) return res.status(404).json({ message: "Room not found" });

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const nights = Math.ceil(
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  const subtotal = room.price * nights;
  const tax = subtotal * 0.1;
  const totalPrice = subtotal + tax;

  const confirmationNo = `NRB-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  const booking = await prisma.booking.create({
    data: {
      confirmationNo,
      guestName: guestName ?? req.user.name,
      email: email ?? req.user.email,
      phone: phone ?? "",
      specialRequests: specialRequests ?? "",
      roomId: Number(roomId),
      userId: req.user.id,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: Number(guests) || 1,
      nights,
      subtotal,
      tax,
      totalPrice,
      status: "pending",
      paymentStatus: "unpaid",
    },
    include: { room: true, user: true },
  });

  res.status(201).json(booking);
};
