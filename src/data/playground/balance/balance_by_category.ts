import { type DatabaseType } from "@database/db-instance";
import {
  baseTransactionType,
  category,
  installment,
  installmentItemValue,
  recurring,
  recurringItemValue,
  standard
} from "@database/schema";
import { eq, sql } from "drizzle-orm";
import { coalesceWasProcessed, dateFilter, itemValueInstallment, itemValueRecurring, itemValueStandard, realAmount } from "./utils";

type ReturnType = Array<{
  category: typeof category.$inferSelect.code;
  paid_processed: number;
  paid_pending: number;
  received_processed: number;
  received_pending: number;
}>

export { type ReturnType as BalanceByCategoryReturn };

export async function balance_by_category(
  db: DatabaseType,
  month: number,
  year: number,
): Promise<ReturnType> {
  return db
    .select({
      category: category.code,

      // pagos processados
      paid_processed: sql<number>`
        COALESCE(SUM(
          CASE 
            WHEN ${coalesceWasProcessed} = 1
             AND ${dateFilter(year, month)}
             AND ${baseTransactionType.cashflow_type} = -1
            THEN ${realAmount} ELSE 0 END
        ), 0)`,

      // pagos pendentes
      paid_pending: sql<number>`
        COALESCE(SUM(
          CASE 
            WHEN ${coalesceWasProcessed} = 0
             AND ${dateFilter(year, month)}
             AND ${baseTransactionType.cashflow_type} = -1
            THEN ${realAmount} ELSE 0 END
        ), 0)`,

      // recebidos processados
      received_processed: sql<number>`
        COALESCE(SUM(
          CASE 
            WHEN ${coalesceWasProcessed} = 1
             AND ${dateFilter(year, month)}
             AND ${baseTransactionType.cashflow_type} = 1
            THEN ${realAmount} ELSE 0 END
        ), 0)`,

      // recebidos pendentes
      received_pending: sql<number>`
        COALESCE(SUM(
          CASE 
            WHEN ${coalesceWasProcessed} = 0
             AND ${dateFilter(year, month)}
             AND ${baseTransactionType.cashflow_type} = 1
            THEN ${realAmount} ELSE 0 END
        ), 0)`,
    })
    .from(category)
    .innerJoin(baseTransactionType, eq(baseTransactionType.fk_id_category, category.id))

    // 👇 conecta cada subtipo
    .leftJoin(standard, eq(standard.id, baseTransactionType.id))
    .leftJoin(itemValueStandard, eq(itemValueStandard.id, standard.fk_id_item_value))

    .leftJoin(installment, eq(installment.id, baseTransactionType.id))
    .leftJoin(installmentItemValue, eq(installmentItemValue.fk_id_installment, installment.id))
    .leftJoin(itemValueInstallment, eq(itemValueInstallment.id, installmentItemValue.fk_id_item_value))

    .leftJoin(recurring, eq(recurring.id, baseTransactionType.id))
    .leftJoin(recurringItemValue, eq(recurringItemValue.fk_id_recurring, recurring.id))
    .leftJoin(itemValueRecurring, eq(itemValueRecurring.id, recurringItemValue.fk_id_item_value))

    .groupBy(category.code);
}