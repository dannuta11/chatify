import User from '@api/users';
import AuthMiddleware from '@middleware/auth';

import BaseRouter, { RouteConfig } from './router';

class UserRouter extends BaseRouter {
  protected routes(): RouteConfig[] {
    return [
      {
        method: 'get',
        path: '/users',
        handler: User.getUserList,
        middlewares: [AuthMiddleware.authenticateUser],
      },
      {
        method: 'get',
        path: '/user/:id',
        handler: User.getUserById,
        middlewares: [AuthMiddleware.authenticateUser],
      },
      {
        method: 'delete',
        path: '/user/:id',
        handler: User.deleteUserById,
        middlewares: [AuthMiddleware.authenticateUser],
      },
    ];
  }
}

export const userRouters = new UserRouter().router;
