import { Router } from "express";
import multer from "multer";
import { authMiddleware } from "../middleware/auth.middleware.ts";
import { prisma } from "../../lib/prisma.ts";
import { cloudinary } from "../../cloudinary.config.ts";

const router = Router();
router.use(authMiddleware);

// Use multer to store temporarily before upload to Cloudinary
const upload = multer({ dest: "temp/" });

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
// Accept up to 2 images
router.post("/", upload.array("images", 2), async (req, res) => {
  try {
    const { name, type, price, maxGuests, size, bedType, available } = req.body;

    const imageUrls: string[] = [];

    // Upload each file to Cloudinary
    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "rooms",
        });
        imageUrls.push(result.secure_url);
      }
    }

    // Fallback if client sends image URLs in body
    if (req.body.images) {
      const urls = Array.isArray(req.body.images)
        ? req.body.images
        : [req.body.images];
      imageUrls.push(...urls);
    }

    if (imageUrls.length !== 2) {
      return res
        .status(400)
        .json({ message: "Exactly 2 images are required." });
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
        image: imageUrls.join(","), // Store as CSV
      },
    });

    res.status(201).json(room);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create room" });
  }
});

// ================= UPDATE ROOM =================
router.put("/:id", upload.array("images", 2), async (req, res) => {
  try {
    const roomId = Number(req.params.id);
    if (!roomId) return res.status(400).json({ message: "Invalid room ID" });

    const imageUrls: string[] = [];

    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "rooms",
        });
        imageUrls.push(result.secure_url);
      }
    }

    if (req.body.images) {
      const urls = Array.isArray(req.body.images)
        ? req.body.images
        : [req.body.images];
      imageUrls.push(...urls);
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
        image: imageUrls.length > 0 ? imageUrls.join(",") : undefined,
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
