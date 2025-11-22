import type { Request, Response } from "express";

import { UsersCreateInput } from "../generated/prisma/models/Users";
import { UserService } from "../services";

export const createUser = async (
  req: Request<unknown, unknown, UsersCreateInput>,
  res: Response
) => {
  const { email, password, username } = req.body;

  const user = await UserService.createUser({
    email,
    password,
    username,
  });

  res.status(201).json(user);
};
