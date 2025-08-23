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
    fetchById: async (id) => ({ description: "Padaria", value: 50, date: "2025-08-22" })
  },
  receipt: {
    insert: (data) => console.log("Insert Standard Receipt", data),
    fetchById: async (id) => ({ description: "Salário", value: 2000, date: "2025-08-22" })
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
    fetchById: async (id) => ({ description: "Notebook", value: 3000, date: "2025-08-22", installments: 12 })
  },
  receipt: {
    insert: (data) => console.log("Insert Parcelado Receipt", data),
    fetchById: async (id) => ({ description: "Venda", value: 1500, date: "2025-08-22", installments: 6 })
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
    fetchById: async (id) => ({ description: "Academia", value: 120, date: "2025-08-22", frequency: "MONTHLY" })
  },
  receipt: {
    insert: (data) => console.log("Insert Recorrente Receipt", data),
    fetchById: async (id) => ({ description: "Assinatura", value: 50, date: "2025-08-22", frequency: "MONTHLY" })
  }
}
