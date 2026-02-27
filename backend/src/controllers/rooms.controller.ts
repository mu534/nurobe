import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.ts";
import multer from "multer";
import fs from "fs";

// Setup multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/rooms";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `room-${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({ storage }).array("images", 2);

// Helper to safely parse booleans
const parseBoolean = (value: unknown) => value === "true" || value === true;

// Get all rooms
export const getRooms = async (req: Request, res: Response) => {
  const rooms = await prisma.room.findMany();
  res.json(rooms);
};

// Get room by ID
export const getRoomById = async (req: Request, res: Response) => {
  const room = await prisma.room.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!room) return res.status(404).json({ message: "Room not found" });
  res.json(room);
};

// Create room
export const createRoom = async (req: Request, res: Response) => {
  try {
    const { name, type, price, available, maxGuests, size, bedType } = req.body;

    const uploadedFiles = req.files as Express.Multer.File[] | undefined;
    if (!uploadedFiles || uploadedFiles.length !== 2) {
      return res
        .status(400)
        .json({ message: "Exactly 2 images are required." });
    }

    const images = uploadedFiles.map((file) => file.path);

    const room = await prisma.room.create({
      data: {
        name,
        type,
        price: Number(price),
        available: parseBoolean(available),
        maxGuests: Number(maxGuests),
        size,
        bedType,
        image: images.join(","), // store as CSV
      },
    });

    res.status(201).json(room);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create room" });
  }
};

// Update room
export const updateRoom = async (req: Request, res: Response) => {
  try {
    const roomId = Number(req.params.id);
    if (!roomId) return res.status(400).json({ message: "Invalid room ID" });

    const { name, type, price, available, maxGuests, size, bedType } = req.body;
    const uploadedFiles = req.files as Express.Multer.File[] | undefined;

    const images = uploadedFiles?.length
      ? uploadedFiles.map((file) => file.path).join(",")
      : undefined;

    const room = await prisma.room.update({
      where: { id: roomId },
      data: {
        name,
        type,
        price: Number(price),
        available: parseBoolean(available),
        maxGuests: Number(maxGuests),
        size,
        bedType,
        ...(images ? { image: images } : {}),
      },
    });

    res.json(room);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Room not found" });
  }
};

// Delete room
export const deleteRoom = async (req: Request, res: Response) => {
  try {
    await prisma.room.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "Room deleted" });
  } catch {
    res.status(404).json({ message: "Room not found" });
  }
};
