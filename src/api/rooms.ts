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
  data: RoomPayload,
  onProgress?: (progress: number) => void,
): Promise<Room> => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("type", data.type);
  formData.append("price", String(data.price));
  formData.append("maxGuests", String(data.maxGuests));
  formData.append("size", data.size);
  formData.append("bedType", data.bedType);
  formData.append("available", String(data.available));

  if (data.imageFile) formData.append("image", data.imageFile);
  if (data.imageUrl) formData.append("image", data.imageUrl);

  const res = await api.post<Room>("/rooms", formData, {
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
  data: RoomPayload,
  onProgress?: (progress: number) => void,
): Promise<Room> => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("type", data.type);
  formData.append("price", String(data.price));
  formData.append("maxGuests", String(data.maxGuests));
  formData.append("size", data.size);
  formData.append("bedType", data.bedType);
  formData.append("available", String(data.available));

  if (data.imageFile) formData.append("image", data.imageFile);
  if (data.imageUrl) formData.append("image", data.imageUrl);

  const res = await api.put<Room>(`/rooms/${id}`, formData, {
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
