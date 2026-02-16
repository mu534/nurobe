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
  const { roomId, checkIn, checkOut } = req.body;

  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  const booking = await prisma.booking.create({
    data: {
      roomId,
      userId: req.user.id,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
    },
    include: { room: true, user: true },
  });

  res.status(201).json(booking);
};
