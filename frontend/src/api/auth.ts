import type { LoginBody, ApiResponsesError } from "@types";
import { HOST } from "@constants";
import { dalRequest } from "@dal";
import { NETWORK_STATUS_CODES } from "@constants";

export const auth = {
  async login(body: LoginBody): Promise<LoginBody> {
    const response = await fetch(`${HOST}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await dalRequest<LoginBody, ApiResponsesError>(
      response,
      NETWORK_STATUS_CODES.CREATED
    );

    return data;
  },
};
