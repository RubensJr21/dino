// # Configuração do drizzle + SQLite

import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import * as schema from './schemas';

export const expoDb = openDatabaseSync("clean_architecture.db")
// export const expoDb = new Database("clean_architecture.db");
export const db = drizzle(expoDb, {schema});