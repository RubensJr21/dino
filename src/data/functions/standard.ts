import { type DatabaseType } from "@database/db-instance";
import {
  bankAccount,
  baseTransactionType,
  category,
  itemValue,
  standard,
  transactionInstrument,
  transferMethod,
} from "@database/schema";
import { desc, eq, sql } from "drizzle-orm";

type DataInsert = typeof standard.$inferInsert;
type DataSelect = typeof standard.$inferSelect;

export async function get_all(db: DatabaseType, cashflow_type: Cashflow_Type) {
  return (
    await db
      .select({
        id: standard.id,

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

        item_value_id: standard.fk_id_item_value,
        amount: itemValue.amount,
        scheduled_at: itemValue.scheduled_at,
        was_processed: itemValue.was_processed,
      })
      .from(standard)
      .innerJoin(baseTransactionType, eq(baseTransactionType.id, standard.id))
      .innerJoin(category, eq(category.id, baseTransactionType.fk_id_category))
      .innerJoin(
        transactionInstrument,
        eq(
          transactionInstrument.id,
          baseTransactionType.fk_id_transaction_instrument
        )
      )
      .leftJoin(bankAccount, eq(bankAccount.id, transactionInstrument.fk_id_bank_account))
      .innerJoin(
        transferMethod,
        eq(transferMethod.id, transactionInstrument.fk_id_transfer_method)
      )
      .innerJoin(itemValue, eq(itemValue.id, standard.fk_id_item_value))
      .where(eq(baseTransactionType.cashflow_type, cashflow_type))
      .orderBy(desc(itemValue.scheduled_at))
  )
}

export async function get(
  db: DatabaseType,
  standard_id: DataSelect["id"]
) {
  return (
    await db
      .select({
        id: standard.id,

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

        item_value_id: standard.fk_id_item_value,
        amount: itemValue.amount,
        scheduled_at: itemValue.scheduled_at,
        was_processed: itemValue.was_processed,
      })
      .from(standard)
      .innerJoin(baseTransactionType, eq(baseTransactionType.id, standard.id))
      .innerJoin(category, eq(category.id, baseTransactionType.fk_id_category))
      .innerJoin(
        transactionInstrument,
        eq(
          transactionInstrument.id,
          baseTransactionType.fk_id_transaction_instrument
        )
      )
      .leftJoin(bankAccount, eq(bankAccount.id, transactionInstrument.fk_id_bank_account))
      .innerJoin(
        transferMethod,
        eq(transferMethod.id, transactionInstrument.fk_id_transfer_method)
      )
      .innerJoin(itemValue, eq(itemValue.id, standard.fk_id_item_value))
      .where(eq(standard.id, standard_id))
  ).shift();
}

export async function insert(db: DatabaseType, data: DataInsert) {
  return await db.insert(standard).values(data).returning()
}

export async function remove(
  db: DatabaseType,
  standard_id: DataSelect["id"]
) {
  await db.delete(standard).where(eq(standard.id, standard_id));
}

export type { DataInsert as infer_insert, DataSelect as infer_select };

