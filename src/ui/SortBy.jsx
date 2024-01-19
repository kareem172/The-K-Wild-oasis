import { useSearchParams } from "react-router-dom";
import Select from "./Select";
function SortBy() {
  const [searchParams, setSearchParams] = useSearchParams();
  const SelectedValue = searchParams.get("sortBy") || "";
  const handleChange = (e) => {
    const value = e.target.value;
    searchParams.set("sortBy", value);
    setSearchParams(searchParams, { replace: true });
  };
  return (
    <Select
      onChange={handleChange}
      value={SelectedValue}
      options={[
        {
          value: "name",
          label: "Sort By Name",
        },
        {
          value: "regularPrice",
          label: "Sort By Price",
        },
        {
          value: "maxCapacity",
          label: "Sort By Max Capacity",
        },
        
      ]}
      type={"white"}
    />
  );
}

export default SortBy;
