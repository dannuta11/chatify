import { NextFunction, Request, Response } from 'express';
import z from 'zod';

import { formattedZodErrors } from '@utils/formatted-zod-errors';
import { Send } from '@utils/responses';

export class Validation {
  static validateBody(schema: z.ZodSchema) {
    return (
      req: Request<{}, {}, z.infer<typeof schema>>,
      res: Response,
      next: NextFunction
    ) => {
      try {
        schema.parse(req.body);
      } catch (error) {
        if (error instanceof z.ZodError) {
          Send.validationErrorResponse(res, formattedZodErrors(error));
          return;
        }

        Send.clientErrorResponses(res, {
          message: 'Invalid request body',
          statusCode: 400,
        });
        return;
      }

      next();
    };
  }
}
