import { useEffect, useRef } from "react";

type MountProps = {
  mount: (node: HTMLDivElement) => void;
  unmount?: (node: HTMLDivElement) => void;
};

export function Portal({ mount, unmount }: MountProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("On portal mount");
    if (ref.current && mount) {
      mount(ref.current);
    }

    return () => {
      console.log("On portal unmount");
      if (ref.current && unmount) {
        unmount(ref.current);
      }
    };
  }, [ref, mount, unmount]);

  return <div ref={ref}></div>;
}
