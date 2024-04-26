import { WithCore } from "./core";
import { WithUI } from "./ui.solid";

export class MySDK {
  constructor() {
    console.log("☀️ MySDK has started!");
  }
}

export const MySDKConstructor = WithUI(WithCore(MySDK));

export type MySDKT = InstanceType<typeof MySDKConstructor>;

declare global {
  interface Window {
    MySDK: MySDKT;
  }
}

const sdkInstance = new MySDKConstructor();

window.MySDK = sdkInstance;
