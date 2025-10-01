import { amountParseToNumber, amountParseToString } from "@components/ui/AmountInput";
import { find_installment } from "@data/playground/installment/find";
import { insert_installment } from "@data/playground/installment/insert";
import { update_installment } from "@data/playground/installment/update";
import { getCashflowType, InstallmentScreenInsert, InstallmentScreenUpdate, Kind } from "../types";

export async function sharedInsert(data: InstallmentScreenInsert, kind: Kind) {
  return await insert_installment({
    description: data.description,
    cashflow_type: getCashflowType(kind),
    category_id: data.category.id,
    transaction_instrument_id: data.transactionInstrument.id,
    transfer_method_code: data.transactionInstrument.transfer_method_code,
    start_date: data.startDate,
    installments_number: Number(data.installments),
    total_amount: amountParseToNumber(data.amountValue)
  })
}
export async function sharedFetch(id: string): Promise<InstallmentScreenInsert | undefined> {
  const installment_founded = await find_installment(Number(id))
  if (installment_founded === undefined) {
    return undefined;
  }
  return {
    description: installment_founded.description,
    category: {
      id: installment_founded.category_id,
      code: installment_founded.category_code
    },
    transactionInstrument: {
      id: installment_founded.transaction_instrument_id,
      nickname: installment_founded.transaction_instrument_nickname,
      transfer_method_code: installment_founded.transfer_method_code
    },
    amountValue: amountParseToString(installment_founded.total_amount),
    startDate: installment_founded.start_date,
    installments: installment_founded.installments_number.toFixed(0)
  }
}

export async function sharedUpdate(id: string, data: InstallmentScreenUpdate): Promise<undefined> {
  await update_installment(Number(id), {
    description: data.description,
    category: data.category?.code,
  })
}

// Parcelados
export const installmentStrategies: Record<
  Kind,
  {
    insert: (data: InstallmentScreenInsert) => Promise<void>
    fetchById: (id: string) => Promise<InstallmentScreenInsert | undefined>
    update: (id: string, data: InstallmentScreenUpdate) => Promise<undefined>
  }
> = {
  payment: {
    insert: async (data) => await sharedInsert(data, "payment"),
    fetchById: async (id) => await sharedFetch(id),
    update: async (id, data) => await sharedUpdate(id, data)
  },
  receipt: {
    insert: async (data) => await sharedInsert(data, "receipt"),
    fetchById: async (id) => await sharedFetch(id),
    update: async (id, data) => await sharedUpdate(id, data)
  }
}