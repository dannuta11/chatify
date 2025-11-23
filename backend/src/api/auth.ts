import { Request, Response, Router } from "express";
import { UsersCreateInput } from "../generated/prisma/models";
import { createUser } from "../handlers";
import { getUserList, findUserByEmail } from "../db/repositories";
import { comparePassword } from "../helpers";

// Types
export interface LoginPayload
  extends Pick<UsersCreateInput, "email" | "password"> {}

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
  }
);

router.get("/users", async (_, res: Response) => {
  try {
    const users = await getUserList();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.post(
  "/login",
  async (req: Request<unknown, unknown, LoginPayload>, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
        return;
      }

      const user = await findUserByEmail(email);

      if (user === null) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const isPasswordValid = await comparePassword(password, user.password);

      if (!isPasswordValid) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  }
);

export default router;
