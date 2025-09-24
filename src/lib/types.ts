export interface TransactionScreenBaseInsert {
  description: string;
  amountValue: string;
  tagSelected: string;
  bankSelected: string;
  transferMethodSelected: {
    id: number;
    label: string;
  };
}

export interface StandardScreenInsert extends TransactionScreenBaseInsert {
  scheduledAt: Date;
}

export interface InstallmentScreenInsert extends TransactionScreenBaseInsert {
  startDate: Date;
  installments: string
}

export interface RecurringScreenInsert extends TransactionScreenBaseInsert {
  startDate: Date;
  frequency: string
}

export type Kind = "payment" | "receipt"
