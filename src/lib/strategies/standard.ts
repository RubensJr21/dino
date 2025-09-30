import { amountParse } from "@components/ui/AmountInput"
import { find_standard } from "@data/playground/standard/find"
import { insert_standard } from "@data/playground/standard/insert"
import { list_all_standards } from "@data/playground/standard/list_all"
import { update_standard } from "@data/playground/standard/update"
import { getRealAmountValue } from "@data/playground/utils"
import { getCashflowType, Kind, StandardScreenInsert, StandardScreenUpdate } from "../types"

export async function sharedListAll(kind: Kind) {
  return await list_all_standards(getCashflowType(kind)).then(standards => 
    standards.map((standard) => ({
      id: standard.id,
      description: standard.description,
      amountValue: standard.amount.toFixed(2),
      wasProcessed: standard.was_processed,
      category: {
        id: standard.category_id,
        code: standard.category_code
      },
      transactionInstrument: {
        id: standard.transaction_instrument_id,
        nickname: standard.transaction_instrument_nickname,
        transfer_method_code: standard.transfer_method_code
      },
      scheduledAt: standard.scheduled_at,
    }))
  )
}

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
    amountValue: standard_founded.amount.toFixed(2),
    scheduledAt: standard_founded.scheduled_at,
    transactionInstrument: {
      id: standard_founded.transaction_instrument_id,
      nickname: standard_founded.transaction_instrument_nickname,
      transfer_method_code: standard_founded.transfer_method_code
    },
  }
}

export async function sharedUpdate(id: string, data: StandardScreenUpdate, kind: Kind): Promise<undefined> {
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
    list_all: () => ReturnType<typeof sharedListAll>
    insert: (data: StandardScreenInsert) => Promise<number>
    fetchById: (id: string) => Promise<StandardScreenInsert | undefined>
    update: (id: string, data: StandardScreenUpdate) => Promise<undefined>
  }
> = {
  payment: {
    list_all: async () => await sharedListAll("payment"),
    insert: async (data) => await sharedInsert(data, "payment"),
    fetchById: async (id) => await sharedFetch(id),
    update: async (id, data) => await sharedUpdate(id, data, "payment")
  },
  receipt: {
    list_all: async () => await sharedListAll("receipt"),
    insert: async (data) => await sharedInsert(data, "receipt"),
    fetchById: async (id) => await sharedFetch(id),
    update: async (id, data) => await sharedUpdate(id, data, "receipt")
  }
}