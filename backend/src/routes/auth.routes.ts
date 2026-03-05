import { Router, type Request, type Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma.ts";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// ================= REGISTER =================
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required" });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        phone: phone ?? "",
        role: "USER" as never,
      },
    });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar ?? null,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
});

// ================= LOGIN =================
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.password) {
      return res.status(401).json({ message: "Please sign in with Google" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar ?? null,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
});

// ================= GOOGLE OAUTH =================
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${CLIENT_URL}/login?error=google`,
  }),
  (req: Request, res: Response) => {
    const user = req.user as {
      id: number;
      role: string;
      name: string;
      email: string;
      avatar?: string | null;
    };

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // ✅ ADMIN uppercase to match DB enum
    const redirectTo = user.role === "ADMIN" ? "/admin" : "/";
    res.redirect(
      `${CLIENT_URL}/auth/callback?token=${token}&role=${user.role}&redirect=${redirectTo}`,
    );
  },
);

// ================= ME (verify token) =================
router.get("/me", async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token" });

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: number;
      role: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
});

export default router;
