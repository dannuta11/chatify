import { NextFunction, Request, Response } from 'express';

import { Send } from '@utils/responses';
import { verifyToken } from '@utils/token';

// Types
type DecodedToken = {
  userId: string;
};

export default class AuthMiddleware {
  static authenticateUser(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      Send.unauthorizedResponse(res, 'Authorization header missing');
      return;
    }

    try {
      verifyToken<DecodedToken>(authorizationHeader);
    } catch {
      Send.unauthorizedResponse(res, 'Invalid or expired token');
      return;
    }

    next();
  }
}
