// Refer to https://www.typescriptlang.org/docs/handbook/mixins.html#constrained-mixins
export type GConstructor<T = {}> = new (...args: any[]) => T;
