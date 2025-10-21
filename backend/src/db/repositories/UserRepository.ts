import prismaClient from "../schema/client";
import { UserPayload } from "../../types";

export class UserRepository {
  static async createUser(userPayload: UserPayload) {
    const user = await prismaClient.users.create({
      data: {
        name: userPayload.name,
        email: userPayload.email,
        password: userPayload.password,
      },
    });

    return user;
  }
}
