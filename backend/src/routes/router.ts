import { Router, RequestHandler } from 'express';

// Types
export type RouteConfig = {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete';
  handler: RequestHandler;
  middlewares?: RequestHandler[];
};

export default abstract class BaseRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  protected abstract routes(): RouteConfig[];

  private registerRoutes(): void {
    this.routes().forEach(({ path, method, handler, middlewares = [] }) => {
      this.router[method](path, ...middlewares, handler);
    });
  }
}
