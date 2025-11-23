import { Request, Router } from "express";
import { UsersCreateInput } from "../generated/prisma/models";
import { createUser } from "../handlers";
import { getUserList } from "../db/repositories";

const router = Router();

router.post(
  "/user",
  async (req: Request<unknown, unknown, UsersCreateInput>, res) => {
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
      res.status(500).json({
        error: "Registration failed",
      });
    }
  }
);

router.get("/users", async (_req, res) => {
  try {
    const users = await getUserList();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

export default router;
