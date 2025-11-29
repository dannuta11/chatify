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

export default class AuthRepository {
  static async createUser(payload: UsersCreateInput): Promise<User> {
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
  }

  static async findUserByEmail(
    email: string
  ): Promise<Required<UsersUncheckedCreateInput> | null> {
    const user = await prismaClient.users.findUnique({
      where: { email },
    });

    return user;
  }

  static async findUserById(id: string): Promise<User | null> {
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
  }

  static async getUserList(): Promise<User[]> {
    const users = await prismaClient.users.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        created_at: true,
      },
    });

    return users;
  }

  static async deleteUserById(id: string) {
    await prismaClient.users.delete({
      where: { id },
    });
  }
}
