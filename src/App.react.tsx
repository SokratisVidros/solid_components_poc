import { FC, createContext, useContext, useEffect, useState } from 'react';
import { Counter } from './sdk-react';

import styles from './App.module.css';

// TODO: Get this context from React SDK
const CustomMagicNumberContext = createContext<number>(0);

const CustomMagicNumber: FC = (props) => {
  const magicNumber = useContext(CustomMagicNumberContext);
  console.log('[React] CustomMagicNumber render', props);

  useEffect(() => {
    console.log('[React] CustomMagicNumber mount');

    return () => {
      console.log('[React] CustomMagicNumber unmount');
    };
  }, []);

  return (
    <div style={{ border: '1px solid orange' }}>
      React Component
      <br />
      Custom magic number: {magicNumber}
      <br />
      Props from Solid: {JSON.stringify(props)}
    </div>
  );
};

const AnotherMagicNumber: FC = (props) => {
  const magicNumber = useContext(CustomMagicNumberContext);
  console.log('[React] AnotherMagicNumber render', props);

  useEffect(() => {
    console.log('[React] AnotherMagicNumber mount');

    return () => {
      console.log('[React] AnotherMagicNumber unmount');
    };
  }, []);

  return (
    <div style={{ border: '1px solid cyan' }}>
      React Component
      <br />
      Another Custom magic number: {magicNumber}
      <br />
      Props from Solid: {JSON.stringify(props)}
    </div>
  );
};

export function MyReactApp() {
  const [count, setCount] = useState(0);

  return (
    <CustomMagicNumberContext.Provider value={84}>
      <div
        className={styles.App}
        onClick={(e) => {
          console.log('[React] MyReactApp click', e.target);
          setCount(count + 1);
        }}
      >
        <h1>⚛️ My React app</h1>
        <p>Clicked me {count} times.</p>
        <i className={styles.footnote}>
          The solid counter component will be rendered only when the host
          application counter module 3 equals to 0.
        </i>
        <br />
        {/* TODO: Remove this counter and address the error */}
        {count > 0 && (
          <Counter initialCounter={1}>
            <Counter.CustomComponent name="customMagicNumber">
              <CustomMagicNumber />
            </Counter.CustomComponent>
            <Counter.CustomComponent name="anotherMagicNumber">
              <AnotherMagicNumber />
            </Counter.CustomComponent>
            This text component will be ignored
          </Counter>
        )}
      </div>
    </CustomMagicNumberContext.Provider>
  );
}
