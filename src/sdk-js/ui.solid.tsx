/** @jsxImportSource solid-js */
import { render } from 'solid-js/web';
import {
  children,
  createSignal,
  createContext,
  useContext,
  createEffect,
} from 'solid-js';
import type { MySDK } from '.';
import type { GConstructor } from './types';

/**
 * Implementation of UI components using Solid.js or any other framework
 */

// TODO: Implement Appearance prop using CSS-in-JS
import styles from '../App.module.css';

const CounterContext = createContext<{
  call: () => void;
  hello: string | null;
}>({
  call: () => {},
  hello: null,
});

function Counter({
  children,
  initialCounter = 0,
}: {
  children: any;
  initialCounter?: number;
}) {
  const [count, setCount] = createSignal(initialCounter);

  createEffect(() => {
    console.log('Counter mounted');
  }, []);

  return (
    <CounterContext.Provider
      value={{
        call: () => {
          console.log('hello from call!');
        },
        hello: 'hello world',
      }}
    >
      <div class={styles.App} onClick={() => setCount(count() + 1)}>
        <p>🗿 Solid counter: {count()}</p>
        <i class={styles.footnote}>This is a component provided by MySDK</i>
        {children}
      </div>
    </CounterContext.Provider>
  );
}

function CounterChild() {
  const { call, hello } = useContext(CounterContext);

  return (
    <button
      onClick={() => {
        call();
        console.log('calling context', { call, hello });
      }}
    >
      Hello from CounterChild
    </button>
  );
}

/**
 * Apply mixin pattern to enhance the base MySDK class with UI capabilities
 */

export function WithUI<TBase extends GConstructor<MySDK>>(Base: TBase) {
  return class MySDKUI extends Base {
    // TODO: Use a Map to store all the components
    #disposeCounter: { (): void } | null = null;
    #disposeCounterChild: { (): void } | null = null;

    mountCounter(
      el: HTMLElement,
      {
        children,
        initialCounter = 0,
      }: { children?: any; initialCounter?: number }
    ) {
      // TODO: Check if the props are the same, if not, trigger a new render
      if (this.#disposeCounter !== null) {
        return;
      }

      const root = document.createElement('div');
      root.setAttribute('id', 'counter-component');
      el.appendChild(root);

      const dispose = render(
        () => <Counter initialCounter={initialCounter} children={children} />,
        root
      );

      this.#disposeCounter = dispose;
    }

    unmountCounter() {
      this.#disposeCounter?.();
      this.#disposeCounter = null;
    }

    mountCounterChild(el: HTMLElement) {
      // TODO: Check if the props are the same, if not, trigger a new render
      if (this.#disposeCounterChild !== null) {
        return;
      }

      const root = document.createElement('div');
      root.setAttribute('id', 'counter-component-child');
      el.appendChild(root);

      const dispose = render(() => <CounterChild />, root);

      this.#disposeCounterChild = dispose;
    }

    unmountCounterChild() {
      this.#disposeCounterChild?.();
      this.#disposeCounterChild = null;
    }
  };
}
