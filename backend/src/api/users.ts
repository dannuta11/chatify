import { Request, Response } from 'express';

import UserRepository from '@db/repositories/users';
import { Send } from '@utils/responses';

export default class User {
  static async getUserList(_: Request, res: Response) {
    try {
      const users = await UserRepository.getUserList();
      Send.okResponse(res, users);
    } catch {
      Send.internalServerErrorResponse(res, 'Failed to fetch users');
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const userId = req.params.id;

      const user = await UserRepository.findUserById(userId);

      if (user === null) {
        Send.notFoundResponse(res, `User with id ${userId} not found`);
        return;
      }

      Send.okResponse(res, user);
    } catch {
      Send.internalServerErrorResponse(res, 'Failed to fetch user');
    }
  }

  static async deleteUserById(req: Request, res: Response) {
    try {
      const userId = req.params.id;

      const user = await UserRepository.findUserById(userId);
      if (user === null) {
        Send.notFoundResponse(res, `User with id ${userId} not found`);
        return;
      }

      await UserRepository.deleteUserById(userId);
      Send.noContentResponse(res);
    } catch {
      Send.internalServerErrorResponse(res, 'Failed to delete user');
    }
  }
}
