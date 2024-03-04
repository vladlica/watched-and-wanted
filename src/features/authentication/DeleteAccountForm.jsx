import styled from "styled-components";
import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Label from "../../ui/Label";
import Input from "../../ui/Input";
import Error from "../../ui/Error";
import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import ButtonsList from "../../ui/ButtonsList";
import Button from "../../ui/Button";
import { useDeleteAccount } from "./useDeleteAccount";

const PasswordContainer = styled.div`
  display: flex;
  position: relative;
  /* width: 70%; */
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

function DeleteAccountForm({ onClose }) {
  const [showPassword, setShowPassword] = useState(false);

  const { deleteAccount, isDeleting } = useDeleteAccount();
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      password: "",
    },
  });

  const { errors } = formState;

  function onSubmit({ password }) {
    deleteAccount(password, { onSettled: () => reset() });
  }
  return (
    <>
      <h1>Delete account</h1>
      <p>
        Deleting your account will remove all of your information from our
        database. This cannot be undone.
      </p>
      <Form onSubmit={handleSubmit(onSubmit)} $size="large" autoComplete="off">
        <FormRow>
          <Label htmlFor="password">Your password</Label>
          <PasswordContainer>
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Please enter your current password"
              {...register("password", {
                required: "This field is required",
              })}
              disabled={isDeleting}
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

        <ButtonsList $justify="end">
          <Button $variation="danger" disabled={isDeleting}>
            Delete account
          </Button>
          <Button
            $variation="secondary"
            onClick={onClose}
            type="button"
            disabled={isDeleting}
          >
            Cancel
          </Button>
        </ButtonsList>
      </Form>
    </>
  );
}

export default DeleteAccountForm;
