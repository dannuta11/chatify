import { Request, Response, Router } from "express";
import { UsersCreateInput } from "../generated/prisma/models";
import { findUserByEmail } from "../db/repositories";
import { comparePassword } from "../helpers";
import { generateAccessToken, generateRefreshToken } from "../helpers/token";

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

export default router;
