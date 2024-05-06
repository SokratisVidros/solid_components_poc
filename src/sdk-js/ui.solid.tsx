/** @jsxImportSource solid-js */
import { render } from "solid-js/web";
import {
  createSignal,
  createEffect,
  createContext,
  useContext,
  onMount,
  onCleanup,
} from "solid-js";
import type { MySDK } from ".";
import type { GConstructor } from "./types";

/**
 * Implementation of UI components using Solid.js or any other framework
 */

// TODO: Implement Appearance prop using CSS-in-JS
import styles from "../App.module.css";

type MountProps = {
  mount: (node: HTMLDivElement) => void;
  unmount?: (node: HTMLDivElement) => void;
};

function Mounter(props: MountProps) {
  let mountingDiv: HTMLDivElement;

  onMount(async () => {
    console.log("On Mounter mount");
    props.mount(mountingDiv);
  });

  onCleanup(async () => {
    console.log("On Mounter cleanup");
    props.unmount?.(mountingDiv);
  });

  // @ts-expect-error
  return <div ref={mountingDiv}></div>;
}

export type CounterProps = {
  customMagicNumber?: MountProps;
  initialCounter?: number;
};

const CounterContext = createContext<number>(0);

function Counter(props: CounterProps) {
  const [count, setCount] = createSignal(props.initialCounter || 0);

  createEffect(() => {
    console.log("Counter mounted");
  }, []);

  return (
    <CounterContext.Provider value={42}>
      <div class={styles.App} onClick={() => setCount(count() + 1)}>
        <p>🗿 Solid counter: {count()}</p>
        <p>
          {props.customMagicNumber ? (
            <Mounter
              mount={props.customMagicNumber.mount}
              unmount={props.customMagicNumber.unmount}
            />
          ) : (
            <DefaultMagicNumber />
          )}
        </p>
        <i class={styles.footnote}>This is a component provided by MySDK</i>
      </div>
    </CounterContext.Provider>
  );
}

function DefaultMagicNumber() {
  const magicNumber = useContext(CounterContext);
  return <div>Default magic number: {magicNumber}</div>;
}

/**
 * Apply mixin pattern to enhance the base MySDK class with UI capabilities
 */

export function WithUI<TBase extends GConstructor<MySDK>>(Base: TBase) {
  return class MySDKUI extends Base {
    // TODO: Use a Map to store all the components
    #disposeCounter: { (): void } | null = null;

    mountCounter(el: HTMLElement, props: CounterProps) {
      // TODO: Check if the props are the same, if not, trigger a new render
      if (this.#disposeCounter !== null) {
        return;
      }

      const root = document.createElement("div");
      root.setAttribute("id", "counter-component");
      el.appendChild(root);

      const dispose = render(() => <Counter {...props} />, root);

      this.#disposeCounter = dispose;
    }

    unmountCounter() {
      this.#disposeCounter?.();
      this.#disposeCounter = null;
    }
  };
}
