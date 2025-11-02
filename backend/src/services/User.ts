import { UsersCreateInput } from "../generated/prisma/models/Users";
import { UserRepository } from "../db/repositories";
import { hashPassword } from "../helpers";

export class UserService {
  static async createUser(payload: UsersCreateInput) {
    const { username, email, password } = payload;

    if (!username || !email || !password) {
      throw new Error("Missing required fields");
    }

    if (username === undefined || username.trim() === "") {
      throw new Error("Invalid name");
    }

    if (email === undefined || email.trim() === "") {
      throw new Error("Invalid email");
    }

    if (password === undefined || password.trim() === "") {
      throw new Error("Invalid password");
    }

    const hashedPassword = await hashPassword(password);
    const userPayload: UsersCreateInput = {
      username: username.trim(),
      email: email.trim(),
      password: hashedPassword,
    };

    const user = await UserRepository.createUser(userPayload);

    return user;
  }
}
