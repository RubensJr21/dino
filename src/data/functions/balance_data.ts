import { DatabaseType } from "@database/db-instance";
import { balanceData } from "@database/schema";

export async function get_last_compilation_date(db: DatabaseType) {
  return await db.query.balanceData.findFirst()
}

export async function initialize_last_compilation_date(
  db: DatabaseType, last_compilation_date: Date
) {
  await db.insert(balanceData).values({
    last_compilation_date
  })
}

export async function update_last_compilation_date(
  db: DatabaseType, last_compilation_date: Date
) {
  await db.update(balanceData).set({
    last_compilation_date
  })
}