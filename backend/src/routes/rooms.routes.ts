import { Router } from "express";
import multer from "multer";
import { authMiddleware } from "../middleware/auth.middleware.ts";
import {
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
} from "../controllers/rooms.controller.ts";
import { createRoomService } from "../services/rooms.service.ts";
import { cloudinary } from "../../lib/cloudinary.js";

const router = Router();

// Middleware for auth
router.use(authMiddleware);

// Configure multer for temp storage
const upload = multer({ dest: "temp/" });

// Routes
router.get("/", getRooms);
router.get("/:id", getRoomById);

// POST route with Cloudinary
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, type, price, maxGuests, size, bedType, available } = req.body;

    let imageUrl = "";
    if (req.file) {
      // Upload local file to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "rooms",
      });
      imageUrl = result.secure_url;
    } else if (req.body.image) {
      // Use URL if provided
      imageUrl = req.body.image;
    }

    const room = await createRoomService({
      name,
      type,
      price: parseFloat(price),
      maxGuests: parseInt(maxGuests),
      size,
      bedType,
      available: available === "true",
      image: imageUrl,
    });

    res.status(201).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create room" });
  }
});

router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);

export default router;
