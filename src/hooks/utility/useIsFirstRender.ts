import { useRef } from "react";

/**
 * Hook that returns true on the first render, false on subsequent renders.
 * Useful for conditional logic that should only run on the initial render.
 *
 * @returns boolean - true if this is the first render, false otherwise
 *
 * @example
 * ```tsx
 * function MyComponent({ shouldAutoFocus }: { shouldAutoFocus: boolean }) {
 *   const isFirstRender = useIsFirstRender();
 *   const inputRef = useRef<HTMLInputElement>(null);
 *
 *   useEffect(() => {
 *     if (isFirstRender && shouldAutoFocus) {
 *       inputRef.current?.focus();
 *     }
 *   }, [isFirstRender, shouldAutoFocus]);
 *
 *   return (
 *     <div>
 *       <input ref={inputRef} placeholder="Enter text..." />
 *       <p>First render: {isFirstRender ? 'Yes' : 'No'}</p>
 *     </div>
 *   );
 * }
 * ```
 */
export function useIsFirstRender(): boolean {
  const isFirstRender = useRef(true);

  if (isFirstRender.current) {
    isFirstRender.current = false;
    return true;
  }

  return false;
}
