import { sign } from "jsonwebtoken";

import { JWT_SECRET } from "../constants";

export const createToken = (userId: string): string => {
  const token = sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

  return token;
};
