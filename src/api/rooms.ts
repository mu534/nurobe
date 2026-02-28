import { api } from "./index";
import type { Room } from "../types/types";

export type RoomPayload = Omit<Room, "id" | "image"> & {
  imageFile?: File | null;
  imageUrl?: string;
};

const getToken = () => localStorage.getItem("token") ?? "";

const getAuthHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
});

export const getRooms = async (): Promise<Room[]> => {
  const res = await api.get<Room[]>("/rooms", {
    headers: getToken() ? getAuthHeaders() : undefined,
  });
  return res.data;
};

export const getRoomById = async (id: number): Promise<Room> => {
  const res = await api.get<Room>(`/rooms/${id}`, {
    headers: getToken() ? getAuthHeaders() : undefined,
  });
  return res.data;
};

export const createRoom = async (
  data: FormData,
  onProgress?: (progress: number) => void,
): Promise<Room> => {
  const res = await api.post<Room>("/rooms", data, {
    headers: { ...getAuthHeaders(), "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => {
      if (!onProgress || !e.total) return;
      onProgress(Math.round((e.loaded * 100) / e.total));
    },
  });
  return res.data;
};

export const updateRoom = async (
  id: number,
  data: FormData | RoomPayload,
  onProgress?: (progress: number) => void,
): Promise<Room> => {
  let payload: FormData;

  if (data instanceof FormData) {
    payload = data;
  } else {
    // Called from toggleAvailability with a plain object
    payload = new FormData();
    payload.append("name", data.name);
    payload.append("type", data.type);
    payload.append("price", String(data.price));
    payload.append("maxGuests", String(data.maxGuests));
    payload.append("size", data.size);
    payload.append("bedType", data.bedType);
    payload.append("available", String(data.available));
  }

  const res = await api.put<Room>(`/rooms/${id}`, payload, {
    headers: { ...getAuthHeaders(), "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => {
      if (!onProgress || !e.total) return;
      onProgress(Math.round((e.loaded * 100) / e.total));
    },
  });
  return res.data;
};

export const deleteRoom = async (id: number): Promise<void> => {
  await api.delete(`/rooms/${id}`, { headers: getAuthHeaders() });
};
