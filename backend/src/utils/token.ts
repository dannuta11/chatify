import { sign, verify } from 'jsonwebtoken';

import { JWT_SECRET } from '@constants/index';

export const generateAccessToken = (userId: string): string => {
  const token = sign({ userId }, JWT_SECRET, {
    expiresIn: '7d',
  });

  return token;
};

export const generateRefreshToken = (userId: string): string => {
  const token = sign({ userId }, JWT_SECRET);

  return token;
};

export const verifyToken = <T>(token: string): T => {
  const decoded = verify(token, JWT_SECRET);
  return decoded as T;
};
