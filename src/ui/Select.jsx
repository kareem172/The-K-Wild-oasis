import styled from "styled-components";
import propTypes from "prop-types";
const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-sm);
  background-color: ${(props) =>
    props.type === "white" ? "var(--color-grey-100)" : "var(--color-grey-300)"};
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;
function Select({ options, value, onChange, ...props }) {
  return (
    <StyledSelect {...props} value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}
Select.propTypes = {
  options: propTypes.array.isRequired,
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
};

export default Select;
