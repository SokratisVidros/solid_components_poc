import { useState } from 'react';
import { Counter, CounterChild } from './sdk-react';

import styles from './App.module.css';

const Custom = () => {
  console.log('Custom component rendered');
  return <span>Hello from the Custom component</span>;
};

export function MyReactApp() {
  const [count, setCount] = useState(0);
  return (
    <div className={styles.App} onClick={() => setCount(count + 1)}>
      <h1>⚛️ My React app</h1>
      <p>Clicked me {count} times.</p>
      <i className={styles.footnote}>
        The solid counter component will be rendered only when the host
        application counter module 3 equals to 0.
      </i>
      <br />
      {count % 3 !== 0 && (
        <div style={{ border: '1px solid cyan' }}>
          Example: custom component as the prop
          <Counter initialCounter={1}>
            <Custom />
          </Counter>
        </div>
      )}
      {count % 3 !== 0 && (
        <div style={{ border: '1px solid magenta' }}>
          Example: Solid component wrapped in React component as the prop
          <Counter initialCounter={1}>
            <CounterChild />
          </Counter>
        </div>
      )}
    </div>
  );
}
