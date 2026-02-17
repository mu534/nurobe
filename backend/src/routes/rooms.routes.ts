import { Router } from "express";
import multer from "multer";
import { authMiddleware } from "../middleware/auth.middleware.ts";
import { prisma } from "../../lib/prisma.ts";
import { cloudinary } from "cloudinary.ts";
// Multer config for temporary storage
const upload = multer({ dest: "temp/" });

const router = Router();
router.use(authMiddleware);

// GET all rooms
router.get("/", async (req, res) => {
  const rooms = await prisma.room.findMany();
  res.json(rooms);
});

// GET single room
router.get("/:id", async (req, res) => {
  const room = await prisma.room.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!room) return res.status(404).json({ message: "Room not found" });
  res.json(room);
});

// CREATE new room with Cloudinary
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, type, price, maxGuests, size, bedType, available } = req.body;

    let imageUrl = "";

    // 1️⃣ If file uploaded locally, upload to Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "rooms",
      });
      imageUrl = result.secure_url;
    }
    // 2️⃣ Else, if image URL provided, use it
    else if (req.body.image) {
      imageUrl = req.body.image;
    }

    // Create room in database
    const room = await prisma.room.create({
      data: {
        name,
        type,
        price: parseFloat(price),
        maxGuests: parseInt(maxGuests),
        size,
        bedType,
        available: available === "true",
        image: imageUrl,
      },
    });

    res.status(201).json(room);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create room" });
  }
});

// UPDATE room
router.put("/:id", async (req, res) => {
  try {
    const room = await prisma.room.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.json(room);
  } catch {
    res.status(404).json({ message: "Room not found" });
  }
});

// DELETE room
router.delete("/:id", async (req, res) => {
  try {
    await prisma.room.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "Room deleted" });
  } catch {
    res.status(404).json({ message: "Room not found" });
  }
});

export default router;
