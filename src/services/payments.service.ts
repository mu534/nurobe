import { api } from "./api";

export interface Payment {
  id: number;
  bookingId: number;
  amount: number;
  method: string;
  status: string;
}

export const getPayments = async () => {
  const response = await api.get("/payments");
  return response.data;
};

export const createPayment = async (data: {
  bookingId: number;
  amount: number;
  method: string;
}) => {
  const response = await api.post("/payments", data);
  return response.data;
};
