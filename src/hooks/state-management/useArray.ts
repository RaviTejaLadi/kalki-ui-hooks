import { useState, useCallback } from "react";

/**
 * Return type for the useArray hook
 */
export interface UseArrayReturn<T> {
  /** Current array value */
  array: T[];
  /** Set the entire array to a new value */
  set: (newArray: T[]) => void;
  /** Add an item to the end of the array */
  push: (item: T) => void;
  /** Remove and return the last item from the array */
  pop: () => T | undefined;
  /** Add an item to the beginning of the array */
  unshift: (item: T) => void;
  /** Remove and return the first item from the array */
  shift: () => T | undefined;
  /** Remove items at a specific index */
  remove: (index: number) => void;
  /** Insert an item at a specific index */
  insert: (index: number, item: T) => void;
  /** Update an item at a specific index */
  update: (index: number, item: T) => void;
  /** Clear the array (set to empty) */
  clear: () => void;
  /** Filter the array based on a predicate function */
  filter: (predicate: (item: T, index: number) => boolean) => void;
  /** Replace all occurrences of a value with a new value */
  replace: (oldItem: T, newItem: T) => void;
  /** Reset array to initial value */
  reset: () => void;
}

/**
 * A custom React hook for managing array state with common array operations.
 *
 * @param initialArray - The initial array value (defaults to empty array)
 * @returns An object containing the current array and methods to manipulate it
 *
 * @example
 * ```tsx
 * function TodoList() {
 *   const { array: todos, push, remove, update, clear } = useArray<string>([
 *     'Learn React',
 *     'Build awesome apps'
 *   ]);
 *
 *   const addTodo = () => push(`New todo ${Date.now()}`);
 *   const removeTodo = (index: number) => remove(index);
 *   const updateTodo = (index: number, newText: string) => update(index, newText);
 *
 *   return (
 *     <div>
 *       <button onClick={addTodo}>Add Todo</button>
 *       <button onClick={clear}>Clear All</button>
 *       {todos.map((todo, index) => (
 *         <div key={index}>
 *           <span>{todo}</span>
 *           <button onClick={() => removeTodo(index)}>Remove</button>
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export function useArray<T>(initialArray: T[] = []): UseArrayReturn<T> {
  const [array, setArray] = useState<T[]>([...initialArray]);

  const set = useCallback((newArray: T[]) => {
    setArray([...newArray]);
  }, []);

  const push = useCallback((item: T) => {
    setArray((prev) => [...prev, item]);
  }, []);

  const pop = useCallback((): T | undefined => {
    let poppedItem: T | undefined;
    setArray((prev) => {
      const newArray = [...prev];
      poppedItem = newArray.pop();
      return newArray;
    });
    return poppedItem;
  }, []);

  const unshift = useCallback((item: T) => {
    setArray((prev) => [item, ...prev]);
  }, []);

  const shift = useCallback((): T | undefined => {
    let shiftedItem: T | undefined;
    setArray((prev) => {
      const newArray = [...prev];
      shiftedItem = newArray.shift();
      return newArray;
    });
    return shiftedItem;
  }, []);

  const remove = useCallback((index: number) => {
    setArray((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const insert = useCallback((index: number, item: T) => {
    setArray((prev) => {
      const newArray = [...prev];
      newArray.splice(index, 0, item);
      return newArray;
    });
  }, []);

  const update = useCallback((index: number, item: T) => {
    setArray((prev) =>
      prev.map((currentItem, i) => (i === index ? item : currentItem))
    );
  }, []);

  const clear = useCallback(() => {
    setArray([]);
  }, []);

  const filter = useCallback(
    (predicate: (item: T, index: number) => boolean) => {
      setArray((prev) => prev.filter(predicate));
    },
    []
  );

  const replace = useCallback((oldItem: T, newItem: T) => {
    setArray((prev) => prev.map((item) => (item === oldItem ? newItem : item)));
  }, []);

  const reset = useCallback(() => {
    setArray([...initialArray]);
  }, [initialArray]);

  return {
    array,
    set,
    push,
    pop,
    unshift,
    shift,
    remove,
    insert,
    update,
    clear,
    filter,
    replace,
    reset,
  };
}
