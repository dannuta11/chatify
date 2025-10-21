import type { Request, Response } from "express";

export const createUser = (req: Request, res: Response) => {
  const { name, email } = req.body;

  res.status(201).json({
    message: `User created with name: '${name}' and email: '${email}'`,
  });
};
