import { Response } from 'express';

type MessageOption = {
  message: string;
};

type ErrorOptions = Partial<MessageOption> & {
  statusCode?: number;
};

export class Send {
  static successfulResponses<T>(res: Response, data: T, statusCode = 200) {
    return res.status(statusCode).json(data);
  }

  static clientErrorResponses(
    res: Response,
    { message = 'Something went wrong', statusCode = 400 }: ErrorOptions
  ) {
    return res.status(statusCode).json({
      status: 'error',
      message,
    });
  }

  static serverErrorResponses(
    res: Response,
    { message = 'Internal server error' }: MessageOption
  ) {
    return res.status(500).json({
      status: 'error',
      message,
    });
  }
}
