import type { MySDK } from ".";
import type { GConstructor } from "./types";

/**
 * Apply mixin pattern to enhance the base Novu class with headless capabilities
 */

// This can be split futher into more fine grained components
export function WithCore<TBase extends GConstructor<MySDK>>(Base: TBase) {
  return class NovuCore extends Base {
    sayHi() {
      console.log("👋 Hi there!");
    }
    /**
     * Entities/resource definitions
     * Frontend API SDK
     * Websocket management
     * Event Bus
     * etc...
     */
  };
}
