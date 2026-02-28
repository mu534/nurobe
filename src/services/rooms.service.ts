import { api } from "./api";

export interface Room {
  id: number;
  name: string;
  type: string;
  price: number;
  maxGuests: number;
  size: string;
  bedType: string;
  available: boolean;
  image: string;
}

export const getRooms = async () => {
  const response = await api.get<Room[]>("/rooms");
  return response.data;
};

export const getRoomById = async (id: number) => {
  const response = await api.get<Room>(`/rooms/${id}`);
  return response.data;
};

export const createRoom = async (data: Omit<Room, "id">) => {
  const response = await api.post("/rooms", data);
  return response.data;
};

export const updateRoom = async (id: number, data: Partial<Room>) => {
  const response = await api.put(`/rooms/${id}`, data);
  return response.data;
};

export const deleteRoom = async (id: number) => {
  const response = await api.delete(`/rooms/${id}`);
  return response.data;
};
