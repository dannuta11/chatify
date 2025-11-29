import { Request, Response } from 'express';

import AuthRepository from '@db/repositories/auth';
import { Send } from '@utils/responses';

export default class User {
  static async getUserList(_: Request, res: Response) {
    try {
      const users = await AuthRepository.getUserList();
      Send.successfulResponses(res, users);
    } catch {
      Send.serverErrorResponses(res, {
        message: 'Failed to fetch users',
      });
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const userId = req.params.id;

      const user = await AuthRepository.findUserById(userId);

      if (user === null) {
        Send.clientErrorResponses(res, {
          message: `User with id ${userId} not found`,
          statusCode: 404,
        });

        return;
      }

      Send.successfulResponses(res, user);
    } catch {
      Send.serverErrorResponses(res, {
        message: 'Failed to fetch user',
      });
    }
  }

  static async deleteUserById(req: Request, res: Response) {
    try {
      const userId = req.params.id;

      const user = await AuthRepository.findUserById(userId);
      if (user === null) {
        Send.clientErrorResponses(res, {
          message: `User with id ${userId} not found`,
          statusCode: 404,
        });

        return;
      }

      await AuthRepository.deleteUserById(userId);
      Send.successfulResponses(res, null, 204);
    } catch {
      Send.serverErrorResponses(res, {
        message: 'Failed to delete user',
      });
    }
  }
}
