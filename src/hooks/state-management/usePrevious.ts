import { useRef, useEffect } from "react";

/**
 * Custom hook that returns the previous value of a state or prop.
 *
 * This hook is useful for:
 * - Comparing current and previous values
 * - Implementing animations based on value changes
 * - Debugging state changes
 * - Conditional effects based on previous values
 *
 * @template T - The type of the value to track
 * @param value - The current value to track
 * @returns The previous value, or undefined on first render
 *
 * @example
 * ```tsx
 * function Counter() {
 *   const [count, setCount] = useState(0);
 *   const prevCount = usePrevious(count);
 *
 *   return (
 *     <div>
 *       <p>Current: {count}</p>
 *       <p>Previous: {prevCount ?? 'N/A'}</p>
 *       <button onClick={() => setCount(c => c + 1)}>
 *         Increment
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * function UserProfile({ userId }: { userId: string }) {
 *   const [user, setUser] = useState<User | null>(null);
 *   const prevUserId = usePrevious(userId);
 *
 *   useEffect(() => {
 *     // Only fetch if userId actually changed
 *     if (userId !== prevUserId) {
 *       fetchUser(userId).then(setUser);
 *     }
 *   }, [userId, prevUserId]);
 *
 *   return <div>{user?.name}</div>;
 * }
 * ```
 */
export function usePrevious<T>(value: T): T | undefined {
  // Create a ref to store the previous value
  const ref = useRef<T | undefined>(undefined);

  // Update the ref with the current value after render
  useEffect(() => {
    ref.current = value;
  });

  // Return the previous value (from before the current render)
  return ref.current;
}
