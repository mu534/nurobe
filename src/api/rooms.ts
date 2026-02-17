// src/api/rooms.ts
import { api } from "./index";
import type { Room } from "../types/types";

export const getRooms = async (): Promise<Room[]> => {
  try {
    const res = await api.get<Room[]>("/rooms");
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch rooms");
  }
};

export const getRoomById = async (id: number): Promise<Room> => {
  try {
    const res = await api.get<Room>(`/rooms/${id}`);
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(`Failed to fetch room ${id}`);
  }
};

export const createRoom = async (room: Omit<Room, "id">): Promise<Room> => {
  try {
    const res = await api.post<Room>("/rooms", room);
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to create room");
  }
};

export const updateRoom = async (room: Room): Promise<Room> => {
  try {
    const res = await api.put<Room>(`/rooms/${room.id}`, room);
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(`Failed to update room ${room.id}`);
  }
};

export const deleteRoom = async (id: number): Promise<void> => {
  try {
    await api.delete(`/rooms/${id}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(`Failed to delete room ${id}`);
  }
};
