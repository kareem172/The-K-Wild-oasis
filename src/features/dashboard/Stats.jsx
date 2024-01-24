import Stat from "./Stat";
import propTypes from "prop-types";
import {
  HiOutlineBriefcase,
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
function Stats({ bookings, confirmedStays, numDays, numCabins }) {
  const bookingsNumbers = bookings.length;

  const sales = confirmedStays.reduce((acc, stay) => {
    return acc + stay.totalPrice;
  }, 0);

  const checkIns = confirmedStays.length;

  const occupancy = Math.round(
    (confirmedStays.reduce((acc, stay) => acc + stay.numNights, 0) * 100) /
      (numDays * numCabins)
  );

  return (
    <>
      <Stat
        title="Bookings"
        value={bookingsNumbers}
        icon={<HiOutlineBriefcase />}
        color={"blue"}
      />
      <Stat
        title="Sales"
        value={formatCurrency(sales)}
        icon={<HiOutlineBanknotes />}
        color={"green"}
      />
      <Stat
        title="Check in"
        value={checkIns}
        icon={<HiOutlineCalendarDays />}
        color={"indigo"}
      />
      <Stat
        title="Occupancy"
        value={`${occupancy} %`}
        icon={<HiOutlineChartBar />}
        color={"yellow"}
      />
    </>
  );
}

Stats.propTypes = {
  bookings: propTypes.array.isRequired,
  confirmedStays: propTypes.array.isRequired,
  numDays: propTypes.number.isRequired,
  numCabins: propTypes.number.isRequired,
};

export default Stats;
