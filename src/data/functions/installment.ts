import { type DatabaseType } from "@database/db-instance";
import {
    bankAccount,
    baseTransactionType,
    category,
    installment,
    installmentItemValue,
    itemValue,
    transactionInstrument,
    transferMethod,
} from "@database/schema";
import { and, desc, eq, sql } from "drizzle-orm";

type DataInsert = typeof installment.$inferInsert;
type DataSelect = typeof installment.$inferSelect;

export async function get_all(db: DatabaseType){
  return (
    await db
      .select({
        id: installment.id,

        cashflow_type: baseTransactionType.cashflow_type,
        description: baseTransactionType.description,

        category_id: baseTransactionType.fk_id_category,
        category_code: category.code,

        transaction_instrument_id: baseTransactionType.fk_id_transaction_instrument,
        transaction_instrument_nickname: sql<string>`
          CASE
            WHEN ${bankAccount.id} IS NULL
            THEN ${transferMethod.code}
            ELSE ${transferMethod.code} || ' - ' || ${bankAccount.nickname}
          END
        `.as("transaction_instrument_nickname"),
        bank_account_id: transactionInstrument.fk_id_bank_account,

        transfer_method_code: transferMethod.code,

        start_date: installment.start_date,
        installments_number: installment.installments_number,
        total_amount: installment.total_amount,
      })
      .from(installment)
      .innerJoin(
        baseTransactionType,
        eq(installment.id, baseTransactionType.id)
      )
      .innerJoin(category, eq(baseTransactionType.fk_id_category, category.id))
      .innerJoin(
        transactionInstrument,
        eq(
          baseTransactionType.fk_id_transaction_instrument,
          transactionInstrument.id
        )
      )
      .leftJoin(bankAccount, eq(transactionInstrument.fk_id_bank_account, bankAccount.id))
      .innerJoin(
        transferMethod,
        eq(transactionInstrument.fk_id_transfer_method, transferMethod.id)
      )
      .orderBy(desc(installment.start_date))
  )
}

export async function get(
  db: DatabaseType,
  installment_id: typeof installment.$inferSelect.id
) {
  return (
    await db
      .select({
        id: installment.id,

        cashflow_type: baseTransactionType.cashflow_type,
        description: baseTransactionType.description,

        category_id: baseTransactionType.fk_id_category,
        category_code: category.code,

        transaction_instrument_id: baseTransactionType.fk_id_transaction_instrument,
        transaction_instrument_nickname: sql<string>`
          CASE
            WHEN ${bankAccount.id} IS NULL
            THEN ${transferMethod.code}
            ELSE ${transferMethod.code} || ' - ' || ${bankAccount.nickname}
          END
        `.as("transaction_instrument_nickname"),
        bank_account_id: transactionInstrument.fk_id_bank_account,

        transfer_method_code: transferMethod.code,

        start_date: installment.start_date,
        installments_number: installment.installments_number,
        total_amount: installment.total_amount,
      })
      .from(installment)
      .innerJoin(
        baseTransactionType,
        eq(installment.id, baseTransactionType.id)
      )
      .innerJoin(category, eq(baseTransactionType.fk_id_category, category.id))
      .innerJoin(
        transactionInstrument,
        eq(
          baseTransactionType.fk_id_transaction_instrument,
          transactionInstrument.id
        )
      )
      .leftJoin(bankAccount, eq(transactionInstrument.fk_id_bank_account, bankAccount.id))
      .innerJoin(
        transferMethod,
        eq(transactionInstrument.fk_id_transfer_method, transferMethod.id)
      )
      .where(eq(installment.id, installment_id))
  ).shift();
}

export const calculate_installments = (
  total_amount: DataSelect["total_amount"],
  installments_number: DataSelect["total_amount"]
): [first_installment: number, others: number] => {
  const installment_value = Math.trunc(total_amount / installments_number);
  const residual_installment_value = total_amount % installments_number;

  return [installment_value + residual_installment_value, installment_value];
};

export async function insert(db: DatabaseType, data: DataInsert) {
  return await db.insert(installment).values(data).returning();
}

export async function register_item_value(
  db: DatabaseType,
  data: typeof installmentItemValue.$inferInsert
) {
  return await db.insert(installmentItemValue).values(data).returning();
}
export async function get_all_item_values(
  db: DatabaseType,
  installment_id: typeof installment.$inferSelect.id
) {
  return await db
    .select({
      id: itemValue.id,
      scheduled_at: itemValue.scheduled_at,
      amount: itemValue.amount,
      was_processed: itemValue.was_processed,

      cashflow_type: baseTransactionType.cashflow_type,

      bank_account_id: transactionInstrument.fk_id_bank_account,

      transfer_method_code: transferMethod.code,
    })
    .from(installmentItemValue)
    .where(eq(installmentItemValue.fk_id_installment, installment_id))
    .innerJoin(
      itemValue,
      eq(installmentItemValue.fk_id_item_value, itemValue.id)
    )
    .innerJoin(
      baseTransactionType,
      eq(installmentItemValue.fk_id_installment, baseTransactionType.id)
    )
    .innerJoin(
      transactionInstrument,
      eq(
        transactionInstrument.id,
        baseTransactionType.fk_id_transaction_instrument
      )
    )
    .innerJoin(
      transferMethod,
      eq(transferMethod.id, transactionInstrument.fk_id_transfer_method)
    )
    .orderBy(desc(itemValue.scheduled_at));
}

export async function get_item_value(
  db: DatabaseType,
  installment_id: typeof installment.$inferSelect.id,
  item_value_id: typeof itemValue.$inferSelect.id
) {
  return (
    await db
      .select({
        id: itemValue.id,
        scheduled_at: itemValue.scheduled_at,
        amount: itemValue.amount,
        was_processed: itemValue.was_processed,

        cashflow_type: baseTransactionType.cashflow_type,

        bank_account_id: transactionInstrument.fk_id_bank_account,

        transfer_method_code: transferMethod.code,
      })
      .from(installmentItemValue)
      .where(
        and(
          eq(installmentItemValue.fk_id_installment, installment_id),
          eq(itemValue.id, item_value_id)
        )
      )
      .innerJoin(
        itemValue,
        eq(installmentItemValue.fk_id_item_value, itemValue.id)
      )
      .innerJoin(
        baseTransactionType,
        eq(installmentItemValue.fk_id_installment, baseTransactionType.id)
      )
      .innerJoin(
        transactionInstrument,
        eq(
          transactionInstrument.id,
          baseTransactionType.fk_id_transaction_instrument
        )
      )
      .innerJoin(
        transferMethod,
        eq(transferMethod.id, transactionInstrument.fk_id_transfer_method)
      )
  ).shift();
}

export async function remove(
  db: DatabaseType,
  installment_id: typeof installment.$inferSelect.id
) {
  await db.delete(installment).where(eq(installment.id, installment_id));
}

export type { DataInsert as infer_insert, DataSelect as infer_select };

