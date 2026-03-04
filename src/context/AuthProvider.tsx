import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AuthContext } from "./AuthContext";
import type { AuthUser } from "../context/Auth.types";
import { api } from "../api/index";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Use a ref to track mount state and avoid setState after unmount
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    const storedToken = localStorage.getItem("token");

    // No token — schedule loading=false asynchronously to avoid
    // the "setState synchronously within effect" warning
    if (!storedToken) {
      const timer = setTimeout(() => {
        if (isMounted.current) setLoading(false);
      }, 0);
      return () => {
        isMounted.current = false;
        clearTimeout(timer);
      };
    }

    api
      .get("/auth/me", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        if (!isMounted.current) return;
        setToken(storedToken);
        setUser(res.data.user);
      })
      .catch(() => {
        if (!isMounted.current) return;
        localStorage.removeItem("token");
      })
      .finally(() => {
        if (!isMounted.current) return;
        setLoading(false);
      });

    return () => {
      isMounted.current = false;
    };
  }, []);

  const login = useCallback((newToken: string, newUser: AuthUser) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(newUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAdmin: user?.role === "admin",
        isGuest: user?.role === "guest",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
