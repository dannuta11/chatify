import BaseRouter, { RouteConfig } from './router';

class AuthRouter extends BaseRouter {
  protected routes(): RouteConfig[] {
    return [
      {
        path: '/login',
        method: 'post',
        handler: () => {},
      },
    ];
  }
}

export default new AuthRouter().router;
