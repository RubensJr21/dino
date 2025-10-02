import { type DatabaseType } from "@database/db-instance";
import {
  bankAccount,
  baseTransactionType,
  installment,
  installmentItemValue,
  recurring,
  recurringItemValue,
  standard,
  transactionInstrument, transferMethod
} from "@database/schema";
import { eq, sql } from "drizzle-orm";
import { coalesceWasProcessed, dateFilter, itemValueInstallment, itemValueRecurring, itemValueStandard, realAmount } from "./utils";

type ReturnType = {
  balance_banks: Array<{
    nickname: string;
    planned: number;
    executed: number;
  }>
  balance_cash: {
    planned: number;
    executed: number;
  }
}

export { type ReturnType as BalanceByOriginReturn };

export async function balance_by_origin(
  db: DatabaseType,
  month: number,
  year: number,
): Promise<ReturnType> {
  async function getBankBalances(year: number, month: number) {
    return db
      .select({
        nickname: bankAccount.nickname,
        planned: sql<number>`
        COALESCE(SUM(
          CASE WHEN ${coalesceWasProcessed} = 0 
               AND ${dateFilter(year, month)} 
          THEN ${realAmount} ELSE 0 END
        ), 0)`,
        executed: sql<number>`
        COALESCE(SUM(
          CASE WHEN ${coalesceWasProcessed} = 1 
               AND ${dateFilter(year, month)} 
          THEN ${realAmount} ELSE 0 END
        ), 0)`,
      })
      .from(bankAccount)
      .leftJoin(transactionInstrument, eq(transactionInstrument.fk_id_bank_account, bankAccount.id))
      .leftJoin(baseTransactionType, eq(baseTransactionType.fk_id_transaction_instrument, transactionInstrument.id))

      // 👇 conecta cada subtipo
      .leftJoin(standard, eq(standard.id, baseTransactionType.id))
      .leftJoin(itemValueStandard, eq(itemValueStandard.id, standard.fk_id_item_value))

      .leftJoin(installment, eq(installment.id, baseTransactionType.id))
      .leftJoin(installmentItemValue, eq(installmentItemValue.fk_id_installment, installment.id))
      .leftJoin(itemValueInstallment, eq(itemValueInstallment.id, installmentItemValue.fk_id_item_value))

      .leftJoin(recurring, eq(recurring.id, baseTransactionType.id))
      .leftJoin(recurringItemValue, eq(recurringItemValue.fk_id_recurring, recurring.id))
      .leftJoin(itemValueRecurring, eq(itemValueRecurring.id, recurringItemValue.fk_id_item_value))

      .groupBy(bankAccount.nickname);
  }
  async function getCashBalance(year: number, month: number) {
    const row = await db
      .select({
        planned: sql<number>`
        COALESCE(SUM(
          CASE WHEN ${coalesceWasProcessed} = 0 
               AND ${dateFilter(year, month)} 
          THEN ${realAmount} ELSE 0 END
        ), 0)`,
        executed: sql<number>`
        COALESCE(SUM(
          CASE WHEN ${coalesceWasProcessed} = 1 
               AND ${dateFilter(year, month)} 
          THEN ${realAmount} ELSE 0 END
        ), 0)`,
      })
      .from(transferMethod)
      .leftJoin(transactionInstrument, eq(transactionInstrument.fk_id_transfer_method, transferMethod.id))
      .leftJoin(baseTransactionType, eq(baseTransactionType.fk_id_transaction_instrument, transactionInstrument.id))

      // joins para os 3 tipos
      .leftJoin(standard, eq(standard.id, baseTransactionType.id))
      .leftJoin(itemValueStandard, eq(itemValueStandard.id, standard.fk_id_item_value))

      .leftJoin(installment, eq(installment.id, baseTransactionType.id))
      .leftJoin(installmentItemValue, eq(installmentItemValue.fk_id_installment, installment.id))
      .leftJoin(itemValueInstallment, eq(itemValueInstallment.id, installmentItemValue.fk_id_item_value))

      .leftJoin(recurring, eq(recurring.id, baseTransactionType.id))
      .leftJoin(recurringItemValue, eq(recurringItemValue.fk_id_recurring, recurring.id))
      .leftJoin(itemValueRecurring, eq(itemValueRecurring.id, recurringItemValue.fk_id_item_value))

      .where(eq(transferMethod.code, "cash"));

    return row[0] ?? { planned: 0, executed: 0 };
  }


  const [balance_banks, balance_cash] = await Promise.all([
    getBankBalances(year, month),
    getCashBalance(year, month),
  ]);

  return { balance_banks, balance_cash };
}