import { InstallmentScreenInsert, Kind, RecurringScreenInsert, StandardScreenInsert } from "./types"

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
      transferMethodSelected: "Bank 1 -TransferMethod 1"
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
      transferMethodSelected: "Bank 1 -TransferMethod 1"
    })
  }
}

// Parcelados
export const installmentStrategies: Record<
  Kind,
  {
    insert: (data: InstallmentScreenInsert) => void
    fetchById: (id: string) => Promise<InstallmentScreenInsert>
  }
> = {
  payment: {
    insert: (data) => console.log("Insert Parcelado Payment", data),
    fetchById: async (id) => ({
      description: "Notebook",
      amountValue: "3000",
      startDate: new Date("2025-08-22"),
      installments: "12",
      tagSelected: "Tag 1",
      bankSelected: "Bank 1",
      transferMethodSelected: "Bank 1 -TransferMethod 1"
    })
  },
  receipt: {
    insert: (data) => console.log("Insert Parcelado Receipt", data),
    fetchById: async (id) => ({
      description: "Venda",
      amountValue: "1500",
      startDate: new Date("2025-08-22"),
      installments: "6",
      tagSelected: "Tag 1",
      bankSelected: "Bank 1",
      transferMethodSelected: "Bank 1 -TransferMethod 1"
    })
  }
}

// Recorrentes
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
      date: new Date("2025-08-22"),
      frequency: "MONTHLY",
      tagSelected: "Tag 1",
      bankSelected: "Bank 1",
      transferMethodSelected: "Bank 1 -TransferMethod 1"
    })
  },
  receipt: {
    insert: (data) => console.log("Insert Recorrente Receipt", data),
    fetchById: async (id) => ({
      description: "Assinatura",
      amountValue: "50",
      date: new Date("2025-08-22"),
      frequency: "MONTHLY",
      tagSelected: "Tag 1",
      bankSelected: "Bank 1",
      transferMethodSelected: "Bank 1 -TransferMethod 1"
    })
  }
}
