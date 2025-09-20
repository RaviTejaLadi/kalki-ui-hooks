import { useState, useCallback } from "react";

/**
 * Options for configuring the useCounter hook
 */
export interface UseCounterOptions {
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
  /** Step size for increment/decrement operations */
  step?: number;
}

/**
 * Return type for the useCounter hook
 */
export interface UseCounterReturn {
  /** Current counter value */
  count: number;
  /** Increment the counter by step amount */
  increment: () => void;
  /** Decrement the counter by step amount */
  decrement: () => void;
  /** Set counter to a specific value */
  set: (value: number) => void;
  /** Reset counter to initial value */
  reset: () => void;
}

/**
 * A custom React hook for managing counter state with increment, decrement, and bounds checking.
 *
 * @param initialValue - The initial counter value (defaults to 0)
 * @param options - Configuration options for min, max, and step values
 * @returns An object containing the current count and methods to manipulate it
 *
 * @example
 * ```tsx
 * function Counter() {
 *   const { count, increment, decrement, reset, set } = useCounter(0, {
 *     min: 0,
 *     max: 10,
 *     step: 2
 *   });
 *
 *   return (
 *     <div>
 *       <p>Count: {count}</p>
 *       <button onClick={increment}>+2</button>
 *       <button onClick={decrement}>-2</button>
 *       <button onClick={() => set(5)}>Set to 5</button>
 *       <button onClick={reset}>Reset</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useCounter(
  initialValue: number = 0,
  options: UseCounterOptions = {}
): UseCounterReturn {
  const { min = -Infinity, max = Infinity, step = 1 } = options;

  const [count, setCount] = useState<number>(() => {
    // Ensure initial value is within bounds
    return Math.min(Math.max(initialValue, min), max);
  });

  const increment = useCallback(() => {
    setCount((prev) => Math.min(prev + step, max));
  }, [step, max]);

  const decrement = useCallback(() => {
    setCount((prev) => Math.max(prev - step, min));
  }, [step, min]);

  const set = useCallback(
    (value: number) => {
      setCount(Math.min(Math.max(value, min), max));
    },
    [min, max]
  );

  const reset = useCallback(() => {
    setCount(Math.min(Math.max(initialValue, min), max));
  }, [initialValue, min, max]);

  return {
    count,
    increment,
    decrement,
    set,
    reset,
  };
}
