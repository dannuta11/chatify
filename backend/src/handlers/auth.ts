import { UsersCreateInput } from "../generated/prisma/models/Users";
import { createUser as initializeUser } from "../db/repositories";
import { hashPassword } from "../helpers";

export const createUser = async (
  payload: UsersCreateInput
): Promise<UsersCreateInput> => {
  const { username, email, password } = payload;
  const hashedPassword = await hashPassword(password);
  const userPayload: UsersCreateInput = {
    username: username.trim(),
    email: email.trim(),
    password: hashedPassword,
  };

  const user = await initializeUser(userPayload);

  return user;
};
