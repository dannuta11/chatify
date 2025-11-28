import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;

if (!process.env.JWT_SECRET) {
  throw new Error(
    'JWT_SECRET environment variable is not set. Application cannot start without a valid JWT secret.'
  );
}
export const JWT_SECRET = process.env.JWT_SECRET;
