import styled from "styled-components";

// Props:
// - $width: String - Dynamic width
const Input = styled.input`
  background-color: var(--color-grey-0);
  color: var(--color-grey-700);
  border: 1px solid var(--color-grey-400);
  padding: 0.3rem 1.2rem;
  border-radius: 15px;
  box-shadow: var(--shadow-sm);
  width: ${(props) => props.$width};

  &:focus-visible {
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
