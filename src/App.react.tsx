import { useState } from "react";

import styles from "./App.module.css";

export function MyReactApp() {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.App} onClick={() => setCount(count + 1)}>
      My React app {count}
    </div>
  );
}
