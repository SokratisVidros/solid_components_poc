import { useCallback } from "react";
import { Portal } from "./portal.react";
import { useMySDK } from "./hooks";

// Thin wrapper around the SDK's Counter component that provides a React-friendly API
export function Counter(props: { initialCounter?: number }) {
  const { mySdk } = useMySDK();

  const mount = useCallback(
    (node: HTMLDivElement) => mySdk.mountCounter(node, props),
    []
  );
  const unmount = useCallback(() => mySdk.unmountCounter(), []);

  return <Portal mount={mount} unmount={unmount} />;
}
