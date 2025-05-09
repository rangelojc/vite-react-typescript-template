import { baseUrl, customFetch, handleApiError } from "@/api/functions";
import useCustomQuery from "@/api/useCustomQuery";

export const SAMPLE_QUERY_KEY = "sample" as const;

const useSampleQuery = () =>
  useCustomQuery<any>([SAMPLE_QUERY_KEY], async () => {
    const rsp = await customFetch(`${baseUrl}/sample`, {
      method: "GET",
      credentials: "include",
    });

    if (rsp.status === 200) {
      const data = await rsp.json();
      return data.data;
    }

    handleApiError(rsp);
  });

export default useSampleQuery;
