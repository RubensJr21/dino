import { expoDb } from "@database/db-instance";

export const categories_available = {
  education: 'Educação',
  health: 'Saúde',
  entertainment: 'Lazer',
  food: 'Alimentação',
  housing: 'Moradia',
  transportation: 'Transporte',
  services: 'Serviços',
  shopping: 'Compras',
  taxes: 'Impostos/Taxas',
  others: 'Outros'
} as Record<string, string>

export function getCategoryLabel(key: string): string {
  return categories_available[key]
}

export type CategoriesAvailable = (keyof typeof categories_available)

interface Recurrence {
  displayText: string;
  calculation_method: (date: Date) => boolean
}
type RecurrencesAvailableType = {
  [key: string]: Recurrence
}

export const recurrence_types_available = {
  monthly: {
    displayText: "Mensalmente",
    calculation_method: (date: Date): boolean => (
      new Date().getMonth() !== date.getMonth()
    )
  },
  yearly: {
    displayText: "Anualmente",
    calculation_method: (date: Date): boolean => (
      new Date().getFullYear() !== date.getFullYear()
    )
  },
} satisfies RecurrencesAvailableType

export type RecurrencesAvailable = (keyof typeof recurrence_types_available)

export const transfer_methods_available = {
  cash: "Dinheiro",
  pix: "Pix",
  debit: "Débito",
} as Record<string, string>

export function getTransferMethodsLabel(key: string) {
  return transfer_methods_available[key]
}

export type TypeOfTransferMethods = (keyof typeof transfer_methods_available)

export async function populate_database() {
  function populate_table(table_name: string, data: Record<string, any>) {
    const result = expoDb.getAllSync(`SELECT * FROM ${table_name}`)
    if (result.length !== 0) {
      return;
    }
    const keys = Object.keys(data)
    const placeholders = keys.map(() => "(?, ?)").join(", ");
    const values = Array.from(keys, (item, index) => [index + 1, item])
      .flatMap(([id, code]) => [id, code]);
    expoDb.runSync(
      `INSERT OR IGNORE INTO ${table_name} VALUES ${placeholders}`,
      values
    );
    console.info(`${table_name} populada!`)
  }
  try {
    populate_table("category", categories_available);
    populate_table("recurrence_type", recurrence_types_available);
    populate_table("transfer_method", transfer_methods_available);
    expoDb.runSync("INSERT OR IGNORE INTO transaction_instrument (id, fk_id_transfer_method) VALUES (1,1)")

  } catch (error) {
    console.error(error)
  }
}