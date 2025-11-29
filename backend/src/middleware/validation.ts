import { NextFunction, Request, Response } from 'express';
import z from 'zod';

import { Send } from '@utils/responses';
import { LoginSchema } from '@validations/auth';

// Types
type LoginBody = z.infer<typeof LoginSchema>;

export class Validation {
  static validateBody(schema: z.ZodTypeAny) {
    return (
      req: Request<{}, {}, LoginBody>,
      res: Response,
      next: NextFunction
    ) => {
      try {
        schema.parse(req.body);
        next();
      } catch (error) {
        if (error instanceof z.ZodError) {
          const formattedErrors: Record<string, string[]> = {};

          error.issues.forEach(({ path, message }) => {
            const key = path.join('');

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
