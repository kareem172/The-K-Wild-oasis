import CabinRow from "./CabinRow";
import propTypes from "prop-types";
import { useCabins } from "./useCabins";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

function CabinTable() {
  const { isLoading, data: cabins } = useCabins();

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
        data={cabins}
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
