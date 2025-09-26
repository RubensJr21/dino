import { find_recurring } from "@data/playground/recurring/find";
import { insert_recurring } from "@data/playground/recurring/insert";
import { update_recurring } from "@data/playground/recurring/update";
import { getCashflowType, Kind, RecurringScreenEdit, RecurringScreenInsert } from "../types";

export async function sharedInsert(data: RecurringScreenInsert, kind: Kind) {
  return await insert_recurring({
    description: data.description,
    cashflow_type: getCashflowType(kind),
    category_id: data.category.id,
    amount: Number(data.amountValue),
    transaction_instrument_id: data.transactionInstrument.id,
    transfer_method_code: data.transactionInstrument.transfer_method_code,
    recurrence_type_id: data.recurrenceType.id,
    start_date: data.startDate
  })
}
export async function sharedFetch(id: string): Promise<RecurringScreenInsert | undefined> {
  const recurring_founded = await find_recurring(Number(id))
  if (recurring_founded === undefined) {
    return undefined;
  }
  return {
    description: recurring_founded.description,
    category: {
      id: recurring_founded.category_id,
      code: recurring_founded.category_code
    },
    transactionInstrument: {
      id: recurring_founded.transaction_instrument_id,
      nickname: recurring_founded.transaction_instrument_nickname,
      transfer_method_code: recurring_founded.transfer_method_code
    },
    amountValue: recurring_founded.current_amount.toFixed(2),
    recurrenceType: {
      id: recurring_founded.recurrence_type_id,
      code: recurring_founded.recurrence_type_code
    },
    startDate: recurring_founded.start_date,
    endDate: recurring_founded.end_date
  }
}

export async function sharedUpdate(id: string, data: RecurringScreenEdit): Promise<undefined> {
  await update_recurring(Number(id), {
    description: data.description,
    category: data.category?.code,
  })
}

export const recurringStrategies: Record<
  Kind,
  {
    insert: (data: RecurringScreenInsert) => void
    fetchById: (id: string) => Promise<RecurringScreenInsert | undefined>
    update: (id: string, data: RecurringScreenEdit) => Promise<undefined>
  }
> = {
  payment: {
    insert: async (data) => sharedInsert(data, "payment"),
    fetchById: async (id) => sharedFetch(id),
    update: async (id, data) => await sharedUpdate(id, data)
  },
  receipt: {
    insert: async (data) => sharedInsert(data, "receipt"),
    fetchById: async (id) => sharedFetch(id),
    update: async (id, data) => await sharedUpdate(id, data)
  }
}