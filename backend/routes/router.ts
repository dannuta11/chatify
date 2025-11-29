import { Router, RequestHandler } from 'express';

// Types
export type RouteConfig = {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete';
  handler: RequestHandler;
  middleware?: RequestHandler[];
};

export default abstract class BaseRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  protected abstract routes(): RouteConfig[];

  private registerRoutes(): void {
    this.routes().forEach((route) => {
      const { path, method, handler, middleware = [] } = route;
      this.router[method](path, ...middleware, handler);
    });
  }
}
