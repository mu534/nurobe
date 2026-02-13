import { Router } from "express";
import {
  createPayment,
  getPayments,
} from "../controllers/payments.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();
router.use(authMiddleware);

router.get("/", getPayments);
router.post("/", createPayment);

export default router;
