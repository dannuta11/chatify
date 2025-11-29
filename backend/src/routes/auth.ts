import { Auth } from '@api/auth';

import BaseRouter, { RouteConfig } from './router';

class AuthRouter extends BaseRouter {
  protected routes(): RouteConfig[] {
    return [
      {
        path: '/login',
        method: 'post',
        handler: Auth.login,
      },
      {
        path: '/register',
        method: 'post',
        handler: Auth.register,
      },
    ];
  }
}

export default new AuthRouter().router;
