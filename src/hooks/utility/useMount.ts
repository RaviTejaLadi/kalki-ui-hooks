import { useEffect } from "react";

/**
 * Hook that runs a function only once when the component mounts.
 * Similar to componentDidMount in class components.
 *
 * @param fn - Function to run on mount
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const [data, setData] = useState(null);
 *
 *   useMount(() => {
 *     console.log('Component mounted');
 *     fetchInitialData().then(setData);
 *   });
 *
 *   return <div>{data ? 'Loaded' : 'Loading...'}</div>;
 * }
 * ```
 */
export function useMount(fn: () => void): void {
  useEffect(() => {
    fn();
  }, []); // Empty dependency array ensures this runs only once
}
