import { type DatabaseType } from "@database/db-instance";
import {
  balanceCash,
  baseTransactionType,
  installment,
  installmentItemValue,
  recurring,
  recurringItemValue,
  standard,
  transactionInstrument, transferMethod
} from "@database/schema";
import { desc, eq, SQL, sql } from "drizzle-orm";
import { calculateFinalBalance, calculatePartialBalance, coalesceAmount, dateFilter, dateRangeFilter, dateUntilFilter, isPayment, isReceipt, itemValueInstallment, itemValueRecurring, itemValueStandard, wasNotProcessed, wasProcessed } from "../utils";

async function getLastCalculatedBalanceForCash(db: DatabaseType) {
  return (await db
    .select({
      month: balanceCash.month,
      year: balanceCash.year,
      planned_receipts: balanceCash.planned_receipts,
      executed_receipts: balanceCash.executed_receipts,
      planned_payments: balanceCash.planned_payments,
      executed_payments: balanceCash.executed_payments,
    })
    .from(balanceCash)
    .orderBy(
      desc(balanceCash.year),
      desc(balanceCash.month)
    )
    .limit(1)
  ).shift()
}

export type CashReport = {
  nickname: string;

  planned_payments: number;
  planned_receipts: number;

  partial_balance: number;
  final_balance: number;
}

export function buildBaseQuery(db: DatabaseType, dateCondition: SQL<boolean>) {
  return db
    .select({
      planned_payments: sql<number>`
        COALESCE(SUM(
          CASE WHEN ${isPayment}
                AND ${wasNotProcessed} 
                AND ${dateCondition} 
          THEN ${coalesceAmount} ELSE 0 END
        ), 0)`,
      executed_payments: sql<number>`
        COALESCE(SUM(
          CASE WHEN ${isPayment}
                AND ${wasProcessed}
                AND ${dateCondition} 
          THEN ${coalesceAmount} ELSE 0 END
        ), 0)`,
      planned_receipts: sql<number>`
        COALESCE(SUM(
          CASE WHEN ${isReceipt}
                AND ${wasNotProcessed} 
                AND ${dateCondition} 
          THEN ${coalesceAmount} ELSE 0 END
        ), 0)`,
      executed_receipts: sql<number>`
        COALESCE(SUM(
          CASE WHEN ${isReceipt}
                AND ${wasProcessed}
                AND ${dateCondition} 
          THEN ${coalesceAmount} ELSE 0 END
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

    .where(eq(transferMethod.code, "cash"))
    .$dynamic()
}

function getBalanceOfCash(
  db: DatabaseType,
  dateCondition: SQL<boolean>
) {
  return buildBaseQuery(db, dateCondition)
    .execute()
    .then(list => list[0]);
}

export async function getCashBalance(db: DatabaseType, year: number, month: number) {
  // Se não tiver gasto irá mostrar nos valores
  const balance_cash = (await buildBaseQuery(db, dateFilter(year, month)).execute())[0]

  const lastDate = new Date(year, month - 1, 0)
  const lastYear = lastDate.getFullYear()
  const lastMonth = lastDate.getMonth()

  const last_calculated_balance = await getLastCalculatedBalanceForCash(db)

  if (last_calculated_balance === undefined) {
    // Calcula o saldo, recebimentos e pagamentos planejados
    // De todos os meses até antes do mês atual
    const balance_until_date = await getBalanceOfCash(db, dateUntilFilter(lastYear, lastMonth))

    const partial_balance = calculatePartialBalance(balance_until_date, balance_cash)
    const final_balance = calculateFinalBalance(balance_until_date, balance_cash)

    return {
      nickname: "cash",

      planned_payments: balance_cash.planned_payments,
      planned_receipts: balance_cash.planned_receipts,

      partial_balance,
      final_balance
    }
  }

  if (lastYear === last_calculated_balance.year && lastMonth === last_calculated_balance.month) {
    // Quer dizer que encontrei o anterior imediato
    const partial_balance = calculatePartialBalance(last_calculated_balance, balance_cash)
    const final_balance = calculateFinalBalance(last_calculated_balance, balance_cash)

    return {
      nickname: "cash",

      planned_payments: balance_cash.planned_payments,
      planned_receipts: balance_cash.planned_receipts,

      partial_balance,
      final_balance
    }
  }

  // Quer dizer que o mês ao qual eu estou buscando o relatório
  // está a, pelo menos, mais de um mês de distância do último balanço calculado
  // Com isso vou precisar calcular tudo até aquela dela
  const startYear = last_calculated_balance.year
  const startMonth = last_calculated_balance.month

  const dateCondition = dateRangeFilter(startYear, startMonth, lastYear, lastMonth)

  const balance_until_date = await getBalanceOfCash(db, dateCondition)


  const partial_balance = calculatePartialBalance(balance_until_date, last_calculated_balance, balance_cash)
  const final_balance = calculateFinalBalance(balance_until_date, last_calculated_balance, balance_cash)


  return {
    nickname: "cash",

    planned_payments: balance_cash.planned_payments,
    planned_receipts: balance_cash.planned_receipts,

    partial_balance,
    final_balance
  }
}