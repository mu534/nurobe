import type { Response } from "express";
import { prisma } from "../../lib/prisma.ts";
import type { AuthRequest } from "../middleware/auth.middleware.ts";

export const createPayment = async (req: AuthRequest, res: Response) => {
  const { bookingId, amount, method } = req.body;
  const payment = await prisma.payment.create({
    data: { bookingId, amount, method, status: "paid" },
  });
  res.status(201).json(payment);
};

export const getPayments = async (req: AuthRequest, res: Response) => {
  const payments = await prisma.payment.findMany({
    include: { booking: true },
  });
  res.json(payments);
};
