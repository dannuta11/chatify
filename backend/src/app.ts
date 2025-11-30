import path from 'path';

import express, { Express } from 'express';

import { PORT } from '@constants/index';
import { authRouters } from '@routes/auth';
import { userRouters } from '@routes/users';
import { Send } from '@utils/responses';

export default class App {
  private app: Express;

  constructor() {
    this.app = express();

    this.initMiddleware();
    this.initRoutes();
  }

  private initMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, '../frontend', 'dist')));
  }

  private initRoutes(): void {
    this.app.use('/api/auth', authRouters);
    this.app.use('/api/users', userRouters);

    // Test route to see if express is working
    this.app.get('/test', (req, res) => {
      Send.okResponse(res, 'Express is working!!!');
    });
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
}
