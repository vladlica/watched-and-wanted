import DeleteAccountButton from "../features/authentication/DeleteAccountButton";
import UpdateUserFullNameForm from "../features/authentication/UpdateUserFullNameForm";
import UpdateUserPasswordForm from "../features/authentication/UpdateUserPasswordForm";
import UserCreated from "../features/authentication/UserCreated";
import Row from "../ui/Row";

function Account() {
  return (
    <>
      <Row direction="horizontal">
        <h1>Update your account</h1>
        <UserCreated />
      </Row>

      <Row direction="vertical">
        <h3>Update your full name</h3>
        <UpdateUserFullNameForm />
      </Row>

      <Row direction="vertical">
        <h3>Update your password</h3>
        <UpdateUserPasswordForm />
      </Row>

      <DeleteAccountButton />
    </>
  );
}

export default Account;
