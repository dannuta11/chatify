import { Request, Router } from "express";
import { UsersCreateInput } from "../generated/prisma/models";
import { createUser } from "../handlers";

const router = Router();

router.post(
  "/user",
  async (req: Request<unknown, unknown, UsersCreateInput>, res) => {
    try {
      const { email, password, username } = req.body;
      if (!username || !email || !password) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }

      if (username.trim() === "") {
        res.status(400).json({ error: "Missing name" });
        return;
      }

      if (email.trim() === "") {
        res.status(400).json({ error: "Missing email" });
        return;
      }

      if (password.trim() === "") {
        res.status(400).json({ error: "Missing password" });
        return;
      }

      const user = await createUser({ username, email, password });
      res.status(201).json({ user });
    } catch (error) {
      res.status(500).json({ error: "Registration failed" });
    }
  }
);

export default router;
