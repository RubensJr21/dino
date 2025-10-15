import { type DatabaseType } from "@database/db-instance";
import {
  balanceBank,
  bankAccount,
  baseTransactionType,
  installment,
  installmentItemValue,
  recurring,
  recurringItemValue,
  standard,
  transactionInstrument
} from "@database/schema";
import { desc, eq, SQL, sql } from "drizzle-orm";
import { calculateFinalBalance, calculatePartialBalance, coalesceAmount, dateFilter, dateRangeFilter, dateUntilFilter, isPayment, isReceipt, itemValueInstallment, itemValueRecurring, itemValueStandard, wasNotProcessed, wasProcessed } from "../utils";

async function getLastCalculatedBalanceForBank(db: DatabaseType, bank_id: typeof bankAccount.$inferSelect.id) {
  return (await db
    .select({
      bank_id: balanceBank.fk_id_bank_account,
      nickname: bankAccount.nickname,
      month: balanceBank.month,
      year: balanceBank.year,
      planned_receipts: balanceBank.planned_receipts,
      executed_receipts: balanceBank.executed_receipts,
      planned_payments: balanceBank.planned_payments,
      executed_payments: balanceBank.executed_payments,
    })
    .from(balanceBank)
    .where(eq(bankAccount.id, bank_id))
    .innerJoin(bankAccount, eq(balanceBank.fk_id_bank_account, bankAccount.nickname))
    .orderBy(
      desc(balanceBank.year),
      desc(balanceBank.month)
    )
    .limit(1)
  ).shift()
}

function buildBaseQuery(db: DatabaseType, dateCondition: SQL<boolean>) {
  return db
    .select({
      bank_id: bankAccount.id,
      nickname: bankAccount.nickname,
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

    .groupBy(bankAccount.nickname)
    .$dynamic();
}

function getBalanceOfBank(
  db: DatabaseType,
  bank_id: typeof bankAccount.$inferSelect.id,
  dateCondition: SQL<boolean>
) {
  return buildBaseQuery(db, dateCondition)
    .where(eq(bankAccount.id, bank_id))
    .execute()
    .then(list => list[0]);
}

function getBalanceBank(db: DatabaseType, dateCondition: SQL<boolean>) {
  return buildBaseQuery(db, dateCondition).execute()
}

export type BankReport = {
  bank_id: number;
  nickname: string;

  planned_payments: number;
  planned_receipts: number;

  partial_balance: number;
  final_balance: number;
}

export async function getBankBalances(db: DatabaseType, year: number, month: number) {
  const balance_banks = await getBalanceBank(db, dateFilter(year, month))

  const reports_bank = new Array<BankReport>()

  const lastDate = new Date(year, month - 1, 1)
  const lastYear = lastDate.getFullYear()
  const lastMonth = lastDate.getMonth()

  for (const balance_bank of balance_banks) {
    const last_calculated_balance = await getLastCalculatedBalanceForBank(db, balance_bank.bank_id);
    if (last_calculated_balance === undefined) {
      // Calcula o saldo, recebimentos e pagamentos planejados
      // De todos os meses até antes do mês atual
      const balance_until_date = await getBalanceOfBank(db, balance_bank.bank_id, dateUntilFilter(lastYear, lastMonth))

      const partial_balance = calculatePartialBalance(balance_until_date, balance_bank)
      const final_balance = calculateFinalBalance(balance_until_date, balance_bank)

      reports_bank.push({
        bank_id: balance_bank.bank_id,
        nickname: balance_bank.nickname,

        planned_payments: balance_bank.planned_payments,
        planned_receipts: balance_bank.planned_receipts,

        partial_balance,
        final_balance
      })
    } else if (lastYear === last_calculated_balance.year && lastMonth === last_calculated_balance.month) {
      // Quer dizer que encontrei o anterior imediato
      const partial_balance = calculatePartialBalance(last_calculated_balance, balance_bank)
      const final_balance = calculateFinalBalance(last_calculated_balance, balance_bank)

      reports_bank.push({
        bank_id: balance_bank.bank_id,
        nickname: balance_bank.nickname,

        planned_payments: balance_bank.planned_payments,
        planned_receipts: balance_bank.planned_receipts,

        partial_balance,
        final_balance
      })
    } else {
      // Quer dizer que o mês ao qual eu estou buscando o relatório
      // está a, pelo menos, mais de um mês de distância do último balanço calculado
      // Com isso vou precisar calcular tudo até aquela dela
      const startYear = last_calculated_balance.year
      const startMonth = last_calculated_balance.month

      const dateCondition = dateRangeFilter(startYear, startMonth, lastYear, lastMonth)

      const balance_until_date = await getBalanceOfBank(db, balance_bank.bank_id, dateCondition)


      const partial_balance = calculatePartialBalance(balance_until_date, last_calculated_balance, balance_bank)
      const final_balance = calculateFinalBalance(balance_until_date, last_calculated_balance, balance_bank)


      reports_bank.push({
        bank_id: balance_bank.bank_id,
        nickname: balance_bank.nickname,

        planned_payments: balance_bank.planned_payments,
        planned_receipts: balance_bank.planned_receipts,

        partial_balance,
        final_balance
      })
    }
  }

  return reports_bank;
}

export function build_balance(
  db: DatabaseType,
  bank_id: typeof bankAccount.$inferSelect.id,
  year: number,
  month: number
) {
  const balance = buildBaseQuery(db, dateFilter(year, month))
    .where(eq(balanceBank.id, bank_id))
    .get()!;

  db.insert(balanceBank).values({
    fk_id_bank_account: bank_id,
    year,
    month,
    planned_receipts: balance.planned_receipts,
    planned_payments: balance.planned_payments,
    executed_receipts: balance.executed_receipts,
    executed_payments: balance.executed_payments
  })
}