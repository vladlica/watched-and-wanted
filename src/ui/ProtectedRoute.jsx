import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import Spinner from "./Spinner";
import { useUser } from "../features/authentication/useUser";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Restricts access for the unauthenticated users
// Props:
// - children: ReactNode - The component to be rendered if the user is authenticated
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { user, isLoading, isAuthenticated } = useUser();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuthenticated)
    // Enables the children component to access and utilize user-related information seamlessly
    return React.cloneElement(children, {
      user,
    });
}

export default ProtectedRoute;
