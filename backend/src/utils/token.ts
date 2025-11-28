import { sign } from 'jsonwebtoken';

import { JWT_SECRET } from '@constants';

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
