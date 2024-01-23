import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const daysNum = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : 7;
  const queryDate = subDays(new Date(), daysNum).toISOString();

  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${daysNum}`],
  });

  const confirmedStays = stays?.filter((stay) => stay.status !== "unconfirmed");
  return { isLoading, stays, confirmedStays };
}
