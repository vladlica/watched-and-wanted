import { useForm } from "react-hook-form";
import styled from "styled-components";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Error from "../../ui/Error";
import Label from "../../ui/Label";
import ButtonsList from "../../ui/ButtonsList";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import { useUpdateUser } from "./useUpdateUser";
import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";

const StyledUpdateUserPasswordForm = styled.div`
  background-color: var(--color-grey-0);
  padding: 1rem;
  border-radius: 15px;
  box-shadow: var(--shadow-md);
`;

const PasswordContainer = styled.div`
  display: flex;
  position: relative;
  width: 70%;
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

function UpdateUserPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const { updateUser, isUpdating } = useUpdateUser();

  const { register, handleSubmit, formState, reset, getValues } = useForm({
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  const { errors } = formState;

  function handleCancel() {
    reset();
  }

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: () => reset() });
  }

  return (
    <StyledUpdateUserPasswordForm>
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <FormRow>
          <Label htmlFor="password">New password</Label>
          <PasswordContainer>
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Please enter your new password"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password needs a minimum of 8 characters",
                },
              })}
              disabled={isUpdating}
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
        </FormRow>

        <FormRow>
          <Label htmlFor="password">Confirm password</Label>
          <PasswordContainer>
            <Input
              type={showPassword1 ? "text" : "password"}
              id="passwordConfirm"
              placeholder="Please confirm your new password"
              {...register("passwordConfirm", {
                required: "This field is required",
                validate: (value) =>
                  getValues().password === value || "Passwords need to match",
              })}
              disabled={isUpdating}
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
        </FormRow>

        <ButtonsList $justify="end">
          <Button $variation="primary" disabled={isUpdating}>
            Update password
          </Button>
          <Button
            $variation="secondary"
            onClick={handleCancel}
            type="button"
            disabled={isUpdating}
          >
            Cancel
          </Button>
        </ButtonsList>
      </Form>
    </StyledUpdateUserPasswordForm>
  );
}

export default UpdateUserPasswordForm;
