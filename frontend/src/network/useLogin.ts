import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";

import { api } from "@api";
import type { LoginBody } from "@types";
import { ApiError } from "@utils";

// Helper functions
const loginFn = ({ email, password }: LoginBody) => {
  return api.auth.login({ email, password });
};

export const useLogin = () => {
  const { mutateAsync: login, isPending } = useMutation({
    mutationFn: loginFn,
    onError: (error: ApiError) => {
      notification.error({
        title: "Login Failed",
        description: error.errorMessage,
      });
    },
  });

  return { login, isPending };
};
