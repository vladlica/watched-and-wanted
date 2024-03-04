import styled, { css } from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow: auto;
  padding: 2.4rem 1rem;
  background-color: var(--color-grey-0);
  max-height: 65rem;
  ${(props) =>
    props.$size === "large" &&
    css`
      min-width: 90rem;
    `}
`;

export default Form;
