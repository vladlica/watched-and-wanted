import styled, { css } from "styled-components";

const DetailsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & li {
    ${(props) =>
      props.$type === "grid" &&
      css`
        display: grid;
        grid-template-columns: auto 1fr;
        justify-content: center;
        align-items: center;
        gap: 1rem;
      `}

    ${(props) =>
      props.$type === "flex" &&
      css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 0.5rem;
      `}

    border: 1px solid var(--color-grey-200);
    border-radius: 25px;
    padding: 1rem;

    white-space: pre-wrap;
    word-break: break-word;
  }

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-orange-600);
  }

  & a:link,
  a:visited {
    color: var(--color-orange-700);
    border-radius: 25px;
  }

  & a:hover,
  a:active {
    text-decoration: underline;
    border-radius: 25px;
  }

  & a:focus-visible {
    outline: 2px solid var(--color-orange-600);
    outline-offset: 3px;
  }
`;

export default DetailsList;
