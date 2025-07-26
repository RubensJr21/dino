export const TransferMethodsAvailable = {
  PIX: "pix",
  DEBIT: "débito",
  BANK_TRANSFER: "transferência bancária"
} as const

export type TypeOfTransferMethods = (keyof typeof TransferMethodsAvailable)