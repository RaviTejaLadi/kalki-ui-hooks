import { useState, useCallback } from "react";

/**
 * Return type for the useToggle hook
 */
export interface UseToggleReturn {
  /** Current boolean value */
  value: boolean;
  /** Toggle the current value */
  toggle: () => void;
  /** Set value to true */
  setTrue: () => void;
  /** Set value to false */
  setFalse: () => void;
  /** Set value to a specific boolean */
  setValue: (value: boolean) => void;
}

/**
 * A custom React hook for managing boolean state with toggle functionality.
 *
 * @param initialValue - The initial boolean value (defaults to false)
 * @returns An object containing the current value and methods to manipulate it
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { value: isVisible, toggle, setTrue, setFalse } = useToggle(false);
 *
 *   return (
 *     <div>
 *       <button onClick={toggle}>Toggle</button>
 *       <button onClick={setTrue}>Show</button>
 *       <button onClick={setFalse}>Hide</button>
 *       {isVisible && <div>Content is visible!</div>}
 *     </div>
 *   );
 * }
 * ```
 */
export function useToggle(initialValue: boolean = false): UseToggleReturn {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  const setValueCallback = useCallback((newValue: boolean) => {
    setValue(newValue);
  }, []);

  return {
    value,
    toggle,
    setTrue,
    setFalse,
    setValue: setValueCallback,
  };
}
