// # Configuração do drizzle + SQLite

import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
// import Database from 'better-sqlite3';
// import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schemas';

export const expoDb = openDatabaseSync("clean_architecture.db")
// export const expoDb = new Database("clean_architecture.db");
export const db = drizzle(expoDb, {schema});