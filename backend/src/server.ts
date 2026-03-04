import "./passport.config.ts";
import passport from "passport";
import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.ts";
import roomsRoutes from "./routes/rooms.routes.ts";
import bookingsRoutes from "./routes/bookings.routes.ts";
import paymentsRoutes from "./routes/payments.routes.ts";

dotenv.config();

const app = express();
const PORT: number = Number(process.env.PORT) || 5000;

/* ======================
   Security & Core Middleware
====================== */
app.use(helmet());
app.use(cors());
app.use(express.json());

/* ======================
   API Routes
====================== */
app.use(passport.initialize());
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomsRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/payments", paymentsRoutes);

/* ======================
   Health Check Endpoint
====================== */
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

/* ======================
   Custom HTTP Error Class
====================== */
export class HttpError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

/* ======================
   Global Error Handler
====================== */
interface AppError extends Error {
  statusCode?: number;
}

app.use((err: AppError, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.statusCode ?? 500;
  console.error(`[ERROR] ${err.message}`);
  res.statusCode = status;
  res.json({
    success: false,
    message: err.message ?? "Internal Server Error",
  });
});
/* ======================
   Start Server
====================== */
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

/* ======================
   Graceful Shutdown
====================== */
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down...");
  server.close(() => {
    console.log("Process terminated.");
  });
});

process.on("unhandledRejection", (reason: unknown) => {
  console.error("Unhandled Rejection:", reason);
  server.close(() => process.exit(1));
});
