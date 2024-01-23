import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: login,
    isLoading,
    error,
  } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/",{replace:true});
    },
    onError: (error) => {
      console.error(error);
      toast.error("Login failed");
    },
  });
  return { login, isLoading, error };
}
