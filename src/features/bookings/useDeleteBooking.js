import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteBooking,
    isLoading: isDeleting,
    error,
  } = useMutation({
    mutationFn: (id) => deleteBookingApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries("bookings");
      toast.success("The booking was deleted");
    },
    onError: (error) => {
      console.error(error);
      toast.error("The booking could not be deleted");
    },
  });
  return { deleteBooking, isDeleting, error };
}
