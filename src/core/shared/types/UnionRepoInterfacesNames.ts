// 1) Helper recursivo que consome um array de tipos:
export type UnionRepoInterfacesNames<T extends {}> =
  T extends [infer First, ...infer Rest]
    ? First | UnionRepoInterfacesNames<Rest>
    : never;  // quando não restar nada, retorna `{}`