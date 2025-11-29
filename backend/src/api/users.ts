import { Request, Response, Router } from 'express';

import {
  getUserList,
  deleteUserById,
  findUserById,
} from '@db/repositories/auth';
import { Send } from '@utils/responses';

const router = Router();

router.get('/users', async (_, res: Response) => {
  try {
    const users = await getUserList();
    return Send.successfulResponses(res, users);
  } catch {
    return Send.serverErrorResponses(res, { message: 'Failed to fetch users' });
  }
});

router.delete(
  '/user/:id',
  async (req: Request<{ id: string }>, res: Response) => {
    try {
      const userId = req.params.id;

      const user = await findUserById(userId);
      if (user === null) {
        return Send.clientErrorResponses(res, {
          message: `User with id ${userId} not found`,
          statusCode: 404,
        });
      }

      await deleteUserById(userId);
      return Send.successfulResponses(res, null, 204);
    } catch {
      return Send.serverErrorResponses(res, {
        message: 'Failed to delete user',
      });
    }
  }
);

router.get('/user/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const userId = req.params.id;

    const user = await findUserById(userId);
    if (user === null) {
      return Send.clientErrorResponses(res, {
        message: `User with id ${userId} not found`,
        statusCode: 404,
      });
    }

    return Send.successfulResponses(res, user);
  } catch {
    return Send.serverErrorResponses(res, {
      message: 'Failed to fetch user',
    });
  }
});

export default router;
