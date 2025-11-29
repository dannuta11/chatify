import { NextFunction, Request, Response } from 'express';

import { Send } from '@utils/responses';
import { verifyToken } from '@utils/token';

// Types
interface DecodedToken {
  userId: string;
}

export default class AuthMiddleware {
  static authenticateUser(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return Send.clientErrorResponses(res, {
        message: 'Authorization header missing',
        statusCode: 401,
      });
    }

    try {
      const decoded = verifyToken<DecodedToken>(authorizationHeader);
      (req as any).userId = decoded.userId;
    } catch {
      Send.clientErrorResponses(res, {
        message: 'Invalid or expired token',
        statusCode: 401,
      });
    }

    next();
  }
}
