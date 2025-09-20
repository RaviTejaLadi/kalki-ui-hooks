import { useEffect, useRef } from "react";
import type { DependencyList, EffectCallback } from "react";

/**
 * Hook that works like useEffect but skips the first render (mount).
 * Only runs the effect on subsequent updates.
 *
 * @param effect - The effect callback function
 * @param deps - Dependency array, same as useEffect
 *
 * @example
 * ```tsx
 * function MyComponent({ userId }: { userId: string }) {
 *   const [user, setUser] = useState(null);
 *
 *   // This won't run on mount, only when userId changes
 *   useUpdateEffect(() => {
 *     console.log('User ID changed to:', userId);
 *     fetchUser(userId).then(setUser);
 *   }, [userId]);
 *
 *   return <div>...</div>;
 * }
 * ```
 */
export function useUpdateEffect(
  effect: EffectCallback,
  deps?: DependencyList
): void {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    return effect();
  }, deps);
}
