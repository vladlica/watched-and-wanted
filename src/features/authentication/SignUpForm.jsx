import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Form from "../../ui/Form";
import Error from "../../ui/Error";
import Label from "../../ui/Label";
import Input from "../../ui/Input";
import { isValidEmail } from "../../utils/helpers";
import FormRowVertical from "../../ui/FormRowVertical";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import { useSignup } from "./useSignup";
import SpinnerMini from "../../ui/SpinnerMini";

const StyledSignUpForm = styled.div`
  background-color: var(--color-grey-0);
  padding: 1rem;
  border-radius: 15px;
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

const PasswordContainer = styled.div`
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

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const { signup, isLoading } = useSignup();
  const { register, handleSubmit, formState, reset, getValues } = useForm();

  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  }
  return (
    <StyledSignUpForm>
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <FormRowVertical>
          <Label htmlFor="fullName">Full name</Label>
          <Input
            type="text"
            id="fullName"
            placeholder="Please enter your full name"
            {...register("fullName", {
              required: "This field is required",
            })}
            disabled={isLoading}
          />
          {errors?.fullName?.message && (
            <Error>{errors.fullName.message}</Error>
          )}
        </FormRowVertical>
        <FormRowVertical>
          <Label htmlFor="email">Email address</Label>
          <Input
            type="text"
            id="email"
            placeholder="Please choose your email address"
            {...register("email", {
              required: "This field is required",
              validate: (value) =>
                isValidEmail(value) || "Please insert a valid email address",
            })}
            disabled={isLoading}
          />
          {errors?.email?.message && <Error>{errors.email.message}</Error>}
        </FormRowVertical>
        <FormRowVertical>
          <Label htmlFor="password">Password (min 8 characters)</Label>
          <PasswordContainer>
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Please choose your password"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password needs a minimum of 8 characters",
                },
              })}
              disabled={isLoading}
            />
            <ShowPasswordButton
              title={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((show) => !show)}
              type="button"
            >
              {showPassword ? <HiOutlineEyeSlash /> : <HiOutlineEye />}
            </ShowPasswordButton>
          </PasswordContainer>
          {errors?.password?.message && (
            <Error>{errors.password.message}</Error>
          )}
        </FormRowVertical>
        <FormRowVertical>
          <Label htmlFor="password">Repeat password</Label>
          <PasswordContainer>
            <Input
              type={showPassword1 ? "text" : "password"}
              id="passwordConfirm"
              placeholder="Please repeat your password"
              {...register("passwordConfirm", {
                required: "This field is required",
                validate: (value) =>
                  value === getValues().password || "Passwords need to match",
              })}
              disabled={isLoading}
            />
            <ShowPasswordButton
              title={showPassword1 ? "Hide password" : "Show password"}
              onClick={() => setShowPassword1((show) => !show)}
              type="button"
            >
              {showPassword1 ? <HiOutlineEyeSlash /> : <HiOutlineEye />}
            </ShowPasswordButton>
          </PasswordContainer>
          {errors?.passwordConfirm?.message && (
            <Error>{errors.passwordConfirm.message}</Error>
          )}
        </FormRowVertical>
        <Button $variation="primary" disabled={isLoading}>
          {!isLoading ? "Sign up" : <SpinnerMini />}
        </Button>
        <Link to="/login">Already have an account? Sign in</Link>
      </Form>
    </StyledSignUpForm>
  );
}

export default SignUpForm;
