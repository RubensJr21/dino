import {
  baseTransactionType,
  itemValue
} from "@database/schema";
import { sql } from "drizzle-orm";
import { alias } from "drizzle-orm/sqlite-core";

export const itemValueStandard = alias(itemValue, "iv_standard");
export const itemValueInstallment = alias(itemValue, "iv_installment");
export const itemValueRecurring = alias(itemValue, "iv_recurring");

export function dateFilter(year: number, month: number) {
  const start = new Date(year, month - 1, 1).getTime() / 1000; // epoch seconds
  const end = new Date(year, month, 0, 23, 59, 59).getTime() / 1000;

  return sql<boolean>`
    COALESCE(${itemValueStandard.scheduled_at}, ${itemValueInstallment.scheduled_at}, ${itemValueRecurring.scheduled_at}) >= ${start}
    AND
    COALESCE(${itemValueStandard.scheduled_at}, ${itemValueInstallment.scheduled_at}, ${itemValueRecurring.scheduled_at}) <= ${end}
  `;
}

export function dateUntilFilter(year: number, month: number) {
  const end = new Date(year, month, 0, 23, 59, 59).getTime() / 1000;

  return sql<boolean>`COALESCE(${itemValueStandard.scheduled_at}, ${itemValueInstallment.scheduled_at}, ${itemValueRecurring.scheduled_at}) <= ${end}`;
}

export function dateRangeFilter(year_start: number, month_start: number, year_end: number, month_end: number) {
  const start = new Date(year_start, month_start - 1, 1).getTime() / 1000; // epoch seconds
  const end = new Date(year_end, month_end, 0, 23, 59, 59).getTime() / 1000;

  return sql<boolean>`
    COALESCE(${itemValueStandard.scheduled_at}, ${itemValueInstallment.scheduled_at}, ${itemValueRecurring.scheduled_at}) >= ${start}
    AND
    COALESCE(${itemValueStandard.scheduled_at}, ${itemValueInstallment.scheduled_at}, ${itemValueRecurring.scheduled_at}) <= ${end}
  `;
}

export const coalesceAmount = sql<number>`
  COALESCE(${itemValueStandard.amount}, ${itemValueInstallment.amount}, ${itemValueRecurring.amount})
`;

export const coalesceWasProcessed = sql<number>`
  COALESCE(${itemValueStandard.was_processed}, ${itemValueInstallment.was_processed}, ${itemValueRecurring.was_processed})
`;

export const wasNotProcessed = sql<boolean>`${coalesceWasProcessed} = 0`
export const wasProcessed = sql<boolean>`${coalesceWasProcessed} = 1`

export const realAmount = sql<number>`${coalesceAmount} * ${baseTransactionType.cashflow_type}`;

export const isPayment = sql<boolean>`${baseTransactionType.cashflow_type} = -1`
export const isReceipt = sql<boolean>`${baseTransactionType.cashflow_type} = 1`

type Balance = {
  executed_receipts: number;
  executed_payments: number;
  planned_receipts: number;
  planned_payments: number;
}

export function calculatePartialBalance(...balances: Balance[]) {
  return balances.reduce((prev, current_balance) => {
    return prev + (
      current_balance.executed_receipts - current_balance.executed_payments
    )
  }, 0)
}

export function calculateFinalBalance(...balances: Balance[]) {
  return balances.reduce((prev, current_balance) => {
    return prev +
      (
        current_balance.planned_receipts - current_balance.planned_payments
      )
      +
      (
        current_balance.executed_receipts - current_balance.executed_payments
      )
  }, 0)
}