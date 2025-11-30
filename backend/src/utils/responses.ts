import { Response } from 'express';

export class Send {
  // Success Responses
  static okResponse(res: Response, data: unknown) {
    res.status(200).json(data);
  }

  static createdResponse(res: Response, data: unknown) {
    res.status(201).json(data);
  }

  static noContentResponse(res: Response) {
    res.status(204).send();
  }

  // Client Error Responses
  static badRequestResponse(res: Response, message = 'Bad request') {
    res.status(400).json({
      status: 'error',
      message,
    });
  }

  static unauthorizedResponse(res: Response, message = 'Unauthorized access') {
    res.status(401).json({
      status: 'error',
      message,
    });
  }

  static notFoundResponse(res: Response, message = 'Resource not found') {
    res.status(404).json({
      status: 'error',
      message,
    });
  }

  static conflictResponse(res: Response, message = 'Conflict occurred') {
    res.status(409).json({
      status: 'error',
      message,
    });
  }

  static validationErrorResponse<T>(res: Response, formattedErrors: T) {
    res.status(422).json({
      status: 'error',
      errors: formattedErrors,
    });
  }

  // Server Error Responses
  static internalServerErrorResponse(
    res: Response,
    message = 'Internal server error'
  ) {
    res.status(500).json({
      status: 'error',
      message,
    });
  }
}
