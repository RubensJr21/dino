import { Kind, StandardScreenInsert } from "../types"

// Base Standard
export const standardStrategies: Record<
  Kind,
  {
    insert: (data: StandardScreenInsert) => void
    fetchById: (id: string) => Promise<StandardScreenInsert>
  }
> = {
  payment: {
    insert: (data) => console.log("Insert Standard Payment", data),
    fetchById: async (id) => ({
      description: "Padaria",
      amountValue: "50",
      scheduledAt: new Date("2025-08-22"),
      tagSelected: "Tag 1",
      bankSelected: "Bank 1",
      transferMethodSelected: {
        id: 1,
        label: "Bank 1 -TransferMethod 1"
      }
    })
  },
  receipt: {
    insert: (data) => console.log("Insert Standard Receipt", data),
    fetchById: async (id) => ({
      description: "Salário",
      amountValue: "2000",
      scheduledAt: new Date("2025-08-22"),
      tagSelected: "Tag 1",
      bankSelected: "Bank 1",
      transferMethodSelected: {
        id: 1,
        label: "Bank 1 -TransferMethod 1"
      }
    })
  }
}