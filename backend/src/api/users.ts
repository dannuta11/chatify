import { Request, Response, Router } from 'express';

import {
  getUserList,
  deleteUserById,
  findUserById,
} from '@db/repositories/auth';

const router = Router();

router.get('/users', async (_, res: Response) => {
  try {
    const users = await getUserList();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.delete(
  '/user/:id',
  async (req: Request<{ id: string }>, res: Response) => {
    try {
      const userId = req.params.id;

      if (!userId) {
        res
          .status(400)
          .json({ status: 'Fail', message: 'User ID is required' });
        return;
      }

      const user = await findUserById(userId);
      if (user === null) {
        res.status(404).json({
          status: 'Fail',
          message: `User with id ${userId} not found`,
        });
        return;
      }

      await deleteUserById(userId);
      res
        .status(200)
        .json({ status: 'Success', message: 'User deleted successfully' });
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to delete user', prismaError: error });
    }
  }
);

export default router;
