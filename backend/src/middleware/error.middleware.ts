import type { Request, Response } from "express";

export const errorHandler = (err: unknown, req: Request, res: Response) => {
  if (err instanceof Error) {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
  } else {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
