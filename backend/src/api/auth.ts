import { Request, Response, Router } from 'express';
import { z } from 'zod';

import { findUserByEmail } from '@db/repositories/auth';
import { createUser } from '@handlers/auth';
import { UsersCreateInput } from '@prisma-models/Users';
import { comparePassword } from '@utils/bcrypt';
import { camelCaseKeys } from '@utils/camel-case-keys';
import { Send } from '@utils/responses';
import { generateAccessToken, generateRefreshToken } from '@utils/token';
import { LoginSchema, RegisterSchema } from '@validations/auth';

// Types
export interface LoginPayload
  extends Pick<UsersCreateInput, 'email' | 'password'> {}

type LoginBody = z.infer<typeof LoginSchema>;
type RegisterBody = z.infer<typeof RegisterSchema>;

// Router
const router = Router();

router.post(
  '/login',
  async (req: Request<unknown, unknown, LoginBody>, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await findUserByEmail(email);

      if (user === null) {
        return Send.clientErrorResponses(res, {
          message: 'User not found',
          statusCode: 404,
        });
      }

      const isMatchingPasswords = await comparePassword(
        password,
        user.password
      );

      if (isMatchingPasswords === false) {
        return Send.clientErrorResponses(res, {
          message: 'Invalid credentials',
          statusCode: 401,
        });
      }

      const accessToken = generateAccessToken(user.id);
      const refreshToken = generateRefreshToken(user.id);

      Send.successfulResponses(res, {
        accessToken,
        refreshToken,
      });
    } catch {
      Send.serverErrorResponses(res, {
        message: 'Login failed',
      });
    }
  }
);

router.post(
  '/register',
  async (req: Request<unknown, unknown, RegisterBody>, res: Response) => {
    try {
      const payload = req.body;
      const userPayload = {
        username: payload.username.trim(),
        email: payload.email.trim(),
        password: payload.password.trim(),
      };
      const { username, email, password } = userPayload;

      if (!username && !email && !password) {
        return Send.clientErrorResponses(res, {
          message: 'Missing required fields',
          statusCode: 400,
        });
      }

      if (username === '') {
        res.status(400).json({ error: 'Missing username' });
        return;
      }

      if (email === '') {
        res.status(400).json({ error: 'Missing email' });
        return;
      }

      if (password === '') {
        res.status(400).json({ error: 'Missing password' });
        return;
      }

      const checkExistingUser = await findUserByEmail(email);

      if (checkExistingUser !== null) {
        Send.clientErrorResponses(res, {
          message: 'This email is already registered',
          statusCode: 409,
        });
        return;
      }

      const user = await createUser(userPayload);
      const camelCasedUser = camelCaseKeys(user);
      Send.successfulResponses(res, camelCasedUser, 201);
    } catch {
      Send.serverErrorResponses(res, { message: 'Registration failed' });
    }
  }
);

export default router;
