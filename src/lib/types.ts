export interface TransactionScreenBaseInsert {
  description: string
  value: number
  date: string
}

export interface StandardScreenInsert extends TransactionScreenBaseInsert {}

export interface InstallmentScreenInsert extends TransactionScreenBaseInsert {
  installments: number
}

export interface RecurringScreenInsert extends TransactionScreenBaseInsert {
  frequency: "WEEKLY" | "MONTHLY" | "YEARLY"
}

export type Kind = "payment" | "receipt"
