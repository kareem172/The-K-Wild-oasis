import styled, { css } from "styled-components";

export default styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 2rem;
    `}
  ${({ as }) =>
    as === "h2" &&
    css`
      font-size: 1.5rem;
    `}
    ${({ as }) =>
    as === "h3" &&
    css`
      font-size: 1rem;
    `}
  border-radius: 1rem;
`;
