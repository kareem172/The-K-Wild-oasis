import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin(){
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const {mutate:checkin, isLoading:isCheckingIn, error} = useMutation({
        mutationFn: ({bookingId, breakfast}) => updateBooking(bookingId, {status: "checked-in", isPaid: true, ...breakfast}),
        onSuccess: (data) => {
            toast.success(`Booking ${data.id} was checked in`)
            navigate("/");
            queryClient.invalidateQueries({active : true})
        },
        onError: (error) => {
            toast.error(`Error checking in booking: ${error.message}`)
        }
    })
    return {checkin, isCheckingIn, error}
}