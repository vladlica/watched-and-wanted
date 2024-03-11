import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import Error from "../../ui/Error";
import Label from "../../ui/Label";
import Input from "../../ui/Input";
import { isValidEmail } from "../../utils/helpers";
import FormRowVertical from "../../ui/FormRowVertical";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import { useSignup } from "./useSignup";
import SpinnerMini from "../../ui/SpinnerMini";
import RoundBox from "../../ui/RoundBox";
import PasswordInput from "../../ui/PasswordInput";

function SignUpForm() {
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
    <RoundBox>
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
          <PasswordInput
            id="password"
            placeholder="Please choose your password"
            register={register}
            rules={{
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
            }}
            disabled={isLoading}
          />
          {errors?.password?.message && (
            <Error>{errors.password.message}</Error>
          )}
        </FormRowVertical>
        <FormRowVertical>
          <Label htmlFor="password">Repeat password</Label>
          <PasswordInput
            id="passwordConfirm"
            placeholder="Please repeat your password"
            register={register}
            rules={{
              required: "This field is required",
              validate: (value) =>
                value === getValues().password || "Passwords need to match",
            }}
            disabled={isLoading}
          />
          {errors?.passwordConfirm?.message && (
            <Error>{errors.passwordConfirm.message}</Error>
          )}
        </FormRowVertical>
        <Button $variation="primary" disabled={isLoading}>
          {!isLoading ? "Sign up" : <SpinnerMini />}
        </Button>
        <Link to="/login">Already have an account? Sign in</Link>
      </Form>
    </RoundBox>
  );
}

export default SignUpForm;
