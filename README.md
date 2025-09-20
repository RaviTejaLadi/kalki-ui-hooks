<div align="center">

# 🚀 Kalki UI Hooks

[![npm version](https://img.shields.io/npm/v/kalki-ui-hooks?style=for-the-badge&logo=npm&color=red)](https://www.npmjs.com/package/kalki-ui-hooks)
[![bundle size](https://img.shields.io/bundlephobia/minzip/kalki-ui-hooks?style=for-the-badge&logo=webpack&color=blue)](https://bundlephobia.com/package/kalki-ui-hooks)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-17%2B-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](https://opensource.org/licenses/MIT)

**A curated collection of custom React hooks** that help you build better, more maintainable user interfaces. Each hook is **thoroughly tested**, **well-documented**, and follows **React best practices** — so you can focus on shipping features, not boilerplate.

[📖 Documentation](https://github.com/kalki-ui/kalki-ui-hooks#readme) • [🐛 Report Bug](https://github.com/kalki-ui/kalki-ui-hooks/issues) • [✨ Request Feature](https://github.com/kalki-ui/kalki-ui-hooks/issues)

</div>

---

## ✨ Why Kalki UI Hooks?

<div align="center">

| 🎯 **Production Ready** | 🧪 **Well Tested** | 📚 **TypeScript** | 🚀 **Zero Config** |
|:---:|:---:|:---:|:---:|
| Battle-tested in real projects | Comprehensive test coverage | Full TypeScript support | Works out of the box |
| **⚡ Performance** | **🔧 Maintained** | **📦 Tree Shakeable** | **🎨 Modern API** |
| Optimized for performance | Actively maintained | Only import what you use | Clean, intuitive API |

</div>

---

## 🚀 Quick Start

### Installation

```bash
# npm
npm install kalki-ui-hooks

# yarn
yarn add kalki-ui-hooks

# pnpm
pnpm add kalki-ui-hooks
```

### Basic Usage

```jsx
import React from 'react';
import { useLocalStorage, useToggle, useCounter } from 'kalki-ui-hooks';

function App() {
  const [name, setName] = useLocalStorage('username', 'Guest');
  const [isVisible, toggle] = useToggle(true);
  const [count, { increment, decrement, reset }] = useCounter(0);

  return (
    <div>
      <h1>Hello, {name}!</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      
      <button onClick={toggle}>
        {isVisible ? 'Hide' : 'Show'} Counter
      </button>
      
      {isVisible && (
        <div>
          <p>Count: {count}</p>
          <button onClick={increment}>+</button>
          <button onClick={decrement}>-</button>
          <button onClick={reset}>Reset</button>
        </div>
      )}
    </div>
  );
}
```

---

## 📚 Available Hooks

### 🗃️ State Management

| Hook | Description | Example Use Case |
|:---|:---|:---|
| `useLocalStorage` | Persist state to localStorage | User preferences, form data |
| `useSessionStorage` | Persist state to sessionStorage | Temporary data, shopping cart |
| `usePrevious` | Track previous value | Compare current vs previous state |
| `useToggle` | Boolean state with toggle function | Modals, dropdowns, switches |
| `useCounter` | Counter with increment/decrement/reset | Pagination, quantity selectors |
| `useArray` | Array state with utility methods | Todo lists, dynamic forms |
| `useMap` | Map state with utility methods | Key-value data structures |
| `useSet` | Set state with utility methods | Unique collections, tags |

### 🛠️ Utility Hooks

| Hook | Description | Example Use Case |
|:---|:---|:---|
| `useIsMounted` | Check if component is mounted | Prevent state updates after unmount |
| `useUpdateEffect` | Effect that runs on updates only | Skip initial render effects |
| `useMount` | Effect that runs only on mount | Initialization logic |
| `useUnmount` | Effect that runs only on unmount | Cleanup logic |
| `useDeepCompareEffect` | Effect with deep comparison | Complex object dependencies |
| `useIsFirstRender` | Check if it's the first render | Conditional logic on first render |
| `useRenderCount` | Track component render count | Performance debugging |
| `useLatest` | Always get the latest value | Avoid stale closures |

---

## 🎯 Advanced Examples

### Complex State Management

```jsx
import { useArray, useMap, useLocalStorage } from 'kalki-ui-hooks';

function TodoApp() {
  const [todos, { add, remove, update, clear }] = useArray([]);
  const [categories, { set: setCategory, get: getCategory }] = useMap();
  const [user, setUser] = useLocalStorage('user', { name: '', email: '' });

  const addTodo = (text, category) => {
    const id = Date.now();
    add({ id, text, completed: false, category });
    setCategory(id, category);
  };

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      {/* Todo implementation */}
    </div>
  );
}
```

### Performance Optimization

```jsx
import { useDeepCompareEffect, useLatest, useIsMounted } from 'kalki-ui-hooks';

function DataFetcher({ config, onData }) {
  const isMounted = useIsMounted();
  const latestOnData = useLatest(onData);

  useDeepCompareEffect(() => {
    if (!isMounted()) return;

    fetchData(config).then(data => {
      if (isMounted()) {
        latestOnData.current(data);
      }
    });
  }, [config]);

  return <div>Loading...</div>;
}
```

---

## 🔧 TypeScript Support

Full TypeScript support with comprehensive type definitions:

```typescript
import { useLocalStorage, useCounter } from 'kalki-ui-hooks';

// Fully typed
const [user, setUser] = useLocalStorage<User>('user', { name: '', age: 0 });
const [count, { increment, decrement }] = useCounter(0);

// Type-safe operations
setUser({ name: 'John', age: 25 }); // ✅ Valid
setUser({ name: 'John' }); // ❌ Type error - missing age
```

---

## 📊 Bundle Size

| Hook Category | Size | Gzipped |
|:---|:---:|:---:|
| State Management | ~2.1kb | ~0.8kb |
| Utility Hooks | ~1.8kb | ~0.7kb |
| **Total** | **~3.9kb** | **~1.5kb** |

*Tree-shakeable - only import what you need!*

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ by [Kalki UI](https://github.com/kalki-ui)**

[⭐ Star us on GitHub](https://github.com/kalki-ui/kalki-ui-hooks) • [🐛 Report Issues](https://github.com/kalki-ui/kalki-ui-hooks/issues) • [💬 Join Discussions](https://github.com/kalki-ui/kalki-ui-hooks/discussions)

</div>

