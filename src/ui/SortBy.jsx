import { useSearchParams } from "react-router-dom";
import Select from "./Select";
function SortBy({options}) {
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
      options={options}
      type={"white"}
    />
  );
}

export default SortBy;
