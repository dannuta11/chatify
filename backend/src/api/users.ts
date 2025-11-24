import { Request, Response, Router } from "express";
import { UsersCreateInput } from "../generated/prisma/models";
import { createUser } from "../handlers";
import { getUserList, deleteUserById, findUserById } from "../db/repositories";

const router = Router();

router.post(
  "/user",
  async (req: Request<unknown, unknown, UsersCreateInput>, res: Response) => {
    try {
      const payload = req.body;
      const userPayload = {
        username: payload.username.trim(),
        email: payload.email.trim(),
        password: payload.password.trim(),
      };
      const { username, email, password } = userPayload;

      if (!username && !email && !password) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }

      if (username === "") {
        res.status(400).json({ error: "Missing username" });
        return;
      }

      if (email === "") {
        res.status(400).json({ error: "Missing email" });
        return;
      }

      if (password === "") {
        res.status(400).json({ error: "Missing password" });
        return;
      }

      const user = await createUser(userPayload);
      res.status(201).json({ user });
    } catch (error) {
      res.status(500).json({ error: "Registration failed" });
    }
  },
);

router.get("/users", async (_, res: Response) => {
  try {
    const users = await getUserList();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});
router.delete(
  "/user/:id",
  async (req: Request<{ id: string }>, res: Response) => {
    try {
      const userId = Number(req.params.id);

      if (!userId) {
        res
          .status(400)
          .json({ status: "Fail", message: "User ID is required" });
        return;
      }

      const user = await findUserById(userId);
      if (user === null) {
        res.status(404).json({
          status: "Fail",
          message: `User with id ${userId} not found`,
        });
        return;
      }

      await deleteUserById(userId);
      res
        .status(200)
        .json({ status: "Success", message: "User deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to delete user", prismaError: error });
    }
  },
);

export default router;
