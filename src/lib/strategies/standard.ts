import { amountParse } from "@components/ui/AmountInput"
import { find_standard } from "@data/playground/standard/find"
import { insert_standard } from "@data/playground/standard/insert"
import { update_standard } from "@data/playground/standard/update"
import { getRealAmountValue } from "@data/playground/utils"
import { getCashflowType, Kind, StandardScreenEdit, StandardScreenInsert } from "../types"

export async function sharedInsert(data: StandardScreenInsert, kind: Kind) {
  return await insert_standard({
    description: data.description,
    cashflow_type: getCashflowType(kind),
    category_id: data.category.id,
    amount: amountParse(data.amountValue),
    scheduled_at: data.scheduledAt,
    transaction_instrument_id: data.transactionInstrument.id,
    transfer_method_code: data.transactionInstrument.transfer_method_code
  })
}
export async function sharedFetch(id: string): Promise<StandardScreenInsert | undefined> {
  const standard_founded = await find_standard(Number(id))
  if (standard_founded === undefined) {
    return undefined;
  }
  return {
    description: standard_founded.description,
    category: {
      id: standard_founded.category_id,
      code: standard_founded.category_code
    },
    amountValue: String(standard_founded.amount),
    scheduledAt: standard_founded.scheduled_at,
    transactionInstrument: {
      id: standard_founded.transaction_instrument_id,
      nickname: standard_founded.transaction_instrument_nickname,
      transfer_method_code: standard_founded.transfer_method_code
    },
  }
}

export async function sharedUpdate(id: string, data: StandardScreenEdit, kind: Kind): Promise<undefined> {
  const amount = data.amountValue === undefined
    ? undefined
    : getRealAmountValue(getCashflowType(kind), Number(data.amountValue))
  await update_standard(Number(id), {
    description: data.description,
    category: data.category?.code,
    amount
  })
}

export const standardStrategies: Record<
  Kind,
  {
    insert: (data: StandardScreenInsert) => Promise<number>
    fetchById: (id: string) => Promise<StandardScreenInsert | undefined>
    update: (id: string, data: StandardScreenEdit) => Promise<undefined>
  }
> = {
  payment: {
    insert: async (data) => await sharedInsert(data, "payment"),
    fetchById: async (id) => await sharedFetch(id),
    update: async (id, data) => await sharedUpdate(id, data, "payment")
  },
  receipt: {
    insert: async (data) => await sharedInsert(data, "receipt"),
    fetchById: async (id) => await sharedFetch(id),
    update: async (id, data) => await sharedUpdate(id, data, "receipt")
  }
}