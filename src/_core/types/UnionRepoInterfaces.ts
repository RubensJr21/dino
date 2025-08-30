// 1) Helper recursivo que consome um array de tipos:
export type UnionRepoInterfaces<T extends {}> =
  T extends [infer First, ...infer Rest]
    ? First & UnionRepoInterfaces<Rest>
    : {};  // quando não restar nada, retorna `{}`