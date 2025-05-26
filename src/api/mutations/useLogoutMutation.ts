import { baseUrl, customFetch } from "@/api/functions";
import useCustomMutation from "@/api/useCustomMutation";

const useLogoutMutation = () => {
  return useCustomMutation(["logout"], async () => {
    const rsp = await customFetch(`${baseUrl}/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (rsp.status === 200) {
      return undefined;
    }

    return rsp;
  });
};

export default useLogoutMutation;
