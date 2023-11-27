import styled, { css } from "styled-components";

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
