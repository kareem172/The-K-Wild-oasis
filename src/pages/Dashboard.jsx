import DashboardLayout from "../features/dashboard/DashboardLayout";
import DashboardFilter from "../features/dashboard/DashboardFilter";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useRecentStays } from "../features/dashboard/useRecentStays";
import { useRecentBookings } from "../features/dashboard/useRecentBooking";
import Spinner from "../ui/Spinner";
function Dashboard() {
  const { stays, confirmedStays, isLoading: isLoadingStays } = useRecentStays();
  const { bookings, isLoading: isLoadingBookings } = useRecentBookings();

  if(isLoadingStays || isLoadingBookings) return <Spinner/>
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
