// https://stackoverflow.com/a/79135663
type StrictOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
