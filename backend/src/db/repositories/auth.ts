import { UsersCreateInput } from "../../generated/prisma/models/Users";
import prismaClient from "../schema/client";

export const createUser = async (
  payload: UsersCreateInput
): Promise<UsersCreateInput> => {
  const user = await prismaClient.users.create({
    data: payload,
  });

  return user;
};
