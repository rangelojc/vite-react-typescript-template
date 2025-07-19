import { throwUnhandledApiError } from "@/api/functions";
import useRefreshTokenMutation from "@/api/mutations/useRefreshTokenMutation";
import useBrowserCookie from "@/hooks/useBrowserCookie";
import { RouteDefinition } from "@/pages/main";
import { useAppStore } from "@/store/store";
import { Cookies } from "@/types/app";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const UNAUTHENTICATED = "notLoggedIn";

export const useLogoutOnUnauthorized = () => {
  const navigate = useNavigate();
  const setIsLoggedIn = useAppStore((s) => s.setIsLoggedIn);
  const atCookie = useBrowserCookie(Cookies.ACCESSTOKEN);
  const rtCookie = useBrowserCookie(Cookies.REFRESHTOKEN);

  return useCallback(async () => {
    atCookie.remove();
    rtCookie.remove();
    setIsLoggedIn(false);
    navigate({
      pathname: RouteDefinition.LOGIN,
      search: `?${UNAUTHENTICATED}=true`,
    });
  }, []);
};

export const useAttemptRefreshTokenOrLogout = () => {
  const navigate = useNavigate();
  const setIsLoggedIn = useAppStore((s) => s.setIsLoggedIn);
  const atCookie = useBrowserCookie(Cookies.ACCESSTOKEN);
  const rtCookie = useBrowserCookie(Cookies.REFRESHTOKEN);
  const { mutateAsync: refresh } = useRefreshTokenMutation();

  return useCallback(async () => {
    try {
      await refresh();
      return true;
    } catch (err) {}

    atCookie.remove();
    rtCookie.remove();
    setIsLoggedIn(false);
    navigate({
      pathname: RouteDefinition.LOGIN,
      search: `?${UNAUTHENTICATED}=true`,
    });
  }, []);
};

export const useAuthProtectedQuery = () => {
  const attemptRefreshTokenOrLogout = useAttemptRefreshTokenOrLogout();

  return async <T>(
    fetchFn: () => Promise<Response>,
    successFn?: (rsp: Response) => Promise<T>
  ): Promise<T | undefined> => {
    const response = await fetchFn();

    if (response.status === 200) {
      return successFn?.(response);
    }

    if (response.status === 401 || response.status === 403) {
      const didRefresh = await attemptRefreshTokenOrLogout();
      if (didRefresh) {
        const retryResponse = await fetchFn();
        if (retryResponse.status === 200) return successFn?.(retryResponse);
        else throw await throwUnhandledApiError(retryResponse);
      } else throw new Error("Unauthorized");
    }

    throw await throwUnhandledApiError(response);
  };
};
