import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") || "all";
  let filter =
    !status || status === "all"
      ? null
      : { value: status, fieldName: "status"};
  const { data, error, isLoading } = useQuery({
    queryKey: ["bookings", filter],
    queryFn: () => getBookings({filter}),
  });
  return { data, error, isLoading };
}
