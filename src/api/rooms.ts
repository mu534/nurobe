import { api } from "./index";
import type { Room } from "../types/types";

// Helper to get JWT from localStorage (or your auth state)
const getToken = (): string | null => localStorage.getItem("token");

export const getRooms = async (): Promise<Room[]> => {
  try {
    const token = getToken();
    const res = await api.get<Room[]>("/rooms", {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Failed to fetch rooms");
  }
};

export const getRoomById = async (id: number): Promise<Room> => {
  try {
    const token = getToken();
    const res = await api.get<Room>(`/rooms/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error(`Failed to fetch room ${id}`);
  }
};

export const createRoom = async (room: Omit<Room, "id">): Promise<Room> => {
  try {
    const token = getToken();
    if (!token) throw new Error("You must be logged in to create a room");

    const res = await api.post<Room>("/rooms", room, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Failed to create room");
  }
};

export const updateRoom = async (room: Room): Promise<Room> => {
  try {
    const token = getToken();
    if (!token) throw new Error("You must be logged in to update a room");

    const res = await api.put<Room>(`/rooms/${room.id}`, room, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error(`Failed to update room ${room.id}`);
  }
};

export const deleteRoom = async (id: number): Promise<void> => {
  try {
    const token = getToken();
    if (!token) throw new Error("You must be logged in to delete a room");

    await api.delete(`/rooms/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error(`Failed to delete room ${id}`);
  }
};
