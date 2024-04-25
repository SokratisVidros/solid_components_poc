/** @jsxImportSource solid-js */
import { createSignal } from "solid-js";

import styles from "./App.module.css";

export function MySolidApp() {
  const [count, setCount] = createSignal(0);
  return (
    <div class={styles.App} onClick={() => setCount(count() + 1)}>
      My Solid App {count()}
    </div>
  );
}
