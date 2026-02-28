export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "guest";
  createdAt: string;
  updatedAt: string;
}
