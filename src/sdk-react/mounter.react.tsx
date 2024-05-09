import { useLayoutEffect, useRef } from 'react';

type MountProps = {
  mount: (node: HTMLDivElement) => void;
  unmount?: (node: HTMLDivElement) => void;
};

export function Mounter({ mount, unmount }: MountProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (ref.current && mount) {
      mount(ref.current);
    }

    return () => {
      if (ref.current && unmount) {
        unmount(ref.current);
      }
    };
  }, [ref, mount, unmount]);

  return <div ref={ref} />;
}
