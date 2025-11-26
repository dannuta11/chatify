import { UsersCreateInput } from '../generated/prisma/models/Users';
import { createUser as initializeUser } from '../db/repositories';
import { hashPassword } from '../helpers';

export const createUser = async ({
  username,
  email,
  password,
}: UsersCreateInput): Promise<UsersCreateInput> => {
  const hashedPassword = await hashPassword(password);

  const user = await initializeUser({
    username,
    email,
    password: hashedPassword,
  });

  return user;
};
