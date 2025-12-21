export type ApiResponsesError =
  | {
      status: "error";
      message: string;
    }
  | { status: "error"; errors: Record<string, string>[] };

export type ApiResponses<T, E = ApiResponsesError> =
  | {
      data: T;
    }
  | {
      error: E;
    };
