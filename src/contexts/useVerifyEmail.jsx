import { useMutation } from "@tanstack/react-query";
import { verifyEmailRequest } from "../services/user.js";

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: verifyEmailRequest,
  });
};
