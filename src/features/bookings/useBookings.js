import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const status = searchParams.get("status") || "all";
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const page = Number(searchParams.get("page")) || 1;

  const [fieldName, order] = sortByRaw.split("-");
  const sortBy = { fieldName, order };

  let filter =
    !status || status === "all" ? null : { value: status, fieldName: "status" };
  // Fetch the data
  const { data, error, isLoading } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const pageCount = Math.ceil(data?.count / PAGE_SIZE);
  //   Prefetch the data for the next page
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }

  //   Prefetch the data for the prev page
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  return { data, error, isLoading };
}
