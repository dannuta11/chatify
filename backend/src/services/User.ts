import { UserPayload } from "../types";
import { UserRepository } from "../db/repositories";

export class UserService {
  static async createUser(payload: UserPayload) {
    const { name, email, password } = payload;

    if (name === undefined || name.trim() === "") {
      throw new Error("Invalid name");
    }

    if (email === undefined || email.trim() === "") {
      throw new Error("Invalid email");
    }

    if (password === undefined || password.trim() === "") {
      throw new Error("Invalid password");
    }

    const user = await UserRepository.createUser({ name, email, password });

    return user;
  }
}
