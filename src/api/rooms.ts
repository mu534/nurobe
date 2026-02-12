import { api } from "./index";
import type { Room } from "../types/types";

export const getRooms = async (): Promise<Room[]> => {
  const res = await api.get("/rooms");
  return res.data;
};

export const updateRoom = async (room: Room) => {
  const res = await api.put(`/rooms/${room.id}`, room);
  return res.data;
};

export const deleteRoom = async (id: number) => {
  await api.delete(`/rooms/${id}`);
};
