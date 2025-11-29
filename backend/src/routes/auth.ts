import { Auth } from '@api/auth';
import { Validation } from '@middleware/validation';
import { LoginSchema } from '@validations/auth';

import BaseRouter, { RouteConfig } from './router';

class AuthRouter extends BaseRouter {
  protected routes(): RouteConfig[] {
    return [
      {
        path: '/login',
        method: 'post',
        handler: Auth.login,
        middlewares: [Validation.validateBody(LoginSchema)],
      },
      {
        path: '/register',
        method: 'post',
        handler: Auth.register,
      },
    ];
  }
}

export const authRouters = new AuthRouter().router;
