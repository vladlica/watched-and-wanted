import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import Error from "../../ui/Error";
import Label from "../../ui/Label";
import ButtonsList from "../../ui/ButtonsList";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import { useUpdateUser } from "./useUpdateUser";
import PasswordInput from "../../ui/PasswordInput";
import RoundBox from "../../ui/RoundBox";

function UpdateUserPasswordForm() {
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
    <RoundBox>
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <FormRow>
          <Label htmlFor="password">New password</Label>
          <PasswordInput
            id="password"
            placeholder="Please enter your new password"
            register={register}
            rules={{
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
            }}
            disabled={isUpdating}
          />
          {errors?.password?.message && (
            <Error>{errors.password.message}</Error>
          )}
        </FormRow>

        <FormRow>
          <Label htmlFor="password">Confirm password</Label>
          <PasswordInput
            id="passwordConfirm"
            placeholder="Please confirm your new password"
            register={register}
            rules={{
              required: "This field is required",
              validate: (value) =>
                getValues().password === value || "Passwords need to match",
            }}
            disabled={isUpdating}
          />
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
    </RoundBox>
  );
}

export default UpdateUserPasswordForm;
