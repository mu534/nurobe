export interface Room {
  id: number;
  name: string;
  type: string;
  price: number;
  image: string;
  available: boolean;
  maxGuests: number;
  size: string;
  bedType: string;
}

export type RoomPayload = Omit<Room, "id"> & {
  images: File[];
};
