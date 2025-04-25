import { fetchWithRetry } from "@/api/functions";
import { useAppStore } from "@/store/store";

const useApiClient = () => {
  const setAppError = useAppStore((s) => s.setAppError);

  const handleApi = async <T>(fn: () => Promise<T>): Promise<T | null> => {
    try {
      setAppError(null);
      return await fn();
    } catch (error: any) {
      const message =
        error?.name === "AbortError"
          ? "Request was aborted."
          : error?.message || "Unknown error occurred.";

      setAppError(message);
      return null;
    }
  };

  const getSettings = () =>
    handleApi(async () => {
      const response = await fetchWithRetry("/settings", { method: "GET" });
      return response.json();
    });

  // Add more API methods using the same pattern
  return {
    getSettings,
  };
};

export default useApiClient;
