import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import * as schema from "./schema";

export const expoDb = openDatabaseSync("dino.sqlite");
export const db = drizzle(expoDb, { schema });
export type DatabaseType = typeof db;

function beginTransaction() {
  db.$client.execSync("BEGIN TRANSACTION");
}

function commitTransaction() {
  db.$client.execSync("COMMIT");
}

function rollbackTransaction() {
  db.$client.execSync("ROLLBACK");
}

export const transactionsFn = {
  begin: beginTransaction,
  commit: commitTransaction,
  rollback: rollbackTransaction,
};
