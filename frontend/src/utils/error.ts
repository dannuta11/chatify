import type { ApiResponsesError } from "@types";

type ErrorType = {
  message?: string;
  error: ApiResponsesError;
};

export class ApiError extends Error {
  errorMessage: string;
  constructor({ message, error }: ErrorType) {
    super(message);
    this.errorMessage = this.normalizeServerError(error);
  }

  normalizeServerError(error: ApiResponsesError): string {
    if (error && typeof error === "object") {
      if ("message" in error && error.message) {
        return error.message;
      }

      if ("errors" in error && typeof error.errors === "object") {
        return Object.entries(error.errors)
          .map(([, value]) => value)
          .join("; ");
      }
    }

    return "An unknown error occurred.";
  }
}
