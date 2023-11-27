import styled from "styled-components";

const Input = styled.input`
  border: 1px solid var(--color-grey-400);
  padding: 0.3rem 1.2rem;
  border-radius: 15px;
  box-shadow: var(--shadow-sm);
  width: 100%;

  &:focus {
    outline: 2px solid var(--color-orange-600);
    outline-offset: -2px;
  }

  &::placeholder {
    color: var(--color-grey-400);
  }
`;

export default Input;
