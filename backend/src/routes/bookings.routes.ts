import { Router } from "express";
import {
  getBookings,
  createBooking,
} from "../controllers/bookings.controller.ts";
import { authMiddleware } from "../middleware/auth.middleware.ts";

const router = Router();
router.use(authMiddleware);

router.get("/", getBookings);
router.post("/", createBooking);

export default router;
