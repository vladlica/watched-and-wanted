import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { isValidEmail } from "../../utils/helpers";
import { useLogin } from "./useLogin";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Label from "../../ui/Label";
import Button from "../../ui/Button";
import FormRowVertical from "../../ui/FormRowVertical";
import Error from "../../ui/Error";
import SpinnerMini from "../../ui/SpinnerMini";
import RoundBox from "../../ui/RoundBox";
import PasswordInput from "../../ui/PasswordInput";

function LoginForm() {
  const { login, isLoading } = useLogin();
  const { register, handleSubmit, formState, reset } = useForm();

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
    <RoundBox>
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <FormRowVertical>
          <Label htmlFor="email">Email address</Label>
          <Input
            type="text"
            id="email"
            placeholder="Please enter your email address"
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
          <PasswordInput
            id="password"
            placeholder="Please enter your password"
            register={register}
            rules={{
              required: "This field is required",
            }}
            disabled={isLoading}
          />
          {errors?.password?.message && (
            <Error>{errors.password.message}</Error>
          )}
        </FormRowVertical>
        <Button $variation="primary" disabled={isLoading}>
          {!isLoading ? "Log in" : <SpinnerMini />}
        </Button>
        <Link to="/signup">Create account</Link>
      </Form>
    </RoundBox>
  );
}

export default LoginForm;
