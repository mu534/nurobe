import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.ts";
export const getRooms = async (req: Request, res: Response) => {
  const rooms = await prisma.room.findMany();
  res.json(rooms);
};

export const getRoomById = async (req: Request, res: Response) => {
  const room = await prisma.room.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!room) return res.status(404).json({ message: "Room not found" });
  res.json(room);
};

export const createRoom = async (req: Request, res: Response) => {
  const room = await prisma.room.create({ data: req.body });
  res.status(201).json(room);
};

export const updateRoom = async (req: Request, res: Response) => {
  try {
    const room = await prisma.room.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.json(room);
  } catch {
    res.status(404).json({ message: "Room not found" });
  }
};

export const deleteRoom = async (req: Request, res: Response) => {
  try {
    await prisma.room.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "Room deleted" });
  } catch {
    res.status(404).json({ message: "Room not found" });
  }
};
