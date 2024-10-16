import { useForm } from "react-hook-form";
import { useDeleteAccount } from "./useDeleteAccount";
import { useOutletContext } from "react-router-dom";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Label from "../../ui/Label";
import Error from "../../ui/Error";
import ButtonsList from "../../ui/ButtonsList";
import Button from "../../ui/Button";
import PasswordInput from "../../ui/PasswordInput";

// Props:
// - onClose: Object - Function to close the form
function DeleteAccountForm({ onClose }) {
  const { deleteAccount, isDeleting } = useDeleteAccount();
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      password: "",
    },
  });

  const { id: userId } = useOutletContext();

  const { errors } = formState;

  function onSubmit({ password }) {
    deleteAccount({ password, userId }, { onSettled: () => reset() });
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
          <PasswordInput
            id="password"
            placeholder="Please enter your current password"
            register={register}
            rules={{
              required: "This field is required",
            }}
            disabled={isDeleting}
          />
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
