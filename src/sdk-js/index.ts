import { WithCore } from "./core";
import { WithUI } from "./ui.solid";

export class MySDK {
  constructor() {
    console.log("☀️ MySDK has started!");
  }
}

export const MySDKConstructor = WithUI(WithCore(MySDK));

export type MySDKT = InstanceType<typeof MySDKConstructor>;

// TODO: Maybe export props via an /internal subpath
export type { CounterProps } from "./ui.solid";

declare global {
  interface Window {
    MySDK: MySDKT;
  }
}

const sdkInstance = new MySDKConstructor();

window.MySDK = sdkInstance;
