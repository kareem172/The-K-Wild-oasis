import styled from "styled-components";
import { useRecentStays } from "./useRecentStays";
import { useRecentBookings } from "./useRecentBooking";
import {useCabins} from "../cabins/useCabins"
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivities from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { confirmedStays, isLoading: isLoadingStays } = useRecentStays();
  const { bookings, isLoading: isLoadingBookings, daysNum } = useRecentBookings();
  const {data:cabins, isLoading:isLoadingCabins} = useCabins()

  if (isLoadingStays || isLoadingBookings || isLoadingCabins) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats confirmedStays={confirmedStays} bookings={bookings} numDays={daysNum} numCabins={cabins.length} />
      <TodayActivities />
      <DurationChart confirmedStays={confirmedStays}/>
      <SalesChart bookings={bookings} numDays={daysNum} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
