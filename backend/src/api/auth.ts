import { Request, Response, Router } from "express";
import { UsersCreateInput } from "../generated/prisma/models";
import { findUserByEmail } from "../db/repositories/auth";
import { comparePassword } from "../helpers/bcrypt";
import { generateAccessToken, generateRefreshToken } from "../helpers/token";
import { createUser } from "../handlers/auth";
import { camelCaseKeys } from "../helpers/utils";

// Types
export interface LoginPayload
  extends Pick<UsersCreateInput, "email" | "password"> {}

const router = Router();

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

      const isMatchingPasswords = await comparePassword(
        password,
        user.password,
      );

      if (isMatchingPasswords === false) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      const accessToken = generateAccessToken(user.id);
      const refreshToken = generateRefreshToken(user.id);

      res.status(200).json({
        accessToken,
        refreshToken,
      });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  },
);

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

      const checkExistingUser = await findUserByEmail(email);

      if (checkExistingUser !== null) {
        res.status(409).json({
          status: "fail",
          message: "This email is already registered",
        });
        return;
      }

      const user = await createUser(userPayload);
      const camelCasedUser = camelCaseKeys(user);
      res.status(201).json({ user: camelCasedUser });
    } catch (error) {
      res.status(500).json({ error: "Registration failed" });
    }
  },
);

export default router;
