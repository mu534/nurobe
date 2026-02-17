import { useState } from "react";
import type { ReactNode } from "react";
import { AuthContext, type AuthContextType } from "./AuthContext";

import type { AuthUser } from "../types/auth-user";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login: AuthContextType["login"] = async (email) => {
    setUser({ id: 1, name: "Test User", email });
  };

  const register: AuthContextType["register"] = async (name, email) => {
    setUser({ id: 1, name, email });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
