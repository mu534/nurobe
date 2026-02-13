import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import {
  hashPassword,
  comparePassword,
  generateToken,
} from "../utils/helpers.js";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser)
    return res.status(400).json({ message: "Email already exists" });

  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });
  const token = generateToken(user.id);
  res.status(201).json({ user, token });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const valid = await comparePassword(password, user.password);
  if (!valid) return res.status(400).json({ message: "Invalid credentials" });

  const token = generateToken(user.id);
  res.json({ user, token });
};
