import type { ApiResponsesError } from "@types";
import { ApiError } from "@utils";

export const dalRequest = async <T, E extends ApiResponsesError>(
  response: Response,
  status: number
) => {
  const data = await response.json();

  if (response.status !== status) {
    throw new ApiError({ error: data as E });
  }
  return data as T;
};
