import type { Request, Response } from "express";

import { hashPassword } from "../helpers";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const hashedPassword = await hashPassword(password);

  res.status(201).json({
    message: `User created with name: '${name}' and email: '${email}, password: '${hashedPassword}'`,
  });
};
