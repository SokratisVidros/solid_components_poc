/** @jsxImportSource solid-js */
import { render } from 'solid-js/web';
import {
  createSignal,
  createEffect,
  createContext,
  useContext,
  onMount,
  onCleanup,
  on,
} from 'solid-js';
import type { MySDK } from '.';
import type { GConstructor } from './types';

/**
 * Implementation of UI components using Solid.js or any other framework
 */

// TODO: Implement Appearance prop using CSS-in-JS
import styles from '../App.module.css';

type MountProps = {
  mount: (node: HTMLDivElement, props: any) => void;
  onPropsChange: (props: any) => void;
  unmount?: (node: HTMLDivElement) => void;
  props?: any;
};

export type CounterProps = {
  customMagicNumber?: MountProps;
  anotherMagicNumber?: MountProps;
  initialCounter?: number;
};

const CounterContext = createContext<number>(0);

function Counter({
  customMagicNumber,
  anotherMagicNumber,
  initialCounter,
}: CounterProps) {
  let customMagicNumberDiv: HTMLDivElement;
  let anotherMagicNumberDiv: HTMLDivElement;
  const [count, setCount] = createSignal(initialCounter || 0);

  onMount(() => {
    console.log('[Solid] Counter mount');
    // these calls will be potentially in different components
    customMagicNumber?.mount(customMagicNumberDiv, { count: count() });
    anotherMagicNumber?.mount(anotherMagicNumberDiv, { count: count() });
  });

  // This effect will be triggered when the count changes skipping the first render
  createEffect(
    on(
      count,
      (count) => {
        console.log('[Solid] Counter props change', { count });
        customMagicNumber?.onPropsChange({ count });
        anotherMagicNumber?.onPropsChange({ count });
      },
      { defer: true }
    )
  );

  onCleanup(() => {
    console.log('[Solid] Counter cleanup');
    customMagicNumber?.unmount?.(customMagicNumberDiv);
    anotherMagicNumber?.unmount?.(anotherMagicNumberDiv);
  });

  return (
    <CounterContext.Provider value={42}>
      <div
        class={styles.App}
        onClick={(e) => {
          console.log('[Solid] Counter click', e.target);

          setCount(count() + 1);
        }}
      >
        <p>🗿 Solid counter: {count()}</p>
        <p>
          {customMagicNumber ? (
            // @ts-ignore
            <div ref={customMagicNumberDiv} />
          ) : (
            <DefaultMagicNumber />
          )}
        </p>
        <p>
          {anotherMagicNumber ? (
            // @ts-ignore
            <div ref={anotherMagicNumberDiv} />
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

      const root = document.createElement('div');
      root.setAttribute('id', 'counter-component');
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
