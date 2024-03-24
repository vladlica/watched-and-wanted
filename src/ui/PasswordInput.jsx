import { useState } from "react";
import styled from "styled-components";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import Input from "./Input";

const StyledPasswordInput = styled.div`
  display: flex;
  position: relative;
`;

const ShowPasswordButton = styled.button`
  position: absolute;
  right: 0.4rem;
  top: 50%;
  transform: translate(0, -50%);
  border: none;
  background-color: var(--color-grey-0);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 0.2rem;
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  &:hover svg {
    color: var(--color-orange-600);
  }

  & svg {
    width: 2rem;
    height: 2rem;
  }

  &:focus-visible {
    outline: 2px solid var(--color-orange-600);
    outline-offset: -2px;
  }
`;

// Props:
// - id: String - Unique identifier for the input field
// - placeholder: String - Placeholder text for the input field
// - register: Object - Function to register inputs provided by react-hook-form library
// - rules: Object - Containing validation rules for the input field
// - disabled: Boolean - Indicating whether the input field and the button are disabled
function PasswordInput({ id, placeholder, register, rules, disabled }) {
  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);

  return (
    <StyledPasswordInput>
      <Input
        type={showPassword ? "text" : "password"}
        id={id}
        placeholder={placeholder}
        {...register(id, rules)}
        disabled={disabled}
      />
      <ShowPasswordButton
        title={showPassword ? "Hide password" : "Show password"}
        onClick={() => setShowPassword((show) => !show)}
        type="button"
        disabled={disabled}
      >
        {showPassword ? <HiOutlineEyeSlash /> : <HiOutlineEye />}
      </ShowPasswordButton>
    </StyledPasswordInput>
  );
}

export default PasswordInput;
