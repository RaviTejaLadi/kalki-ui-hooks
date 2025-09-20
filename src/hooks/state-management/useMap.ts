import { useState, useCallback } from "react";

/**
 * Return type for the useMap hook
 */
export interface UseMapReturn<K, V> {
  /** Current Map instance */
  map: Map<K, V>;
  /** Set a key-value pair in the map */
  set: (key: K, value: V) => void;
  /** Get a value by key from the map */
  get: (key: K) => V | undefined;
  /** Check if a key exists in the map */
  has: (key: K) => boolean;
  /** Delete a key-value pair from the map */
  delete: (key: K) => boolean;
  /** Clear all entries from the map */
  clear: () => void;
  /** Get the size of the map */
  size: number;
  /** Get all keys from the map */
  keys: () => IterableIterator<K>;
  /** Get all values from the map */
  values: () => IterableIterator<V>;
  /** Get all entries from the map */
  entries: () => IterableIterator<[K, V]>;
  /** Reset map to initial state */
  reset: () => void;
  /** Update multiple entries at once */
  setMultiple: (entries: [K, V][] | Map<K, V>) => void;
}

/**
 * A custom React hook for managing Map state with all Map operations.
 *
 * @param initialEntries - Initial entries for the map (defaults to empty)
 * @returns An object containing the current map and methods to manipulate it
 *
 * @example
 * ```tsx
 * function UserProfile() {
 *   const { map: userSettings, set, get, has, delete: deleteSetting, clear } =
 *     useMap<string, string>([
 *       ['theme', 'dark'],
 *       ['language', 'en'],
 *       ['notifications', 'enabled']
 *     ]);
 *
 *   const updateSetting = (key: string, value: string) => set(key, value);
 *   const getSetting = (key: string) => get(key) || 'default';
 *
 *   return (
 *     <div>
 *       <p>Theme: {getSetting('theme')}</p>
 *       <p>Language: {getSetting('language')}</p>
 *       <button onClick={() => updateSetting('theme', 'light')}>
 *         Switch to Light Theme
 *       </button>
 *       <button onClick={() => deleteSetting('notifications')}>
 *         Remove Notifications Setting
 *       </button>
 *       <button onClick={clear}>Clear All Settings</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useMap<K, V>(
  initialEntries: [K, V][] | Map<K, V> = []
): UseMapReturn<K, V> {
  const [map, setMap] = useState<Map<K, V>>(() => {
    return new Map(initialEntries);
  });

  const set = useCallback((key: K, value: V) => {
    setMap((prev) => {
      const newMap = new Map(prev);
      newMap.set(key, value);
      return newMap;
    });
  }, []);

  const get = useCallback(
    (key: K): V | undefined => {
      return map.get(key);
    },
    [map]
  );

  const has = useCallback(
    (key: K): boolean => {
      return map.has(key);
    },
    [map]
  );

  const deleteKey = useCallback((key: K): boolean => {
    let deleted = false;
    setMap((prev) => {
      const newMap = new Map(prev);
      deleted = newMap.delete(key);
      return newMap;
    });
    return deleted;
  }, []);

  const clear = useCallback(() => {
    setMap(new Map());
  }, []);

  const keys = useCallback(() => {
    return map.keys();
  }, [map]);

  const values = useCallback(() => {
    return map.values();
  }, [map]);

  const entries = useCallback(() => {
    return map.entries();
  }, [map]);

  const reset = useCallback(() => {
    setMap(new Map(initialEntries));
  }, [initialEntries]);

  const setMultiple = useCallback((newEntries: [K, V][] | Map<K, V>) => {
    setMap((prev) => {
      const newMap = new Map(prev);
      if (newEntries instanceof Map) {
        newEntries.forEach((value, key) => {
          newMap.set(key, value);
        });
      } else {
        newEntries.forEach(([key, value]) => {
          newMap.set(key, value);
        });
      }
      return newMap;
    });
  }, []);

  return {
    map,
    set,
    get,
    has,
    delete: deleteKey,
    clear,
    size: map.size,
    keys,
    values,
    entries,
    reset,
    setMultiple,
  };
}
