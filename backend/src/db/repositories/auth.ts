import {
  UsersCreateInput,
  UsersUncheckedCreateInput,
} from '../../generated/prisma/models/Users';
import prismaClient from '@db/schema/client';

// Types
export type AuthUser = Required<UsersUncheckedCreateInput>;

export const createUser = async (
  payload: UsersCreateInput
): Promise<AuthUser> => {
  const user = await prismaClient.users.create({
    data: payload,
  });

  return user;
};

export const getUserList = async (): Promise<AuthUser[]> => {
  const users = await prismaClient.users.findMany();

  return users;
};

export const findUserByEmail = async (
  email: string
): Promise<AuthUser | null> => {
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

export const findUserById = async (id: string): Promise<AuthUser | null> => {
  const user = await prismaClient.users.findUnique({
    where: { id },
  });

  return user;
};
