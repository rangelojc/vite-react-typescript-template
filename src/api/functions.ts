export const baseUrl = import.meta.env.VITE_API_URL || "/api";
export const apiKey = import.meta.env.VITE_API_KEY;

export const fetchJson = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.message || `Error Code ${response.status}`);
  }

  return response.json();
};

export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries = 3,
  retryDelay = 1000,
  signal?: AbortSignal
): Promise<Response> {
  let attempt = 0;

  while (attempt <= retries) {
    try {
      const controller = new AbortController();
      const timeoutSignal = signal
        ? mergeAbortSignals(signal, controller.signal)
        : controller.signal;

      const response = await fetch(url, { ...options, signal: timeoutSignal });

      if (!response.ok) {
        const isServerError = response.status >= 500 && response.status < 600;
        if (isServerError) {
          throw new Error(`Server error: ${response.status}`);
        }
      }

      return response;
    } catch (err: any) {
      if (signal?.aborted || err.name === "AbortError") {
        throw new DOMException("Aborted", "AbortError");
      }

      if (attempt === retries) {
        throw err;
      }

      await delay(retryDelay);
      attempt++;
    }
  }

  throw new Error("Fetch failed after retries");
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function mergeAbortSignals(...signals: AbortSignal[]): AbortSignal {
  const controller = new AbortController();

  for (const signal of signals) {
    if (!signal) continue;
    if (signal.aborted) {
      controller.abort();
      break;
    }
    signal.addEventListener("abort", () => controller.abort(), { once: true });
  }

  return controller.signal;
}
