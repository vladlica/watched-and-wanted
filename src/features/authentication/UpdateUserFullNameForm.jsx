import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Label from "../../ui/Label";
import Error from "../../ui/Error";
import Input from "../../ui/Input";
import ButtonsList from "../../ui/ButtonsList";
import Button from "../../ui/Button";
import styled from "styled-components";
import { useUpdateUser } from "./useUpdateUser";
import { useOutletContext } from "react-router-dom";

const StyledUpdateUserFullNameForm = styled.div`
  background-color: var(--color-grey-0);
  padding: 1rem;
  border-radius: 15px;
  box-shadow: var(--shadow-md);
`;

function UpdateUserFullNameForm() {
  const {
    email,
    user_metadata: { fullName },
  } = useOutletContext();

  const { updateUser, isUpdating } = useUpdateUser();

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      email,
      fullName,
    },
  });

  const { errors } = formState;

  function handleCancel() {
    reset({ fullName });
  }

  function onSubmit({ fullName }) {
    updateUser({ fullName });
  }

  return (
    <StyledUpdateUserFullNameForm>
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <FormRow>
          <Label htmlFor="email">Email</Label>
          <Input
            type="text"
            id="email"
            {...register("email")}
            $width="50%"
            disabled
          />
        </FormRow>
        <FormRow>
          <Label htmlFor="fullName">Full name</Label>
          <Input
            type="text"
            id="fullName"
            placeholder="Please enter your full name"
            {...register("fullName", {
              required: "This field is required",
            })}
            $width="50%"
            disabled={isUpdating}
          />
          {errors?.fullName?.message && (
            <Error>{errors.fullName.message}</Error>
          )}
        </FormRow>
        <ButtonsList $justify="end">
          <Button $variation="primary" disabled={isUpdating}>
            Update full name
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
    </StyledUpdateUserFullNameForm>
  );
}

export default UpdateUserFullNameForm;
