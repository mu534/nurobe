import jwt from "jsonwebtoken";

// Type for JWT payload
export interface UserPayload {
  id: string;
  role: "ADMIN" | "USER";
}

// Generate access token (short-lived)
export const generateAccessToken = (user: UserPayload): string => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_ACCESS_SECRET!,
    { expiresIn: "15m" },
  );
};

// Generate refresh token (long-lived)
export const generateRefreshToken = (user: UserPayload): string => {
  return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "7d",
  });
};
