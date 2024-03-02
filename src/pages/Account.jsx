import UpdateUserFullName from "../features/authentication/UpdateUserFullName";
import Row from "../ui/Row";

function Account() {
  return (
    <>
      <h1>Update your account</h1>

      <Row direction="vertical">
        <h3>Update your full name</h3>
        <UpdateUserFullName />
      </Row>

      <Row direction="vertical">
        <h3>Update your password</h3>
      </Row>
    </>
  );
}

export default Account;
