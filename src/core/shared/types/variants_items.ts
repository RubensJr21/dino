// 0 = Entrada, 1 = Saída; CHECK(type IN (0,1))
export enum Variants_Of_ItemValue {
  Receipt,
  Payment
}

export type TypeOfVariants = keyof typeof Variants_Of_ItemValue