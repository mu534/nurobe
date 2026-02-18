import { Router } from "express";
import multer from "multer";
import { authMiddleware } from "../middleware/auth.middleware.ts";
import { prisma } from "../../lib/prisma.ts";
import { cloudinary } from "../../cloudinary.config.ts";

const upload = multer({ dest: "temp/" });
const router = Router();

router.use(authMiddleware);

// ================= GET ALL ROOMS =================
router.get("/", async (req, res) => {
  const rooms = await prisma.room.findMany();
  res.json(rooms);
});

// ================= GET SINGLE ROOM =================
router.get("/:id", async (req, res) => {
  const room = await prisma.room.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!room) return res.status(404).json({ message: "Room not found" });
  res.json(room);
});

// ================= CREATE ROOM =================
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, type, price, maxGuests, size, bedType, available } = req.body;

    let imageUrl = "";

    // Upload file to Cloudinary if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "rooms",
      });
      imageUrl = result.secure_url;
    } else if (req.body.image) {
      imageUrl = req.body.image;
    }

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

// ================= UPDATE ROOM =================
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const roomId = Number(req.params.id);
    if (!roomId) return res.status(400).json({ message: "Invalid room ID" });

    let imageUrl = req.body.imageUrl ?? req.body.image ?? "";

    // Upload new file if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "rooms",
      });
      imageUrl = result.secure_url;
    }

    const room = await prisma.room.update({
      where: { id: roomId },
      data: {
        ...req.body,
        price: req.body.price ? parseFloat(req.body.price) : undefined,
        maxGuests: req.body.maxGuests
          ? parseInt(req.body.maxGuests)
          : undefined,
        available:
          req.body.available !== undefined
            ? req.body.available === "true" || req.body.available === true
            : undefined,
        image: imageUrl || undefined,
      },
    });

    res.json(room);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Room not found" });
  }
});

// ================= DELETE ROOM =================
router.delete("/:id", async (req, res) => {
  try {
    await prisma.room.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "Room deleted" });
  } catch {
    res.status(404).json({ message: "Room not found" });
  }
});

export default router;
