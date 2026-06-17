import { useEffect, useRef, useCallback } from "react";

export function usePolling(
  fn: () => Promise<boolean>, // return true to stop polling
  intervalMs: number,
  active: boolean
) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const stop = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (!active) return;

    timerRef.current = setInterval(async () => {
      try {
        const done = await fn();
        if (done) stop();
      } catch (err) {
        console.error("Polling error", err);
      }
    }, intervalMs);

    return () => stop();
  }, [active, fn, intervalMs, stop]);

  return { stop };
}
