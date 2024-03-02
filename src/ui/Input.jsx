import styled from "styled-components";

const Input = styled.input`
  border: 1px solid var(--color-grey-400);
  padding: 0.3rem 1.2rem;
  border-radius: 15px;
  box-shadow: var(--shadow-sm);
  width: ${(props) => props.$width};

  &:focus {
    outline: 2px solid var(--color-orange-600);
    outline-offset: -2px;
  }

  &::placeholder {
    color: var(--color-grey-400);
  }
`;

Input.defaultProps = {
  $width: "100%",
};

export default Input;
