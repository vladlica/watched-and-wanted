import styled from "styled-components";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Label from "../../ui/Label";
import Button from "../../ui/Button";
import FormRowVertical from "../../ui/FormRowVertical";
import { useForm } from "react-hook-form";
import Error from "../../ui/Error";
import { isValidEmail } from "../../utils/helpers";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { useState } from "react";
import { Link } from "react-router-dom";

const StyledLoginForm = styled.div`
  background-color: var(--color-grey-0);
  padding: 1rem;
  border-radius: 15px;
  box-shadow: var(--shadow-md);

  & a:link,
  a:visited {
    color: var(--color-orange-700);
  }

  & a:hover,
  a:active {
    text-decoration: underline;
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
`;

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useLogin();
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      email: "test@test.com",
      password: "quotidien",
    },
  });

  const { errors } = formState;

  function onSubmit({ email, password }) {
    login(
      { email, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <StyledLoginForm>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRowVertical>
          <Label htmlFor="email">Email address</Label>
          <Input
            type="text"
            id="email"
            placeholder="Please enter your email address"
            autoComplete="username"
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
          <Label htmlFor="password">Password</Label>
          <PasswordContainer>
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              placeholder="Please enter your password"
              {...register("password", {
                required: "This field is required",
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
        <Button $variation="primary" disabled={isLoading}>
          {!isLoading ? "Log in" : <SpinnerMini />}
        </Button>
        <Link to="/signup">Create account</Link>
      </Form>
    </StyledLoginForm>
  );
}

export default LoginForm;
