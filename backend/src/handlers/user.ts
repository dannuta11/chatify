import type { Request, Response } from "express";

import { hashPassword } from "../helpers";
import { UserService } from "../services";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const hashedPassword = await hashPassword(password);

  const user = await UserService.createUser({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json(user);
};
