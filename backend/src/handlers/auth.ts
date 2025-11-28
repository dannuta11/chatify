import { createUser as initializeUser } from '@db/repositories/auth';
import { UsersCreateInput } from '@prisma-models/Users';
import { hashPassword } from '@utils/bcrypt';

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
