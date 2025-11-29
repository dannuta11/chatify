import prismaClient from '@db/schema/client';
import { UsersCreateInput } from '@prisma-models/Users';

// Types
type User = Pick<
  Required<UsersCreateInput>,
  'id' | 'email' | 'username' | 'created_at'
>;

export default class AuthRepository {
  static async register(payload: UsersCreateInput): Promise<User> {
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
}
