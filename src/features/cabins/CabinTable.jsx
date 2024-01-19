import CabinRow from "./CabinRow";
import propTypes from "prop-types";
import { useCabins } from "./useCabins";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, data: cabins } = useCabins();

  const [searchParams] = useSearchParams();
  const filter = searchParams.get("discount");
  const sortBy = searchParams.get("sortBy");
  let filteredCabins = cabins;
  switch (filter) {
    case "noDiscount":
      filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
      break;
    case "withDiscount":
      filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
      break;
    default:
      filteredCabins = cabins;
  }
  let sortedCabins = filteredCabins;
  switch (sortBy) {
    case "regularPrice":
      sortedCabins = filteredCabins.sort((a, b) => a.regularPrice - b.regularPrice);
      break;
    case "maxCapacity":
      sortedCabins = filteredCabins.sort((a, b) => a.maxCapacity - b.maxCapacity);
      break;
    case "name":
      sortedCabins = filteredCabins.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      sortedCabins = filteredCabins;
  }

  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table columns={"0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"}>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

CabinTable.propTypes = {
  cabins: propTypes.array,
};

export default CabinTable;
