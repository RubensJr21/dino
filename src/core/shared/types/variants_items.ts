// 0 = Entrada, 1 = Saída; CHECK(type IN (0,1))
// export enum Variants_Of_ItemValue {
//   Receipt,
//   Payment
// }

export const VARIANTS_OF_ITEM_VALUE = {
  Receipt: 1,
  Payment: 0
} as const

export type TypeOfVariants = (typeof VARIANTS_OF_ITEM_VALUE)[keyof typeof VARIANTS_OF_ITEM_VALUE]