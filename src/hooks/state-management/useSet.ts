import { useState, useCallback } from "react";

/**
 * Return type for the useSet hook
 */
export interface UseSetReturn<T> {
  /** Current Set instance */
  set: Set<T>;
  /** Add a value to the set */
  add: (value: T) => void;
  /** Check if a value exists in the set */
  has: (value: T) => boolean;
  /** Delete a value from the set */
  delete: (value: T) => boolean;
  /** Toggle a value in the set (add if not present, remove if present) */
  toggle: (value: T) => void;
  /** Clear all values from the set */
  clear: () => void;
  /** Get the size of the set */
  size: number;
  /** Get all values from the set */
  values: () => IterableIterator<T>;
  /** Convert set to array */
  toArray: () => T[];
  /** Reset set to initial state */
  reset: () => void;
  /** Add multiple values to the set */
  addMultiple: (values: T[] | Set<T>) => void;
  /** Remove multiple values from the set */
  deleteMultiple: (values: T[] | Set<T>) => void;
  /** Check if the set is a subset of another set */
  isSubsetOf: (otherSet: Set<T>) => boolean;
  /** Check if the set is a superset of another set */
  isSupersetOf: (otherSet: Set<T>) => boolean;
}

/**
 * A custom React hook for managing Set state with all Set operations and additional utilities.
 *
 * @param initialValues - Initial values for the set (defaults to empty)
 * @returns An object containing the current set and methods to manipulate it
 *
 * @example
 * ```tsx
 * function TagSelector() {
 *   const { set: selectedTags, add, delete: removeTag, has, toggle, clear, toArray } =
 *     useSet<string>(['react', 'typescript']);
 *
 *   const availableTags = ['react', 'typescript', 'javascript', 'node', 'express'];
 *
 *   return (
 *     <div>
 *       <h3>Available Tags:</h3>
 *       {availableTags.map(tag => (
 *         <button
 *           key={tag}
 *           onClick={() => toggle(tag)}
 *           style={{
 *             backgroundColor: has(tag) ? 'blue' : 'gray',
 *             color: 'white'
 *           }}
 *         >
 *           {tag} {has(tag) ? '✓' : ''}
 *         </button>
 *       ))}
 *
 *       <h3>Selected Tags:</h3>
 *       <p>{toArray().join(', ') || 'None selected'}</p>
 *       <button onClick={clear}>Clear All</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useSet<T>(initialValues: T[] | Set<T> = []): UseSetReturn<T> {
  const [set, setSet] = useState<Set<T>>(() => {
    return new Set(initialValues);
  });

  const add = useCallback((value: T) => {
    setSet((prev) => {
      const newSet = new Set(prev);
      newSet.add(value);
      return newSet;
    });
  }, []);

  const has = useCallback(
    (value: T): boolean => {
      return set.has(value);
    },
    [set]
  );

  const deleteValue = useCallback((value: T): boolean => {
    let deleted = false;
    setSet((prev) => {
      const newSet = new Set(prev);
      deleted = newSet.delete(value);
      return newSet;
    });
    return deleted;
  }, []);

  const toggle = useCallback((value: T) => {
    setSet((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
      return newSet;
    });
  }, []);

  const clear = useCallback(() => {
    setSet(new Set());
  }, []);

  const values = useCallback(() => {
    return set.values();
  }, [set]);

  const toArray = useCallback((): T[] => {
    return Array.from(set);
  }, [set]);

  const reset = useCallback(() => {
    setSet(new Set(initialValues));
  }, [initialValues]);

  const addMultiple = useCallback((newValues: T[] | Set<T>) => {
    setSet((prev) => {
      const newSet = new Set(prev);
      if (newValues instanceof Set) {
        newValues.forEach((value) => newSet.add(value));
      } else {
        newValues.forEach((value) => newSet.add(value));
      }
      return newSet;
    });
  }, []);

  const deleteMultiple = useCallback((valuesToDelete: T[] | Set<T>) => {
    setSet((prev) => {
      const newSet = new Set(prev);
      if (valuesToDelete instanceof Set) {
        valuesToDelete.forEach((value) => newSet.delete(value));
      } else {
        valuesToDelete.forEach((value) => newSet.delete(value));
      }
      return newSet;
    });
  }, []);

  const isSubsetOf = useCallback(
    (otherSet: Set<T>): boolean => {
      return Array.from(set).every((value) => otherSet.has(value));
    },
    [set]
  );

  const isSupersetOf = useCallback(
    (otherSet: Set<T>): boolean => {
      return Array.from(otherSet).every((value) => set.has(value));
    },
    [set]
  );

  return {
    set,
    add,
    has,
    delete: deleteValue,
    toggle,
    clear,
    size: set.size,
    values,
    toArray,
    reset,
    addMultiple,
    deleteMultiple,
    isSubsetOf,
    isSupersetOf,
  };
}
