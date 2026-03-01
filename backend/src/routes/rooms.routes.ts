import { Router } from "express";
import multer from "multer";
import { authMiddleware } from "../middleware/auth.middleware.ts";
import { prisma } from "../../lib/prisma.ts";
import { cloudinary } from "../../cloudinary.config.ts";

const router = Router();
router.use(authMiddleware);

// ================= Multer Setup =================
const upload = multer({ dest: "temp/" });

// ================= Helper Functions =================
function sanitizeString(value: unknown): string | undefined {
  return typeof value === "string" &&
    value.trim() !== "" &&
    value !== "undefined"
    ? value
    : undefined;
}

function sanitizeNumber(value: unknown): number | undefined {
  const num = Number(value);
  return !isNaN(num) ? num : undefined;
}

function sanitizeBoolean(value: unknown): boolean | undefined {
  if (value === undefined) return undefined;
  return value === "true" || value === true;
}

// ================= GET ALL ROOMS =================
router.get("/", async (req, res) => {
  try {
    const rooms = await prisma.room.findMany();
    res.json(rooms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch rooms" });
  }
});

// ================= GET SINGLE ROOM =================
router.get("/:id", async (req, res) => {
  const roomId = Number(req.params.id);
  if (isNaN(roomId))
    return res.status(400).json({ message: "Invalid room ID" });

  try {
    const room = await prisma.room.findUnique({ where: { id: roomId } });
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json(room);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch room" });
  }
});

// ================= CREATE ROOM =================
router.post("/", upload.array("images", 2), async (req, res) => {
  try {
    const { name, type, price, maxGuests, size, bedType, available } = req.body;

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

    if (imageUrls.length !== 2) {
      return res
        .status(400)
        .json({ message: "Exactly 2 images are required." });
    }

    const room = await prisma.room.create({
      data: {
        name: sanitizeString(name) ?? "",
        type: sanitizeString(type) ?? "",
        price: sanitizeNumber(price) ?? 0,
        maxGuests: sanitizeNumber(maxGuests) ?? 1,
        size: sanitizeString(size) ?? "",
        bedType: sanitizeString(bedType) ?? "",
        available: sanitizeBoolean(available) ?? true,
        image: imageUrls.join(","),
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
  const roomId = Number(req.params.id);
  if (isNaN(roomId))
    return res.status(400).json({ message: "Invalid room ID" });

  try {
    const { name, type, price, maxGuests, size, bedType, available } = req.body;

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

    // ✅ Sanitize all values to correct types before passing to Prisma
    const sanitizedName = sanitizeString(name);
    const sanitizedType = sanitizeString(type);
    const sanitizedPrice = sanitizeNumber(price);
    const sanitizedMaxGuests = sanitizeNumber(maxGuests);
    const sanitizedSize = sanitizeString(size);
    const sanitizedBedType = sanitizeString(bedType);
    const sanitizedAvailable = sanitizeBoolean(available);

    const room = await prisma.room.update({
      where: { id: roomId },
      data: {
        ...(sanitizedName !== undefined ? { name: sanitizedName } : {}),
        ...(sanitizedType !== undefined ? { type: sanitizedType } : {}),
        ...(sanitizedPrice !== undefined ? { price: sanitizedPrice } : {}),
        ...(sanitizedMaxGuests !== undefined
          ? { maxGuests: sanitizedMaxGuests }
          : {}),
        ...(sanitizedSize !== undefined ? { size: sanitizedSize } : {}),
        ...(sanitizedBedType !== undefined
          ? { bedType: sanitizedBedType }
          : {}),
        ...(sanitizedAvailable !== undefined
          ? { available: sanitizedAvailable }
          : {}),
        ...(imageUrls.length > 0 ? { image: imageUrls.join(",") } : {}),
      },
    });

    res.json(room);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Room not found" });
  }
});

// ================= DELETE ROOM =================
router.delete("/:id", async (req, res) => {
  const roomId = Number(req.params.id);
  if (isNaN(roomId))
    return res.status(400).json({ message: "Invalid room ID" });

  try {
    await prisma.room.delete({ where: { id: roomId } });
    res.json({ message: "Room deleted" });
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Room not found" });
  }
});

export default router;
