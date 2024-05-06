import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Counter } from "./sdk-react";
import { createPortal } from "react-dom";

import styles from "./App.module.css";

// TODO: Get this context from React SDK
const CustomMagicNumberContext = createContext<number>(0);

const CustomMagicNumber = () => {
  const magicNumber = useContext(CustomMagicNumberContext);
  return (
    <div style={{ border: "1px solid orange" }}>
      Custom magic number: {magicNumber}
    </div>
  );
};

export function MyReactApp() {
  const [count, setCount] = useState(0);

  return (
    <CustomMagicNumberContext.Provider value={84}>
      <div className={styles.App} onClick={() => setCount(count + 1)}>
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
            <CustomMagicNumber />
          </Counter>
        )}
      </div>
    </CustomMagicNumberContext.Provider>
  );
}
