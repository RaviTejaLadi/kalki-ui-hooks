import { useRef } from "react";

/**
 * Hook that tracks how many times a component has rendered.
 * Useful for debugging performance issues and understanding render behavior.
 *
 * @returns number - The current render count
 *
 * @example
 * ```tsx
 * function MyComponent({ data }: { data: any[] }) {
 *   const renderCount = useRenderCount();
 *
 *   console.log(`Component rendered ${renderCount} times`);
 *
 *   return (
 *     <div>
 *       <p>Render count: {renderCount}</p>
 *       <p>Data length: {data.length}</p>
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Use in development for performance monitoring
 * function ExpensiveComponent() {
 *   const renderCount = useRenderCount();
 *
 *   useEffect(() => {
 *     if (renderCount > 5) {
 *       console.warn('Component is re-rendering frequently:', renderCount);
 *     }
 *   }, [renderCount]);
 *
 *   return <div>...</div>;
 * }
 * ```
 */
export function useRenderCount(): number {
  const renderCount = useRef(0);

  renderCount.current += 1;

  return renderCount.current;
}
