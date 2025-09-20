import { useRef, MutableRefObject } from "react";

/**
 * Hook that returns a ref which always contains the latest value.
 * Useful for accessing the current value in callbacks without re-creating them.
 *
 * @param value - The value to keep track of
 * @returns MutableRefObject containing the latest value
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const [count, setCount] = useState(0);
 *   const [name, setName] = useState('');
 *   const latestCount = useLatest(count);
 *
 *   // This callback doesn't need to change when count changes
 *   const handleSubmit = useCallback(() => {
 *     // Always gets the latest count value
 *     console.log('Submitting with count:', latestCount.current);
 *     api.submit({ name, count: latestCount.current });
 *   }, [name]); // Only recreated when name changes
 *
 *   return (
 *     <div>
 *       <input value={name} onChange={(e) => setName(e.target.value)} />
 *       <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
 *       <button onClick={handleSubmit}>Submit</button>
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Useful for cleanup functions that need access to latest state
 * function useWebSocket(url: string) {
 *   const [messages, setMessages] = useState<string[]>([]);
 *   const latestMessages = useLatest(messages);
 *
 *   useEffect(() => {
 *     const ws = new WebSocket(url);
 *
 *     ws.onclose = () => {
 *       // Can access latest messages even if effect doesn't re-run
 *       console.log('Connection closed, had', latestMessages.current.length, 'messages');
 *     };
 *
 *     return () => ws.close();
 *   }, [url]); // Doesn't depend on messages
 * }
 * ```
 */
export function useLatest<T>(value: T): MutableRefObject<T> {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}
