export enum Variants_Of_ItemValue {
  Receipt = "Entrada",
  Payment = "Saída"
}

export type TypeOfVariants = keyof typeof Variants_Of_ItemValue