import styled from "styled-components";

const RoundBox = styled.div`
  background-color: var(--color-grey-0);
  padding: 1rem;
  border-radius: 25px;
  box-shadow: var(--shadow-md);

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

export default RoundBox;
