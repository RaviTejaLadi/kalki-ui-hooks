import { useEffect, useRef } from "react";

/**
 * Hook that runs a function when the component unmounts.
 * Similar to componentWillUnmount in class components.
 *
 * @param fn - Function to run on unmount
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const [count, setCount] = useState(0);
 *
 *   useUnmount(() => {
 *     console.log('Component unmounting, final count was:', count);
 *     // Cleanup subscriptions, timers, etc.
 *     clearInterval(intervalId);
 *   });
 *
 *   return <div>Count: {count}</div>;
 * }
 * ```
 */
export function useUnmount(fn: () => void): void {
  const fnRef = useRef(fn);

  // Keep the function reference up to date
  fnRef.current = fn;

  useEffect(() => {
    return () => {
      fnRef.current();
    };
  }, []); // Empty dependency array ensures cleanup runs only on unmount
}
