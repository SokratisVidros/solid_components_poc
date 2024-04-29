import { useCallback } from 'react';
import { Portal } from './portal.react';
import { useMySDK } from './hooks';

// Thin wrapper around the SDK's Counter component that provides a React-friendly API
export function Counter(props: { children?: any; initialCounter?: number }) {
  const { mySdk } = useMySDK();

  const mount = useCallback(
    (node: HTMLDivElement) => mySdk.mountCounter(node, props),
    [props]
  );
  const unmount = useCallback(() => mySdk.unmountCounter(), []);

  return <Portal mount={mount} unmount={unmount} />;
}

export function CounterChild() {
  const { mySdk } = useMySDK();

  const mount = useCallback(
    (node: HTMLDivElement) => mySdk.mountCounterChild(node),
    []
  );
  const unmount = useCallback(() => mySdk.unmountCounterChild(), []);

  return <Portal mount={mount} unmount={unmount} />;
}
