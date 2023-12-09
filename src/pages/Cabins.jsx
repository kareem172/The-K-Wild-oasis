import { useState } from "react";

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

import { useCabins } from "../features/cabins/useCabins";

function Cabins() {
  const [showModal, setShowModal] = useState(false);

  const { isLoading, data: cabins } = useCabins();

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row>
        <Heading as="h1">All cabins</Heading>
        <p>Filter</p>
      </Row>

      <Row type="vertical">
        <CabinTable cabins={cabins} />
        <Button onClick={() => setShowModal((show) => !show)}>Add Cabin</Button>
        {showModal && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
