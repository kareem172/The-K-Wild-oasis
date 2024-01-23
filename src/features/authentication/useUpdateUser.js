import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserData } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateUserData,
    onSuccess: ({ user }) => {
      queryClient.invalidateQueries("user");
      toast.success("User data updated successfully");
    },
    onError: (error) => {
      toast.error("Update user data failed", error);
    },
  });
  return { updateUser, isUpdating };
}
