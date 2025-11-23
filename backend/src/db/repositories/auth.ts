import { UsersCreateInput } from "../../generated/prisma/models/Users";
import prismaClient from "../schema/client";

export const createUser = async (
  payload: UsersCreateInput,
): Promise<UsersCreateInput> => {
  const user = await prismaClient.users.create({
    data: payload,
  });

  return user;
};

export const getUserList = async (): Promise<UsersCreateInput[]> => {
  const users = await prismaClient.users.findMany();
  return users;
};

export const findUserByEmail = async (
  email: string,
): Promise<UsersCreateInput | null> => {
  const user = await prismaClient.users.findUnique({
    where: { email },
  });

  return user;
};

export const deleteUserById = async (id: number) => {
  await prismaClient.users.delete({
    where: { id },
  });
};

export const findUserById = async (
  id: number,
): Promise<UsersCreateInput | null> => {
  const user = await prismaClient.users.findUnique({
    where: { id },
  });

  return user;
};
