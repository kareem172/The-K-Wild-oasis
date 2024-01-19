import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField={"discount"}
        options={[
          { value: "all", label: "All" },
          { value: "noDiscount", label: "No Discount" },
          { value: "withDiscount", label: "With Discount" },
        ]}
      />
      <SortBy />
    </TableOperations>
  );
}

export default CabinTableOperations;
