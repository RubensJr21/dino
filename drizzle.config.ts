import type { Config } from 'drizzle-kit';

export default {
  schema: './src/server/infrastructure/database/drizzle/schemas/*.ts',
  out: './drizzle',
  dialect: 'sqlite',
  driver: 'expo', // <--- very important
} satisfies Config;
