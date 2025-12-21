import type { LoginBody } from "@types/index";

export const auth = {
  async login(body: LoginBody): Promise<LoginBody> {
    const loginResponse = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return loginResponse;
  },
};
