import path from 'path';

import express, { Express } from 'express';

import auth from '@api/auth';
import users from '@api/users';
import { PORT } from '@constants/index';
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
    this.app.use('/api/auth', auth);
    this.app.use('/api/users', users);

    // Test route to see if express is working
    this.app.get('/test', (req, res) => {
      Send.successfulResponses(res, { status: 'Express is working!!!' });
    });
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
}
