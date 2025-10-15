// https://stackoverflow.com/a/79135663
type StrictOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type StrictExclude<T, K extends keyof T> = Exclude<T, K>

type Expand<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;
type PartialOnly<T, K extends keyof T> = Expand<Partial<Pick<T, K>> & Omit<T, K>>;

// https://basarat.gitbook.io/typescript/type-system/mixins
// https://www.typescriptlang.org/docs/handbook/mixins.html#handbook-content
type Constructor<T> = new (...args: unknown[]) => T;