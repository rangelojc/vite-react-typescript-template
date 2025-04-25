import { defaultQueryOptions } from "@/api/useCustomQuery";
import { useAppStore } from "@/store/store";
import {
  MutationKey,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";

// Error-handling wrapper
const useCustomMutation = <
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>(
  mutationKey: MutationKey,
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "mutationKey" | "mutationFn"
  >
) => {
  const setAppError = useAppStore((s) => s.setAppError);

  const handleApi = async (variables: TVariables) => {
    try {
      setAppError(null);
      return await mutationFn(variables);
    } catch (error: any) {
      const message =
        error?.name === "AbortError"
          ? "Request was aborted."
          : error?.message || "Unknown error occurred.";

      setAppError(message);
      throw error;
    }
  };

  return useMutation<TData, TError, TVariables, TContext>({
    mutationKey,
    mutationFn: handleApi,
    ...defaultQueryOptions,
    ...options,
  });
};

export default useCustomMutation;
