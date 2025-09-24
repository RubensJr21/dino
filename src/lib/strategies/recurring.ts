import { Kind, RecurringScreenInsert } from "../types"

export const recurringStrategies: Record<
  Kind,
  {
    insert: (data: RecurringScreenInsert) => void
    fetchById: (id: string) => Promise<RecurringScreenInsert>
  }
> = {
  payment: {
    insert: (data) => console.log("Insert Recorrente Payment", data),
    fetchById: async (id) => ({
      description: "Academia",
      amountValue: "120",
      startDate: new Date("2025-08-22"),
      frequency: "MONTHLY",
      tagSelected: "Tag 1",
      bankSelected: "Bank 1",
      transferMethodSelected: {
        id: 1,
        label: "Bank 1 -TransferMethod 1"
      }
    })
  },
  receipt: {
    insert: (data) => console.log("Insert Recorrente Receipt", data),
    fetchById: async (id) => ({
      description: "Assinatura",
      amountValue: "50",
      startDate: new Date("2025-08-22"),
      frequency: "MONTHLY",
      tagSelected: "Tag 1",
      bankSelected: "Bank 1",
      transferMethodSelected: {
        id: 1,
        label: "Bank 1 -TransferMethod 1"
      }
    })
  }
}