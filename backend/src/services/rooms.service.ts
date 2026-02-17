import { prisma } from "../../lib/prisma.ts";

export async function createRoomService(data: {
  name: string;
  type: string;
  price: number;
  maxGuests: number;
  size: string;
  bedType: string;
  available: boolean;
  image: string;
}) {
  return prisma.room.create({ data });
}
