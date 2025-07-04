/* eslint-disable jsdoc/require-jsdoc */

// TODO: Na inicialização preciso:
/**
 * 1. Tentar registrar
 * 2. Pode dar um erro da clausula de unique
 */
const tags = [
  'Educação',
  'Saúde',
  'Lazer',
  'Alimentação',
  'Moradia',
  'Transporte',
  'Serviços',
  'Compras',
  'Impostos/Taxas',
  'Outros'
]

// ATTENTION: Essas são os métodos de transferência disponíveis:
const transfer_methods_available = [
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
    displayText: "mensalmente",
    calculation_method: (date: Date): boolean => (
      new Date().getMonth() !== date.getMonth()
    )
  },
  annually: {
    displayText: "anualmente",
    calculation_method: (date: Date): boolean => (
      new Date().getFullYear() !== date.getFullYear()
    )
  },
} as const satisfies RecurrencesAvailableType

export type RecurrencesAvailable = (keyof typeof recurrence_types_available)