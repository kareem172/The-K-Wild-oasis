import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const daysNum = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : 7;
  const queryDate = subDays(new Date(), daysNum).toISOString();

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${daysNum}`],
  });
  return { isLoading, bookings };
}
