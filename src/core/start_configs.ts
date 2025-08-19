
// REVIEW: Na inicialização preciso:

import { expoDb } from "@src/infrastructure/database/client";

/**
 * 1. Tentar registrar
 * 2. Pode dar um erro da clausula de unique
 * 3. Caso o erro aconteça quer dizer que a tag já está cadastrada
 */
type TagsAvailableType = {
  [key: string]: string
}

export const tags_available = {
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

export type TagsAvailable = (keyof typeof tags_available)

// REVIEW: Essas são os métodos de transferência disponíveis:
// TODO: Usar migration para registrar transfer_methods_available

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
  annually: {
    displayText: "Anualmente",
    calculation_method: (date: Date): boolean => (
      new Date().getFullYear() !== date.getFullYear()
    )
  },
} satisfies RecurrencesAvailableType

export type RecurrencesAvailable = (keyof typeof recurrence_types_available)

export const transfer_methods_available = {
  PIX: "Pix",
  DEBIT: "Débito",
  BANK_TRANSFER: "Transferência bancária"
}

export type TypeOfTransferMethods = (keyof typeof transfer_methods_available)

export async function populate_database(){
  function populate_table(table_name: string, data: Record<string, any>){
    const result = expoDb.getAllSync(`SELECT * FROM ${table_name}`)
    if(result.length !== 0){
      return;
    }
    const keys = Object.keys(data)
    const placeholders = keys.map(() => "(?, ?)").join(", ");
    const values = Array.from(keys, (tag, index) => [index+1, tag])
                        .flatMap(([id, description]) => [id, description]);
    expoDb.runSync(
      `INSERT OR IGNORE INTO ${table_name} VALUES ${placeholders}`,
      values
    );
    console.info(`${table_name} populada!`)
  }
  try {
    populate_table("tag", tags_available);
    populate_table("recurrence_type", recurrence_types_available);
    populate_table("transfer_method", transfer_methods_available);
  } catch (error) {
    console.error(error)
  }
}