import { Router } from "express";
import {
  createPayment,
  getPayments,
} from "../controllers/payments.controller.ts";
import { authMiddleware } from "../middleware/auth.middleware.ts";

const router = Router();
router.use(authMiddleware);

router.get("/", getPayments);
router.post("/", createPayment);

export default router;
