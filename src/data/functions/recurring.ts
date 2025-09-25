import { type DatabaseType } from "@database/db-instance";
import {
  bankAccount,
  baseTransactionType,
  category,
  itemValue,
  recurrenceType,
  recurring,
  recurringItemValue,
  transactionInstrument,
  transferMethod,
} from "@database/schema";
import { and, eq, sql } from "drizzle-orm";

type DataInsert = typeof recurring.$inferInsert;
type DataSelect = typeof recurring.$inferSelect;

export async function get(
  db: DatabaseType,
  recurring_id: typeof recurring.$inferSelect.id
) {
  return (
    await db
      .select({
        id: recurring.id,

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

        start_date: recurring.start_date,
        end_date: recurring.end_date,
        current_amount: recurring.current_amount,

        transfer_method_code: transferMethod.code,

        recurrence_type_id: recurring.fk_id_recurrence_type,
        recurrence_type_code: recurrenceType.code,
      })
      .from(recurring)
      .innerJoin(baseTransactionType, eq(recurring.id, baseTransactionType.id))
      .innerJoin(
        transactionInstrument,
        eq(
          baseTransactionType.fk_id_transaction_instrument,
          transactionInstrument.id
        )
      )
      .innerJoin(
        transferMethod,
        eq(transactionInstrument.fk_id_transfer_method, transferMethod.id)
      )
      .innerJoin(
        recurrenceType,
        eq(recurring.fk_id_recurrence_type, recurrenceType.id)
      )
      .where(eq(recurring.id, recurring_id))
  ).shift();
}

export async function insert(db: DatabaseType, data: DataInsert) {
  return await db.insert(recurring).values(data).returning();
}

export async function register_item_value(
  db: DatabaseType,
  data: typeof recurringItemValue.$inferInsert
) {
  return await db.insert(recurringItemValue).values(data).returning();
}

export async function get_all_item_values(
  db: DatabaseType,
  recurring_id: typeof recurring.$inferSelect.id
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
    .from(recurringItemValue)
    .where(eq(recurringItemValue.fk_id_recurring, recurring_id))
    .innerJoin(itemValue, eq(recurringItemValue.fk_id_item_value, itemValue.id))
    .innerJoin(
      baseTransactionType,
      eq(recurringItemValue.fk_id_recurring, baseTransactionType.id)
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
    );
}

export async function get_item_value(
  db: DatabaseType,
  recurring_id: typeof recurring.$inferSelect.id,
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
      .from(recurringItemValue)
      .where(
        and(
          eq(recurringItemValue.fk_id_recurring, recurring_id),
          eq(itemValue.id, item_value_id)
        )
      )
      .innerJoin(
        itemValue,
        eq(recurringItemValue.fk_id_item_value, itemValue.id)
      )
      .innerJoin(
        baseTransactionType,
        eq(recurringItemValue.fk_id_recurring, baseTransactionType.id)
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
  recurring_id: typeof recurring.$inferSelect.id
) {
  await db.delete(recurring).where(eq(recurring.id, recurring_id));
}

export async function enable(
  db: DatabaseType,
  data: {
    id: typeof recurring.$inferSelect.id;
    start_date: typeof recurring.$inferSelect.start_date;
  }
) {
  await db
    .update(recurring)
    .set({ start_date: data.start_date, end_date: null })
    .where(eq(recurring.id, data.id));
}

export async function disable(
  db: DatabaseType,
  data: {
    id: typeof recurring.$inferSelect.id;
    end_date: typeof recurring.$inferSelect.end_date;
  }
) {
  await db
    .update(recurring)
    .set({ end_date: data.end_date })
    .where(eq(recurring.id, data.id));
}

export type { DataInsert as infer_insert, DataSelect as infer_select };

