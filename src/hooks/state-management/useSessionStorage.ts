import { useState, useEffect } from "react";

/**
 * A custom React hook that synchronizes state with `sessionStorage`.
 *
 * @template T The type of the stored value.
 * @param {string} key - The key in `sessionStorage` to store the value.
 * @param {T} initialValue - The initial value to use if the key is not found in `sessionStorage`.
 * @returns {[T, React.Dispatch<React.SetStateAction<T>>]}
 * An array containing:
 *  - The current stateful value.
 *  - A setter function to update the value (just like `useState`).
 *
 * @example
 * ```tsx
 * const [count, setCount] = useSessionStorage<number>("counter", 0);
 *
 * return (
 *   <div>
 *     <p>Count: {count}</p>
 *     <button onClick={() => setCount(count + 1)}>Increment</button>
 *   </div>
 * );
 * ```
 *
 * @remarks
 * - Automatically serializes and deserializes JSON.
 * - Safe for SSR by checking for `window` before accessing storage.
 * - Useful for storing data that should only persist for the browser session (e.g., temporary form data).
 */
export function useSessionStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === "undefined") return initialValue;
      const item = window.sessionStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading sessionStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error setting sessionStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
