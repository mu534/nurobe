import { Router } from "express";
import {
  getBookings,
  createBooking,
} from "../controllers/bookings.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();
router.use(authMiddleware);

router.get("/", getBookings);
router.post("/", createBooking);

export default router;
