import { type DatabaseType } from "@database/db-instance";
import { bankAccount, transactionInstrument, transferMethod } from "@database/schema";
import { and, eq, inArray, sql } from "drizzle-orm";

type DataInsert = typeof transactionInstrument.$inferInsert;
type DataSelect = typeof transactionInstrument.$inferSelect;

export async function get_all_filtered_by_transfer_method(
  db: DatabaseType,
  method_code: typeof transferMethod.$inferSelect.code
) {
  return await db
    .select({
      id: transactionInstrument.id,
      transfer_method_code: transferMethod.code,
      nickname: sql<string>`
        CASE
          WHEN ${bankAccount.id} IS NULL
          THEN ${transferMethod.code}
          ELSE ${transferMethod.code} || ' - ' || ${bankAccount.nickname}
        END
      `.as("nickname"),
    })
    .from(transactionInstrument)
    .innerJoin(
      transferMethod,
      eq(transactionInstrument.fk_id_transfer_method, transferMethod.id)
    )
    .innerJoin(
      bankAccount,
      eq(transactionInstrument.fk_id_bank_account, bankAccount.id)
    )
    .where(eq(transferMethod.code, method_code));
}

export async function get_all(
  db: DatabaseType
) {
  return await db
    .select({
      id: transactionInstrument.id,
      transfer_method_code: transferMethod.code,
      nickname: sql<string>`
        CASE
          WHEN ${bankAccount.id} IS NULL
          THEN ${transferMethod.code}
          ELSE ${transferMethod.code} || ' - ' || ${bankAccount.nickname}
        END
      `.as("nickname"),
    })
    .from(transactionInstrument)
    .innerJoin(
      transferMethod,
      eq(transactionInstrument.fk_id_transfer_method, transferMethod.id)
    )
    .innerJoin(
      bankAccount,
      eq(transactionInstrument.fk_id_bank_account, bankAccount.id)
    );
}

export async function get_all_enable_filtered_by_transfer_method(
  db: DatabaseType,
  method_code: typeof transferMethod.$inferSelect.code
) {
  return await db
    .select({
      id: transactionInstrument.id,
      transfer_method_code: transferMethod.code,
      nickname: sql<string>`
        CASE
          WHEN ${bankAccount.id} IS NULL
          THEN ${transferMethod.code}
          ELSE ${transferMethod.code} || ' - ' || ${bankAccount.nickname}
        END
      `.as("nickname"),
    })
    .from(transactionInstrument)
    .innerJoin(
      transferMethod,
      eq(transactionInstrument.fk_id_transfer_method, transferMethod.id)
    )
    .innerJoin(
      bankAccount,
      eq(transactionInstrument.fk_id_bank_account, bankAccount.id)
    )
    .where(
      and(
        eq(transferMethod.code, method_code),
        eq(transactionInstrument.is_enabled, true)
      )
    );
}

export async function get_all_enable_filtered_by_bank_account(db: DatabaseType, bank_account_id: number) {
  return await db
    .select({
      id: transactionInstrument.id,
      code: transferMethod.code
    })
    .from(transactionInstrument)
    .innerJoin(transferMethod, eq(transactionInstrument.fk_id_transfer_method, transferMethod.id))
    .where(
      and(
        eq(transactionInstrument.fk_id_bank_account, bank_account_id),
        eq(transactionInstrument.is_enabled, true)
      )
    )
}

export async function get_all_used_transfer_methods(db: DatabaseType) {
  return await db
    .selectDistinct({
      id: transferMethod.id,
      code: transferMethod.code
    })
    .from(transactionInstrument)
    .innerJoin(transferMethod, eq(transactionInstrument.fk_id_transfer_method, transferMethod.id))
    .where(eq(transactionInstrument.is_enabled, true))
}

export async function get_transaction_instrument_cash(db: DatabaseType) {
  return await db
    .select({
      id: transactionInstrument.id,
      nickname: transferMethod.code,
    })
    .from(transactionInstrument)
    .innerJoin(
      transferMethod,
      eq(transactionInstrument.fk_id_transfer_method, transferMethod.id)
    )
    .where(eq(transferMethod.code, "cash"));
}

export async function get_bank_id(
  db: DatabaseType,
  transaction_instrument_id: typeof transactionInstrument.$inferSelect.id
) {
  const [{ bank_id }] = await db
    .select({
      bank_id: transactionInstrument.fk_id_bank_account,
    })
    .from(transactionInstrument)
    .where(eq(transactionInstrument.id, transaction_instrument_id));
  return bank_id;
}

export async function register_transfer_methods(
  db: DatabaseType,
  data: DataInsert | DataInsert[]
) {
  // Feito assim para permitir a inserção de vários ou apenas 1
  if (Array.isArray(data)) {
    return await db.insert(transactionInstrument).values(data).returning();
  } else {
    return await db.insert(transactionInstrument).values(data).returning();
  }
}

type TransactionInstrumentId = typeof transactionInstrument.$inferSelect.id;

export async function disable_transfer_methods(
  db: DatabaseType,
  data: TransactionInstrumentId | TransactionInstrumentId[]
) {
  // Feito assim para permitir a inserção de vários ou apenas 1
  if (Array.isArray(data)) {
    return await db
      .update(transactionInstrument)
      .set({ is_enabled: false })
      .where(inArray(transactionInstrument.id, data))
      .returning();
  } else {
    return await db
      .update(transactionInstrument)
      .set({ is_enabled: false })
      .where(eq(transactionInstrument.id, data))
      .returning();
  }
}

export type { DataInsert as infer_insert, DataSelect as infer_select };

