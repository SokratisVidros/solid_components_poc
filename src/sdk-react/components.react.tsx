import {
  isValidElement,
  Children,
  FC,
  ReactNode,
  useCallback,
  useState,
  cloneElement,
} from 'react';
import { createPortal } from 'react-dom';
import { Mounter } from './mounter.react';
import { useMySDK } from './hooks';
import type { CounterProps } from '../sdk-js';

type CounterComponentPropNames = keyof Pick<
  CounterProps,
  'customMagicNumber' | 'anotherMagicNumber'
>;
type FunctionalElement = React.ReactElement<
  { name: CounterComponentPropNames },
  React.JSXElementConstructor<any>
> &
  Function;

interface PortalsMeta {
  reactElement: FunctionalElement;
  node: HTMLDivElement;
  name: string;
  props: any;
}

const CustomComponent: FC<{
  children?: ReactNode;
  name: CounterComponentPropNames;
}> = ({ children, ...rest }) => {
  return (
    <div style={{ border: '1px solid orange' }}>
      {Children.map(children, (el) => {
        if (isValidElement(el)) {
          return cloneElement(el, { ...rest });
        }

        return el;
      })}
    </div>
  );
};

// Thin wrapper around the SDK's Counter component that provides a React-friendly API
export function Counter(props: {
  children?: ReactNode | ReactNode[];
  initialCounter?: number;
}) {
  const { mySdk } = useMySDK();
  const [portalsMeta, setPortalsMeta] = useState<PortalsMeta[]>([]);

  const mount = useCallback((node: HTMLDivElement) => {
    // Adapt React props to Vanilla JS SDK props
    const adaptedProps: CounterProps = {
      initialCounter: props.initialCounter,
    };

    const uniqueElements = [
      ...Children.toArray(props.children)
        .filter(
          // only allow our custom components
          (child) =>
            isValidElement(child) &&
            typeof child.type === 'function' &&
            child.type.name === 'CustomComponent'
        )
        // remove duplicates
        .reduce<Map<string, FunctionalElement>>((acc, el) => {
          const child = el as FunctionalElement;
          const componentName = child.props.name;
          if (acc.has(componentName)) {
            return acc;
          }
          acc.set(componentName, child);
          return acc;
        }, new Map())
        .values(),
    ];

    uniqueElements.map((child) => {
      const { name } = child.props;

      adaptedProps[name] = {
        mount: (el: HTMLDivElement, props: any) => {
          setPortalsMeta((old) => [
            ...old,
            { reactElement: child, node: el, name, props: { ...props } },
          ]);
        },
        onPropsChange: (newProps) => {
          // update the props for the custom component
          setPortalsMeta((old) => {
            const index = old.findIndex((el) => el.name === name);
            if (index === -1) {
              return old;
            }

            old[index].props = { ...newProps };
            return [...old];
          });
        },
        unmount: (el: HTMLDivElement) => {
          // TODO: Clean up the properly and ensure no memory leaks
          el.innerHTML = '';
          el.remove();
          setPortalsMeta((old) => old.filter((el) => el.name !== name));
        },
      };
    });

    mySdk.mountCounter(node, adaptedProps);
  }, []);

  const unmount = useCallback(() => mySdk.unmountCounter(), []);

  return (
    <>
      <Mounter mount={mount} unmount={unmount} />
      {portalsMeta.map(({ reactElement, node, props: elProps }) =>
        createPortal(cloneElement(reactElement, elProps), node)
      )}
    </>
  );
}

Counter.CustomComponent = CustomComponent;
