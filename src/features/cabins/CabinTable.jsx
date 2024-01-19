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
          data={filteredCabins}
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
