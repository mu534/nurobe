import type { ReactNode } from "react";

export interface Room {
  available: unknown;
  maxGuests: ReactNode;
  size: ReactNode;
  bedType: ReactNode;
  id: number;
  name: string;
  type: string;
  price: number;
  image: string;
}
