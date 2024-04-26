import type { MySDKT } from "../sdk-js";

// Thin wrapper around the SDK's instance that provides a React-friendly headless API (aka hooks)
export function useMySDK(): { mySdk: MySDKT; isLoaded: boolean } {
  // TODO: Should work regardless of Novu loading state
  return {
    mySdk: window.MySDK,
    isLoaded: true,
  };
}
