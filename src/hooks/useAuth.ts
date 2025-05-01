import useAuthStatusQuery from "@/api/queries/useAuthStatusQuery";
import { RouteDefinition } from "@/pages/main";
import { useAppStore } from "@/store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const setIsLoggedIn = useAppStore((s) => s.setIsLoggedIn);

  const { data: authStatus, isFetched } = useAuthStatusQuery();

  useEffect(() => {
    if (authStatus) setIsLoggedIn(authStatus.authStatus || false);
  }, [authStatus]);

  const redirectIfUnauthenticated = (
    route: RouteDefinition = RouteDefinition.HOME
  ) => {
    if (!isFetched) return; // Don't redirect until we know the auth status
    if (!authStatus?.authStatus) navigate(route);
  };

  return {
    authStatus,
    redirectIfUnauthenticated,
  };
};

export const useRedirectIfUnauthenticated = () => {
  const { authStatus, redirectIfUnauthenticated } = useAuth();

  useEffect(() => {
    redirectIfUnauthenticated();
  }, [authStatus]);
};

export default useAuth;
