/** @jsxImportSource solid-js */
import { render } from "solid-js/web";
import { createSignal } from "solid-js";
import type { MySDK } from ".";
import type { GConstructor } from "./types";

/**
 * Implementation of UI components using Solid.js or any other framework
 */

// TODO: Implement Appearance prop using CSS-in-JS
import styles from "../App.module.css";

function Counter({ initialCounter = 0 }) {
  const [count, setCount] = createSignal(initialCounter);
  return (
    <div class={styles.App} onClick={() => setCount(count() + 1)}>
      <p>🗿 Solid counter: {count()}</p>
      <i class={styles.footnote}>This is a component provided by MySDK</i>
    </div>
  );
}

/**
 * Apply mixin pattern to enhance the base MySDK class with UI capabilities
 */

export function WithUI<TBase extends GConstructor<MySDK>>(Base: TBase) {
  return class MySDKUI extends Base {
    // TODO: Use a Map to store all the components
    #disposeCounter: { (): void } | null = null;

    mountCounter(
      el: HTMLElement,
      { initialCounter = 0 }: { initialCounter?: number }
    ) {
      // TODO: Check if the props are the same, if not, trigger a new render
      if (this.#disposeCounter !== null) {
        return;
      }

      const root = document.createElement("div");
      root.setAttribute("id", "counter-component");
      el.appendChild(root);

      const dispose = render(
        () => <Counter initialCounter={initialCounter} />,
        root
      );

      this.#disposeCounter = dispose;
    }

    unmountCounter() {
      this.#disposeCounter?.();
      this.#disposeCounter = null;
    }
  };
}
