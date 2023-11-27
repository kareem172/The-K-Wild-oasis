import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  gap: 1rem;

  ${({ type }) =>
    type === "vertical" &&
    css`
      flex-direction: column;
     
    `}
  ${({ type }) =>
    type === "horizontal" &&
    css`
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    `}
`;

Row.defaultProps = {
    type: "horizontal",
}
export default Row;
