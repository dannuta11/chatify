import type { LoginBody } from "@types/index";
import { HOST } from "@constants";

export const auth = {
  async login(body: LoginBody): Promise<Response> {
    const loginResponse = await fetch(`${HOST}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return loginResponse as Response;
  },
};
