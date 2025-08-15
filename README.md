# kalki-ui-hooks

A **curated collection of custom React hooks** that help you build better, more maintainable user interfaces.
Each hook is **thoroughly tested**, **well-documented**, and follows **React best practices** — so you can focus on shipping features, not boilerplate.

---

## ✨ Features

* 📦 **Plug-and-play** hooks ready for production use
* 🧪 **Tested & documented** for reliability
* 🛠 **Follows React conventions** and hook naming standards
* 📚 **Categorized for easy discovery**
* 🌐 Includes both **utility** and **browser API** integrations

---

## 📦 Installation

```bash
npm install kalki-ui-hooks
# or
yarn add kalki-ui-hooks
```

---

## 📚 Available Hooks

### **State Management**

`useLocalStorage`, `useSessionStorage`, `usePrevious`, `useToggle`, `useCounter`, `useArray`, `useMap`, `useSet`

### **Performance**

`useDebounce`, `useThrottle`, `useWhyDidYouUpdate`, `useMemoOne`

### **React Built-in**

`useState`, `useEffect`, `useContext`, `useCallback`, `useReducer`, `useMemo`, `useRef`, `useImperativeHandle`, `useLayoutEffect`, `useDebugValue`, `useId`, `useTransition`, `useDeferredValue`, `useSyncExternalStore`, `useInsertionEffect`

### **DOM Events**

`useClickOutside`, `useEventListener`, `useKeyPress`, `useHover`, `useFocus`, `useLongPress`, `useDrag`, `useIntersectionObserver`, `useResizeObserver`, `useMutationObserver`

### **Responsive**

`useMediaQuery`, `useWindowSize`, `useBreakpoint`, `useOrientation`

### **Network**

`useFetch`, `useAsync`, `useSWR`, `useQuery`, `useWebSocket`, `useOnlineStatus`

### **Timers**

`useTimeout`, `useInterval`, `useCountdown`

### **Animation**

`useAnimation`, `useSpring`

### **Forms**

`useForm`, `useInput`, `useFormValidation`, `useClipboard`

### **Utility**

`useIsMounted`, `useUpdateEffect`, `useMount`, `useUnmount`, `useDeepCompareEffect`, `useIsFirstRender`, `useRenderCount`, `useLatest`

### **Browser APIs**

`useGeolocation`, `useBattery`, `usePermission`, `usePageVisibility`, `useIdle`, `useFullscreen`, `useNotification`, `useShare`

### **Storage**

`useIndexedDB`, `useCookie`, `useHistoryState`

### **Development**

`useLogger`, `useTrace`

---

## 🚀 Usage Example

```jsx
import React from "react";
import { useLocalStorage } from "kalki-ui-hooks";

export default function App() {
  const [name, setName] = useLocalStorage("username", "Guest");

  return (
    <div>
      <h1>Hello, {name}!</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
    </div>
  );
}
```

---

## 📄 License

MIT © [Ravi Teja Ladi](https://github.com/RaviTejaLadi/kalki-ui-hooks)

