import { NextFunction, Request, Response } from 'express';
import z from 'zod';

import { Send } from '@utils/responses';
import { LoginSchema } from '@validations/auth';

// Types
type LoginBody = z.infer<typeof LoginSchema>;

export class Validation {
  static validateBody<T extends z.ZodTypeAny>(schema: T) {
    return (
      req: Request<{}, {}, LoginBody>,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const body = req.body;
        schema.parse(body);
        return next();
      } catch (error) {
        if (error instanceof z.ZodError) {
          const formattedErrors: Record<string, string[]> = {};

          error.issues.forEach(({ path, message }) => {
            const key = path[0] as string;

            if (!formattedErrors[key]) {
              formattedErrors[key] = [];
            }

            formattedErrors[key].push(message);
          });

          Send.validationErrorResponses(res, formattedErrors);

          return;
        }

        Send.clientErrorResponses(res, {
          message: 'Invalid request body',
          statusCode: 400,
        });
      }
    };
  }
}
