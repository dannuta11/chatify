import { useMutation } from "@tanstack/react-query";

import { api } from "@api/index";
import type { LoginBody } from "@types/index";

// Helpers
const loginFn = ({ email, password }: LoginBody) => {
  return api.auth.login({ email, password });
};

export const useLogin = () => {
  const { mutateAsync: login, isPending } = useMutation({
    mutationFn: loginFn,
  });

  return { login, isPending };
};
