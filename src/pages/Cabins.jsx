import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";
import { getCabins } from "../services/apiCabins";
import { useQuery } from "@tanstack/react-query";

import CabinTable from '../features/cabins/CabinTable';

function Cabins() {

  const {isLoading, error, data:cabins} = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  })

  if (isLoading) return <Spinner />;

  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>Filter</p>
    </Row>

    <Row type='horizontal'>
      <CabinTable cabins={cabins} />
    </Row>
    </>
  );
}

export default Cabins;
