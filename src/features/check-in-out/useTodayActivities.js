import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivities() {
  const { data: todayActivities, isLoading } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["staysTodayActivity"],
  });
  return { todayActivities, isLoading };
}
