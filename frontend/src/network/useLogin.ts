import { useMutation } from "@tanstack/react-query";

import { api } from "@api";
import type { LoginBody } from "@types";

// Helper functions
const loginFn = ({ email, password }: LoginBody) => {
  return api.auth.login({ email, password });
};

export const useLogin = () => {
  const { mutateAsync: login, isPending } = useMutation({
    mutationFn: loginFn,
    onError: (error) => {
      console.log("🚀 ~ useLogin ~ error:", error);
      alert(
        `Login failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    },
  });

  return { login, isPending };
};
