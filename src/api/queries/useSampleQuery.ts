import { baseUrl, fetchJson } from "@/api/functions";
import useCustomQuery from "@/api/useCustomQuery";

export const SAMPLE_QUERY_KEY = "sample" as const;

const useSampleQuery = () =>
  useCustomQuery<any>(
    [SAMPLE_QUERY_KEY],
    async () => {
      const res = await fetchJson<{
        success: boolean;
        data: any;
      }>(`${baseUrl}/auth/status`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.success) {
        throw new Error("Failed to fetch.");
      }

      return res.data;
    },
    { refetchOnMount: "always" }
  );

export default useSampleQuery;
