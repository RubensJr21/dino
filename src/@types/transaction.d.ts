import { db } from "../data/infrastructu@server/infrastructure/database/drizzle/client";

export type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0];