import { type DatabaseType } from "@database/db-instance";
import { transferMethod } from "@database/schema";
import { eq, inArray, not } from "drizzle-orm";

type DataInsert = typeof transferMethod.$inferInsert;
type DataSelect = typeof transferMethod.$inferSelect;

export async function get_all(db: DatabaseType) {
  return await db.select().from(transferMethod);
}

export async function get_all_without_code(db: DatabaseType, code: DataSelect["code"] | DataSelect["code"][]) {
  if (Array.isArray(code)) {
    return await db.select().from(transferMethod).where(not(inArray(transferMethod.code, code)));
  } else {
    return await db.select().from(transferMethod).where(not(eq(transferMethod.code, code)));
  }
}

export async function get_by_code(db: DatabaseType, code: DataSelect["code"]) {
  return await db
    .select()
    .from(transferMethod)
    .where(eq(transferMethod.code, code));
}

export async function get_all_filtered_by_codes(
  db: DatabaseType,
  codes: DataSelect["code"][]
) {
  return await db
    .select()
    .from(transferMethod)
    .where(inArray(transferMethod.code, codes));
}

export function diff_method_codes(
  a: DataSelect[],
  b: DataSelect["code"][]
): DataSelect["code"][] {
  const codesInA = new Set(a.map((item) => item.code));
  return b.filter((code) => !codesInA.has(code));
}

export type { DataInsert as infer_insert, DataSelect as infer_select };

