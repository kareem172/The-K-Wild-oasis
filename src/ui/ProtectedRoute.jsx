import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useEffect } from "react";

const FullPage = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-50);
`;
function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const { isAuthenticated, isLoading } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login",{replace:true});
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
