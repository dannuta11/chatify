import { Request, Response } from 'express';
import { z } from 'zod';

import AuthRepository from '@db/repositories/auth';
import UserRepository from '@db/repositories/users';
import { UsersCreateInput } from '@prisma-models/Users';
import { comparePassword, hashPassword } from '@utils/bcrypt';
import { camelCaseKeys } from '@utils/camel-case-keys';
import { Send } from '@utils/responses';
import { generateAccessToken, generateRefreshToken } from '@utils/token';
import { LoginSchema, RegisterSchema } from '@validations/auth';

// Types
export interface LoginPayload
  extends Pick<UsersCreateInput, 'email' | 'password'> {}

type LoginBody = z.infer<typeof LoginSchema>;
type RegisterBody = z.infer<typeof RegisterSchema>;

export class Auth {
  static async login(req: Request<unknown, unknown, LoginBody>, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await UserRepository.findUserByEmail(email);

      if (user === null) {
        Send.notFoundResponse(res, 'User not found');
        return;
      }

      const isMatchingPasswords = await comparePassword(
        password,
        user.password
      );

      if (isMatchingPasswords === false) {
        Send.unauthorizedResponse(res, 'Invalid credentials');
        return;
      }

      const accessToken = generateAccessToken(user.id);
      const refreshToken = generateRefreshToken(user.id);

      Send.okResponse(res, {
        accessToken,
        refreshToken,
      });
    } catch {
      Send.internalServerErrorResponse(res, 'Login failed');
    }
  }

  static async register(
    req: Request<unknown, unknown, RegisterBody>,
    res: Response
  ) {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        Send.badRequestResponse(res, 'Missing required fields');
        return;
      }

      const checkExistingUser = await UserRepository.findUserByEmail(email);

      if (checkExistingUser !== null) {
        Send.conflictResponse(res, 'This email is already registered');
        return;
      }

      const hashedPassword = await hashPassword(password);
      const user = await AuthRepository.register({
        username,
        email,
        password: hashedPassword,
      });

      const camelCasedUser = camelCaseKeys(user);
      Send.createdResponse(res, camelCasedUser);
    } catch {
      Send.internalServerErrorResponse(res, 'Registration failed');
    }
  }
}
