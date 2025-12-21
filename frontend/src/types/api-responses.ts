export type ApiResponsesError =
  | {
      status: "error";
      message: string;
    }
  | { status: "error"; errors: Record<string, string> };
