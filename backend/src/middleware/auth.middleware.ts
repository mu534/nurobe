import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../../lib/prisma.ts";

// ================= Type =================
// Extend Express Request with our own user shape
export interface AuthRequest extends Request {
  authUser?: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

// ================= Auth Middleware =================
export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
    };

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) return res.status(401).json({ message: "User not found" });

    // Use authUser instead of user to avoid conflict with Express.User
    req.authUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (err) {
    if (err instanceof Error) {
      return res.status(401).json({ message: "Invalid token" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ================= Admin Middleware =================
export const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.authUser?.role !== "ADMIN") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};
