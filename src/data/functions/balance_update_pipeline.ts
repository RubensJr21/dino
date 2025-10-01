import { getRealAmountValue } from "@data/playground/utils";
import * as bb from "@data_functions/balance_bank";
import * as bc from "@data_functions/balance_cash";
import * as btt from "@data_functions/base_transaction_type";
import * as iv from "@data_functions/item_value";
import * as ti from "@data_functions/transaction_instrument";
import { type DatabaseType } from "@database/db-instance";
import {
  balanceBank,
  balanceCash,
  baseTransactionType,
  itemValue,
  transactionInstrument,
} from "@database/schema";
import { eq } from "drizzle-orm";

type monthType = typeof balanceBank.$inferSelect.month &
  typeof balanceCash.$inferSelect.month;
type yearType = typeof balanceBank.$inferSelect.year &
  typeof balanceCash.$inferSelect.year;

type BaseData = {
  month: monthType;
  year: yearType;
  amount: typeof itemValue.$inferSelect.amount;
  cashflow_type: typeof baseTransactionType.$inferSelect.cashflow_type;
};

type CashData = BaseData;
type BankData = BaseData & {
  transaction_instrument_id: typeof transactionInstrument.$inferSelect.id;
};

export async function balance_bank_update_pipeline(
  db: DatabaseType,
  data: BankData,
  removing: boolean = false,
  was_processed: boolean
) {
  const { month, year, amount } = data;

  const realAmount = getRealAmountValue(data.cashflow_type, amount, removing);

  // Garanto que existe, pois ele não é do tipo 'cash'
  const bank_id = await ti.get_bank_id(db, data.transaction_instrument_id);

  if (bank_id === null) {
    throw new Error(`Erro ao obter o valor de bank_id (${bank_id})`);
  }

  const balance_bank = await bb.get_balance(db, {
    month,
    year,
    bank_id,
  });

  if (balance_bank === undefined) {
    throw new Error("Nenhum balanço bancário nesse período foi encontrado.");
  }

  if (was_processed) {
    await db
      .update(balanceBank)
      .set({
        planned_amount: balance_bank.executed_amount + realAmount,
        executed_amount: balance_bank.executed_amount + realAmount
      })
      .where(eq(balanceBank.id, balance_bank.id))
  } else {
    await db
      .update(balanceBank)
      .set({
        planned_amount: balance_bank.executed_amount + realAmount
      })
      .where(eq(balanceBank.id, balance_bank.id))
  }
}

export async function balance_cash_update_pipeline(
  db: DatabaseType,
  data: CashData,
  removing: boolean = false,
  was_processed: boolean
) {
  const { month, year, amount } = data;

  const realAmount = getRealAmountValue(data.cashflow_type, amount, removing);

  const balance_cash = await bc.get_balance(db, {
    month,
    year,
  });

  if (balance_cash === undefined) {
    throw new Error("Nenhum balanço bancário nesse período foi encontrado.");
  }

  if (was_processed) {
    await db
      .update(balanceBank)
      .set({
        planned_amount: balance_cash.executed_amount + realAmount,
        executed_amount: balance_cash.executed_amount + realAmount
      })
      .where(eq(balanceBank.id, balance_cash.id))
  } else {
    await db
      .update(balanceBank)
      .set({
        planned_amount: balance_cash.executed_amount + realAmount
      })
      .where(eq(balanceBank.id, balance_cash.id))
  }
}

// MUDANÇAS BASEADAS EM ATRIBUTOS
// ==============================
// Amount and ScheduledAt
// ==============================
interface changeAmountAndScheduledAtBalanceCashParams {
  cashflow_type: btt.infer_select["cashflow_type"];

  old_data: {
    scheduled_at: iv.infer_select["scheduled_at"];
    amount: iv.infer_select["amount"];
  }

  new_data: changeAmountAndScheduledAtBalanceCashParams["old_data"]

  was_processed: iv.infer_select["was_processed"]
}

export async function change_amount_and_scheduled_at_from_balance_cash(
  db: DatabaseType,
  {
    cashflow_type,
    old_data,
    new_data,
    was_processed
  }: changeAmountAndScheduledAtBalanceCashParams
) {
  const oldMonth = old_data.scheduled_at.getMonth()
  const oldYear = old_data.scheduled_at.getFullYear()
  const oldAmount = old_data.amount

  const newMonth = new_data.scheduled_at.getMonth()
  const newYear = new_data.scheduled_at.getFullYear()
  const newAmount = new_data.amount

  // Remove o antigo
  await balance_cash_update_pipeline(db, {
    month: oldMonth,
    year: oldYear,
    cashflow_type,
    amount: oldAmount
  }, true, was_processed)
  // Adiciona o atualizado
  await balance_cash_update_pipeline(db, {
    month: newMonth,
    year: newYear,
    cashflow_type,
    amount: newAmount
  }, false, was_processed)
}

interface changeAmountAndScheduledAtBalanceBankParams {
  cashflow_type: btt.infer_select["cashflow_type"];

  old_data: {
    scheduled_at: iv.infer_select["scheduled_at"];
    amount: iv.infer_select["amount"];
  }

  new_data: changeAmountAndScheduledAtBalanceBankParams["old_data"]

  transaction_instrument_id: ti.infer_select["id"]

  was_processed: iv.infer_select["was_processed"]
}
export async function change_amount_and_scheduled_at_from_balance_bank(
  db: DatabaseType,
  {
    cashflow_type,
    old_data,
    new_data,
    transaction_instrument_id,
    was_processed
  }: changeAmountAndScheduledAtBalanceBankParams
) {
  const oldMonth = old_data.scheduled_at.getMonth()
  const oldYear = old_data.scheduled_at.getFullYear()
  const oldAmount = old_data.amount

  const newMonth = new_data.scheduled_at.getMonth()
  const newYear = new_data.scheduled_at.getFullYear()
  const newAmount = new_data.amount

  // Garanto porque verifiquei o transfer_method
  // Remove o antigo
  await balance_bank_update_pipeline(db, {
    month: oldMonth,
    year: oldYear,
    cashflow_type,
    amount: oldAmount,
    transaction_instrument_id
  }, true, was_processed)
  // Adiciona o atualizado
  await balance_bank_update_pipeline(db, {
    month: newMonth,
    year: newYear,
    cashflow_type,
    amount: newAmount,
    transaction_instrument_id
  }, false, was_processed)
}

// ==============================
// Only Amount
// ==============================
interface changeAmountBalanceCashParams {
  cashflow_type: btt.infer_select["cashflow_type"];
  scheduled_at: iv.infer_select["scheduled_at"]

  old_data: {
    amount: iv.infer_select["amount"];
  }

  new_data: changeAmountBalanceCashParams["old_data"]

  was_processed: iv.infer_select["was_processed"]
}

export async function change_amount_from_balance_cash(
  db: DatabaseType,
  {
    cashflow_type,
    scheduled_at,
    old_data,
    new_data,
    was_processed
  }: changeAmountBalanceCashParams
) {
  const month = scheduled_at.getMonth()
  const year = scheduled_at.getFullYear()

  const oldAmount = old_data.amount
  const newAmount = new_data.amount

  // Remove o antigo
  await balance_cash_update_pipeline(db, {
    month: month,
    year: year,
    cashflow_type,
    amount: oldAmount
  }, true, was_processed)
  // Adiciona o atualizado
  await balance_cash_update_pipeline(db, {
    month,
    year,
    cashflow_type,
    amount: newAmount
  }, false, was_processed)
}

interface changeAmountBalanceBankParams {
  cashflow_type: btt.infer_select["cashflow_type"];
  scheduled_at: iv.infer_select["scheduled_at"]

  old_data: {
    amount: iv.infer_select["amount"];
  }

  new_data: changeAmountBalanceBankParams["old_data"]

  transaction_instrument_id: ti.infer_select["id"]

  was_processed: iv.infer_select["was_processed"]
}

export async function change_amount_from_balance_bank(
  db: DatabaseType,
  {
    cashflow_type,
    scheduled_at,
    old_data,
    new_data,
    transaction_instrument_id,
    was_processed
  }: changeAmountBalanceBankParams
) {
  const month = scheduled_at.getMonth()
  const year = scheduled_at.getFullYear()

  const oldAmount = old_data.amount
  const newAmount = new_data.amount

  // Garanto porque verifiquei o transafer_method
  // Remove o antigo
  await balance_bank_update_pipeline(db, {
    month,
    year: year,
    cashflow_type,
    amount: oldAmount,
    transaction_instrument_id
  }, true, was_processed)
  // Adiciona o atualizado
  await balance_bank_update_pipeline(db, {
    month,
    year: year,
    cashflow_type,
    amount: newAmount,
    transaction_instrument_id
  }, false, was_processed)
}

// ==============================
// Only ScheduledAt
// ==============================
interface changeScheduledAtBalanceCashParams {
  cashflow_type: btt.infer_select["cashflow_type"];
  amount: iv.infer_select["amount"];

  old_data: {
    scheduled_at: iv.infer_select["scheduled_at"];
  }

  new_data: changeScheduledAtBalanceCashParams["old_data"]

  was_processed: iv.infer_select["was_processed"]
}

export async function change_scheduled_at_from_balance_cash(
  db: DatabaseType,
  {
    cashflow_type,
    amount,
    old_data,
    new_data,
    was_processed
  }: changeScheduledAtBalanceCashParams
) {
  const oldMonth = old_data.scheduled_at.getMonth()
  const oldYear = old_data.scheduled_at.getFullYear()

  const newMonth = new_data.scheduled_at.getMonth()
  const newYear = new_data.scheduled_at.getFullYear()

  // Remove o antigo
  await balance_cash_update_pipeline(db, {
    month: oldMonth,
    year: oldYear,
    cashflow_type,
    amount
  }, true, was_processed)
  // Adiciona o atualizado
  await balance_cash_update_pipeline(db, {
    month: newMonth,
    year: newYear,
    cashflow_type,
    amount
  }, false, was_processed)
}

interface changeScheduledAtBalanceBankParams {
  cashflow_type: btt.infer_select["cashflow_type"];
  amount: iv.infer_select["amount"];

  old_data: {
    scheduled_at: iv.infer_select["scheduled_at"];
  }

  new_data: changeScheduledAtBalanceBankParams["old_data"]

  transaction_instrument_id: ti.infer_select["id"]

  was_processed: iv.infer_select["was_processed"]
}
export async function change_scheduled_at_from_balance_bank(
  db: DatabaseType,
  {
    cashflow_type,
    amount,
    old_data,
    new_data,
    transaction_instrument_id,
    was_processed
  }: changeScheduledAtBalanceBankParams
) {
  const oldMonth = old_data.scheduled_at.getMonth()
  const oldYear = old_data.scheduled_at.getFullYear()

  const newMonth = new_data.scheduled_at.getMonth()
  const newYear = new_data.scheduled_at.getFullYear()

  // Garanto porque verifiquei o transafer_method
  // Remove o antigo
  await balance_bank_update_pipeline(db, {
    month: oldMonth,
    year: oldYear,
    cashflow_type,
    amount,
    transaction_instrument_id
  }, true, was_processed)
  // Adiciona o atualizado
  await balance_bank_update_pipeline(db, {
    month: newMonth,
    year: newYear,
    cashflow_type,
    amount,
    transaction_instrument_id
  }, false, was_processed)
}