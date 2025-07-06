/* eslint-disable jsdoc/require-jsdoc */

// REVIEW: Na inicialização preciso:
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
} as const satisfies TagsAvailableType

export type TagsAvailable = (keyof typeof tags_available)

// ATTENTION: Essas são os métodos de transferência disponíveis:
export const transfer_methods_available = [
  'Pix',
  'Débito',
  'Transferência Bancária'
]

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
} as const satisfies RecurrencesAvailableType

export type RecurrencesAvailable = (keyof typeof recurrence_types_available)