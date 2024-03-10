import styled, { css } from "styled-components";

const Button = styled.button`
  border-radius: 25px;
  transition: all 0.3s;

  &:focus-visible {
    outline: 2px solid var(--color-orange-600);
    outline-offset: 2px;
  }

  ${(props) =>
    props.$size === "small" &&
    css`
      padding: 0.5rem 1.5rem;
      font-size: 1.4rem;
    `}

  ${(props) =>
    props.$size === "medium" &&
    css`
      padding: 1rem 2rem;
    `}

  ${(props) =>
    props.$variation === "primary" &&
    css`
      background-color: var(--color-orange-600);
      color: var(--color-orange-50);
      border: none;

      &:hover {
        background-color: var(--color-orange-700);
      }
    `}

  ${(props) =>
    props.$variation === "secondary" &&
    css`
      background-color: var(--color-grey-0);
      color: var(--color-grey-600);
      border: 1px solid var(--color-grey-300);

      &:hover {
        background-color: var(--color-grey-100);
      }
    `}

    ${(props) =>
    props.$variation === "danger" &&
    css`
      background-color: var(--color-red-700);
      color: var(--color-red-100);
      border: none;

      &:hover {
        background-color: var(--color-red-800);
      }
    `}
`;

Button.defaultProps = {
  $size: "medium",
};

export default Button;
