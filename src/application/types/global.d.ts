// https://stackoverflow.com/a/79135663
type StrictOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type StrictExclude<T, K extends keyof T> = Exclude<T, K>
