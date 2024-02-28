import styled from "styled-components";
import Logo from "../ui/Logo";
import SignUpForm from "../features/authentication/SignUpForm";

const StyledSignUp = styled.div`
  min-height: 100vh;
  background-color: var(--color-grey-50);
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
`;

const Heading = styled.h4`
  font-size: 3rem;
  font-weight: 600;
  text-align: center;
`;

function SignUp() {
  return (
    <StyledSignUp>
      <Logo />
      <Heading>Create account</Heading>
      <SignUpForm />
    </StyledSignUp>
  );
}

export default SignUp;
