import { handleApi } from "@/api/functions";
import { useAppStore } from "@/store/store";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

// Reusable default options
export const defaultQueryOptions = {
  staleTime: 5 * 60 * 1000,
  retry: 2,
};

// Error-handling wrapper
const useCustomQuery = <TData = unknown, TError = unknown>(
  queryKey: QueryKey,
  queryFn: () => Promise<TData>,
  options?: Omit<
    UseQueryOptions<TData, TError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  const setAppError = useAppStore((s) => s.setAppError);

  return useQuery<TData, TError>({
    queryKey,
    queryFn: () => handleApi(queryFn, setAppError),
    ...defaultQueryOptions,
    ...options,
  });
};

export default useCustomQuery;
