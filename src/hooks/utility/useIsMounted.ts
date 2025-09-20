import { useCallback, useEffect, useRef } from "react";

/**
 * Hook to track whether a component is currently mounted.
 * Useful for preventing state updates on unmounted components.
 *
 * @returns A function that returns true if the component is mounted, false otherwise
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const isMounted = useIsMounted();
 *
 *   const fetchData = async () => {
 *     const data = await api.getData();
 *     // Only update state if component is still mounted
 *     if (isMounted()) {
 *       setData(data);
 *     }
 *   };
 *
 *   return <div>...</div>;
 * }
 * ```
 */
export function useIsMounted(): () => boolean {
  const mountedRef = useRef(false);
  const get = useCallback(() => mountedRef.current, []);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return get;
}
