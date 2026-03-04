export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: "admin" | "guest";
}

export interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
  isAdmin: boolean;
  isGuest: boolean;
}
