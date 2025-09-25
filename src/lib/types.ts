export interface TransactionInstrument {
  id: number;
  nickname: string;
  transfer_method_code: string;
}

export interface Category {
  id: number;
  code: string
}

export interface TransactionScreenBaseInsert {
  description: string;
  amountValue: string;
  category: Category;
  transactionInstrument: TransactionInstrument;
}

export interface StandardScreenInsert extends TransactionScreenBaseInsert {
  scheduledAt: Date;
}

export interface InstallmentScreenInsert extends TransactionScreenBaseInsert {
  startDate: Date;
  installments: string
}

export interface RecurrenceType {
  id: number;
  code: string;
}

export interface RecurringScreenInsert extends TransactionScreenBaseInsert {
  startDate: Date;
  endDate: Date | null;
  recurrenceType: RecurrenceType
}

export type Kind = "payment" | "receipt"

export function getCashflowType(kind: Kind): Cashflow_Type {
  switch (kind) {
    case "payment":
      return -1;
    case "receipt":
      return 1;
  }
}
