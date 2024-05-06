import { ReactNode, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { Portal } from "./portal.react";
import { useMySDK } from "./hooks";
import type { CounterProps } from "../sdk-js";

// Thin wrapper around the SDK's Counter component that provides a React-friendly API
export function Counter(props: { children?: any; initialCounter?: number }) {
  const { mySdk } = useMySDK();
  const [p, setP] = useState<ReactNode>(null);

  const mount = useCallback((node: HTMLDivElement) => {
    // Adapt React props to Vanilla JS SDK props
    const adaptedProps: CounterProps = {
      initialCounter: props.initialCounter,
    };

    if (props.children) {
      adaptedProps.customMagicNumber = {
        mount: (node: HTMLDivElement) => {
          console.log("Creating portal...");
          setP(createPortal(props.children, node));
        },
        unmount: (node: HTMLDivElement) => {
          // TODO: Clean up the properly and ensure no memory leaks
          node.innerHTML = "";
          setP(null);
        },
      };
    }

    mySdk.mountCounter(node, adaptedProps);
  }, []);
  const unmount = useCallback(() => mySdk.unmountCounter(), []);

  return (
    <>
      {p}
      {/* Rename to mounter */}
      <Portal mount={mount} unmount={unmount} />
    </>
  );
}
