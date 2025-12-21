import type { LoginBody } from "@types";
import { HOST } from "@constants";

export const auth = {
  async login(body: LoginBody): Promise<LoginBody> {
    const response = await fetch(`${HOST}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = (await response.json()) as LoginBody | undefined;

    if (response.status !== 201) {
      throw new Error(data as unknown as string);
    }

    return data as LoginBody;
  },
};
