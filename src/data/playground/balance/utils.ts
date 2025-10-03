import {
  baseTransactionType,
  itemValue
} from "@database/schema";
import { and, sql } from "drizzle-orm";
import { alias } from "drizzle-orm/sqlite-core";

export const itemValueStandard = alias(itemValue, "iv_standard");
export const itemValueInstallment = alias(itemValue, "iv_installment");
export const itemValueRecurring = alias(itemValue, "iv_recurring");

export function dateFilter(year: number, month: number) {
  const start = new Date(year, month - 1, 1).getTime() / 1000; // epoch seconds
  const end = new Date(year, month, 0, 23, 59, 59).getTime() / 1000;

  return and(
    sql`COALESCE(${itemValueStandard.scheduled_at}, ${itemValueInstallment.scheduled_at}, ${itemValueRecurring.scheduled_at}) >= ${start}`,
    sql`COALESCE(${itemValueStandard.scheduled_at}, ${itemValueInstallment.scheduled_at}, ${itemValueRecurring.scheduled_at}) <= ${end}`
  );
}

const amount = sql<number>`
  COALESCE(${itemValueStandard.amount}, ${itemValueInstallment.amount}, ${itemValueRecurring.amount})
`;

export const coalesceWasProcessed = sql<number>`
  COALESCE(${itemValueStandard.was_processed}, ${itemValueInstallment.was_processed}, ${itemValueRecurring.was_processed})
`;

export const realAmount = sql<number>`${amount} * ${baseTransactionType.cashflow_type}`;