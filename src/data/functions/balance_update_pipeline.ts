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
  removing: boolean = false
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

  await bb.apply_executed_amount(db, {
    id: balance_bank.id,
    updated_executed_amount: balance_bank.executed_amount + realAmount,
  });
}

export async function balance_cash_update_pipeline(
  db: DatabaseType,
  data: CashData,
  removing: boolean = false
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

  await bc.apply_executed_amount(db, {
    id: balance_cash.id,
    updated_executed_amount: balance_cash.executed_amount + realAmount,
  });
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
}

export async function change_amount_and_scheduled_at_from_balance_cash(
  db: DatabaseType,
  {
    cashflow_type,
    old_data,
    new_data
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
  }, true)
  // Adiciona o atualizado
  await balance_cash_update_pipeline(db, {
    month: newMonth,
    year: newYear,
    cashflow_type,
    amount: newAmount
  }, false)
}

interface changeAmountAndScheduledAtBalanceBankParams {
  cashflow_type: btt.infer_select["cashflow_type"];

  old_data: {
    scheduled_at: iv.infer_select["scheduled_at"];
    amount: iv.infer_select["amount"];
  }

  new_data: changeAmountAndScheduledAtBalanceBankParams["old_data"]

  transaction_instrument_id: ti.infer_select["id"]
}
export async function change_amount_and_scheduled_at_from_balance_bank(
  db: DatabaseType,
  {
    cashflow_type,
    old_data,
    new_data,
    transaction_instrument_id
  }: changeAmountAndScheduledAtBalanceBankParams
) {
  const oldMonth = old_data.scheduled_at.getMonth()
  const oldYear = old_data.scheduled_at.getFullYear()
  const oldAmount = old_data.amount

  const newMonth = new_data.scheduled_at.getMonth()
  const newYear = new_data.scheduled_at.getFullYear()
  const newAmount = new_data.amount

  // Garanto porque verifiquei o transafer_method
  // Remove o antigo
  await balance_bank_update_pipeline(db, {
    month: oldMonth,
    year: oldYear,
    cashflow_type,
    amount: oldAmount,
    transaction_instrument_id
  }, true)
  // Adiciona o atualizado
  await balance_bank_update_pipeline(db, {
    month: newMonth,
    year: newYear,
    cashflow_type,
    amount: newAmount,
    transaction_instrument_id
  }, false)
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
}

export async function change_amount_from_balance_cash(
  db: DatabaseType,
  {
    cashflow_type,
    scheduled_at,
    old_data,
    new_data
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
  }, true)
  // Adiciona o atualizado
  await balance_cash_update_pipeline(db, {
    month,
    year,
    cashflow_type,
    amount: newAmount
  }, false)
}

interface changeAmountBalanceBankParams {
  cashflow_type: btt.infer_select["cashflow_type"];
  scheduled_at: iv.infer_select["scheduled_at"]

  old_data: {
    amount: iv.infer_select["amount"];
  }

  new_data: changeAmountBalanceBankParams["old_data"]

  transaction_instrument_id: ti.infer_select["id"]
}

export async function change_amount_from_balance_bank(
  db: DatabaseType,
  {
    cashflow_type,
    scheduled_at,
    old_data,
    new_data,
    transaction_instrument_id
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
  }, true)
  // Adiciona o atualizado
  await balance_bank_update_pipeline(db, {
    month,
    year: year,
    cashflow_type,
    amount: newAmount,
    transaction_instrument_id
  }, false)
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
}

export async function change_scheduled_at_from_balance_cash(
  db: DatabaseType,
  {
    cashflow_type,
    amount,
    old_data,
    new_data
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
  }, true)
  // Adiciona o atualizado
  await balance_cash_update_pipeline(db, {
    month: newMonth,
    year: newYear,
    cashflow_type,
    amount
  }, false)
}

interface changeScheduledAtBalanceBankParams {
  cashflow_type: btt.infer_select["cashflow_type"];
  amount: iv.infer_select["amount"];

  old_data: {
    scheduled_at: iv.infer_select["scheduled_at"];
  }

  new_data: changeScheduledAtBalanceBankParams["old_data"]

  transaction_instrument_id: ti.infer_select["id"]
}
export async function change_scheduled_at_from_balance_bank(
  db: DatabaseType,
  {
    cashflow_type,
    amount,
    old_data,
    new_data,
    transaction_instrument_id
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
  }, true)
  // Adiciona o atualizado
  await balance_bank_update_pipeline(db, {
    month: newMonth,
    year: newYear,
    cashflow_type,
    amount,
    transaction_instrument_id
  }, false)
}