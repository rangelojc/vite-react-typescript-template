import { baseUrl, customFetch } from "@/api/functions";
import useCustomMutation from "@/api/useCustomMutation";
import { useAuthProtectedQuery } from "@/hooks/useAuth";
import useBrowserCookie from "@/hooks/useBrowserCookie";
import { Cookies } from "@/types/app";

const useSampleProtectedMutation = () => {
  const authProtectedQuery = useAuthProtectedQuery();
  const atCookie = useBrowserCookie(Cookies.ACCESSTOKEN);

  return useCustomMutation(["/test"], () =>
    authProtectedQuery(() =>
      customFetch(`${baseUrl}/test`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          ...atCookie.getHttpHeader().headers,
        },
      })
    )
  );
};

export default useSampleProtectedMutation;
