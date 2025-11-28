import { createUser as initializeUser } from '@db/repositories/auth';
import { UsersCreateInput } from '@prisma-models/Users';
import { hashPassword } from '@utils/bcrypt';

// Types
type User = Pick<UsersCreateInput, 'id' | 'email' | 'username'>;

export const createUser = async ({
  username,
  email,
  password,
}: UsersCreateInput): Promise<User> => {
  const hashedPassword = await hashPassword(password);

  const user = await initializeUser({
    username,
    email,
    password: hashedPassword,
  });

  return user;
};
