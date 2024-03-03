import UpdateUserFullNameForm from "../features/authentication/UpdateUserFullNameForm";
import UpdateUserPasswordForm from "../features/authentication/UpdateUserPasswordForm";
import Row from "../ui/Row";

function Account() {
  return (
    <>
      <h1>Update your account</h1>

      <Row direction="vertical">
        <h3>Update your full name</h3>
        <UpdateUserFullNameForm />
      </Row>

      <Row direction="vertical">
        <h3>Update your password</h3>
        <UpdateUserPasswordForm />
      </Row>
    </>
  );
}

export default Account;
