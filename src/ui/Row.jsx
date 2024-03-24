import styled, { css } from "styled-components";

// Props:
// - direction: String - Determines the direction of the flex container (horizontal or vertical)
const Row = styled.div`
  display: flex;

  ${(props) =>
    props.direction === "horizontal" &&
    css`
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.direction === "vertical" &&
    css`
      flex-direction: column;
      gap: 3rem;
    `}
`;

export default Row;
