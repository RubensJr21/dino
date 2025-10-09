export interface TransactionInstrument {
  id: number;
  nickname: string;
  bank_nickname: string | null;
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

// ======================
// UPDATE TYPES
// ======================

export interface TransactionScreenBaseUpdate {
  description?: string;
  category?: Category;
}

export interface StandardScreenUpdate extends TransactionScreenBaseUpdate {
  amountValue?: string;
  scheduledAt?: Date;
}

export interface RecurringScreenUpdate extends TransactionScreenBaseUpdate {
  currentAmount?: string;
}

export type InstallmentScreenUpdate = TransactionScreenBaseUpdate

export type Kind = "payment" | "receipt"

export function getCashflowType(kind: Kind): Cashflow_Type {
  switch (kind) {
    case "payment":
      return -1;
    case "receipt":
      return 1;
  }
}

// ======================
// ENTITIES
// ======================

export interface RecurringEntity extends RecurringScreenInsert {
  id: number;
}

export interface StandardEntity extends StandardScreenInsert {
  id: number;
  wasProcessed: boolean;
}

export interface InstallmentEntity extends InstallmentScreenInsert {
  id: number
}

export interface ItemValueEntity {
  id: number;
  was_processed: boolean;
  scheduled_at: Date;
  amount: number;
}

export interface TransferMethodEntity {
  id: number;
  code: string;
}

export type RecurrenceTypeEntity = RecurrenceType

export type TransactionInstrumentEntity = TransactionInstrument

export type CategoryEntity = Category

export type BankAccountEntity = {
  id: number;
  nickname: string;
}