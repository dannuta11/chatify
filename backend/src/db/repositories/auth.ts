import prismaClient from '@db/schema/client';
import {
  UsersCreateInput,
  UsersUncheckedCreateInput,
} from '@prisma-models/Users';

// Types

type User = Pick<
  Required<UsersCreateInput>,
  'id' | 'email' | 'username' | 'created_at'
>;

export const createUser = async (payload: UsersCreateInput): Promise<User> => {
  const user = await prismaClient.users.create({
    data: payload,
    select: {
      id: true,
      email: true,
      username: true,
      created_at: true,
    },
  });

  return user;
};

export const getUserList = async (): Promise<User[]> => {
  const users = await prismaClient.users.findMany({
    select: {
      id: true,
      email: true,
      username: true,
      created_at: true,
    },
  });

  return users;
};

export const findUserByEmail = async (
  email: string
): Promise<Required<UsersUncheckedCreateInput> | null> => {
  const user = await prismaClient.users.findUnique({
    where: { email },
  });

  return user;
};

export const deleteUserById = async (id: string) => {
  await prismaClient.users.delete({
    where: { id },
  });
};

export const findUserById = async (id: string): Promise<User | null> => {
  const user = await prismaClient.users.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      username: true,
      created_at: true,
    },
  });

  return user;
};
