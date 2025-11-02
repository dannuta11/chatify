import { UsersCreateInput } from "../../generated/prisma/models/Users";
import prismaClient from "../schema/client";

export class UserRepository {
  static async createUser(userPayload: UsersCreateInput) {
    const { email, username, password } = userPayload;

    const user = await prismaClient.users.create({
      data: {
        username,
        email,
        password,
      },
    });

    return user;
  }
}
