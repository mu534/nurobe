import { prisma } from "../../lib/prisma.ts";

interface RoomCreatePayload {
  name: string;
  type: string;
  price: number;
  maxGuests: number;
  size: string;
  bedType: string;
  available: boolean;
  images: string[];
}

export async function createRoomService(data: RoomCreatePayload) {
  const { images, ...rest } = data;

  return prisma.room.create({
    data: {
      ...rest,
      image: images.join(","),
    },
  });
}
