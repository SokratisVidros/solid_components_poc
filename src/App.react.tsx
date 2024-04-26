import { useState } from "react";
import { Counter } from "./sdk-react";

import styles from "./App.module.css";

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
      {count % 3 !== 0 && <Counter initialCounter={count} />}
    </div>
  );
}
