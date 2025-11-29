import User from '@api/users';

import BaseRouter, { RouteConfig } from './router';

class UserRouter extends BaseRouter {
  protected routes(): RouteConfig[] {
    return [
      {
        method: 'get',
        path: '/users',
        handler: User.getUserList,
      },
      {
        method: 'get',
        path: '/user/:id',
        handler: User.getUserById,
      },
      {
        method: 'delete',
        path: '/user/:id',
        handler: User.deleteUserById,
      },
    ];
  }
}

export const userRouters = new UserRouter().router;
