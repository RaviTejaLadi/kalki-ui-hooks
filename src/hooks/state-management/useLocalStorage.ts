import { useState, useEffect } from "react";

/**
 * A custom React hook that synchronizes state with `localStorage`.
 *
 * @template T The type of the stored value.
 * @param {string} key - The key in `localStorage` to store the value.
 * @param {T} initialValue - The initial value to use if the key is not found in `localStorage`.
 * @returns {[T, React.Dispatch<React.SetStateAction<T>>]}
 * An array containing:
 *  - The current stateful value.
 *  - A setter function to update the value (just like `useState`).
 *
 * @example
 * ```tsx
 * const [name, setName] = useLocalStorage<string>("username", "Guest");
 *
 * return (
 *   <div>
 *     <p>Hello, {name}</p>
 *     <button onClick={() => setName("John")}>Set Name</button>
 *   </div>
 * );
 * ```
 *
 * @remarks
 * - Automatically serializes and deserializes JSON.
 * - Safely handles SSR by checking for `window` existence.
 * - Wraps all read/write operations in try/catch to avoid breaking on `localStorage` errors.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === "undefined") return initialValue;
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
