import { sign } from "jsonwebtoken";

import { JWT_SECRET } from "../constants";

export const generateAccessToken = (userId: number): string => {
  const token = sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

  return token;
};

export const generateRefreshToken = (userId: number): string => {
  const token = sign({ userId }, JWT_SECRET);

  return token;
};
