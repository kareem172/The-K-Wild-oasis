import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import { getCabins } from "../services/apiCabins";
import { useQuery } from "@tanstack/react-query";

import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import { useState } from "react";

function Cabins() {
  const [showModal, setShowModal] = useState(false);

  const { isLoading, data: cabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

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
