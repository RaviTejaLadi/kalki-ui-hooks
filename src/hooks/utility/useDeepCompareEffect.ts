import { useEffect, useRef, DependencyList, EffectCallback } from "react";

/**
 * Deep equality comparison function
 */
function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;

  if (a == null || b == null) return a === b;

  if (typeof a !== typeof b) return false;

  if (typeof a !== "object") return a === b;

  if (Array.isArray(a) !== Array.isArray(b)) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }

  return true;
}

/**
 * Hook that works like useEffect but uses deep comparison for dependencies.
 * Useful when dependencies are objects or arrays that might have the same content
 * but different references.
 *
 * @param effect - The effect callback function
 * @param deps - Dependency array that will be deeply compared
 *
 * @example
 * ```tsx
 * function MyComponent({ config }: { config: { url: string; params: Record<string, any> } }) {
 *   const [data, setData] = useState(null);
 *
 *   // This will only re-run if the actual content of config changes,
 *   // not just the reference
 *   useDeepCompareEffect(() => {
 *     fetchData(config).then(setData);
 *   }, [config]);
 *
 *   return <div>...</div>;
 * }
 * ```
 */
export function useDeepCompareEffect(
  effect: EffectCallback,
  deps?: DependencyList
): void {
  const ref = useRef<DependencyList | undefined>();
  const signalRef = useRef<number>(0);

  if (!deps || !deepEqual(deps, ref.current)) {
    ref.current = deps;
    signalRef.current += 1;
  }

  useEffect(effect, [signalRef.current]);
}
