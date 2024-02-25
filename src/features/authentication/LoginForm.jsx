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

const StyledLoginForm = styled.div`
  background-color: var(--color-grey-0);
  padding: 1rem;
  border-radius: 15px;
  box-shadow: var(--shadow-md);
`;

function LoginForm() {
  const { login, isLoading } = useLogin();
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      email: "test@test.com",
      password: "test",
    },
  });

  const { errors } = formState;

  function onSubmit(data) {
    console.log("submit");
    console.log(data);

    login({ email: data.email, password: data.password });
  }

  return (
    <StyledLoginForm>
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            placeholder="Please enter your password"
            {...register("password", {
              required: "This field is required",
            })}
            disabled={isLoading}
          />
          {errors?.password?.message && (
            <Error>{errors.password.message}</Error>
          )}
        </FormRowVertical>
        <Button $variation="primary" disabled={isLoading}>
          {!isLoading ? "Log in" : <SpinnerMini />}
        </Button>
      </Form>
    </StyledLoginForm>
  );
}

export default LoginForm;
