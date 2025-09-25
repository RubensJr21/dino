import { find_installment } from "@data/playground/installment/find";
import { insert_installment } from "@data/playground/installment/insert";
import { getCashflowType, InstallmentScreenInsert, Kind } from "../types";

export async function sharedInsert(data: InstallmentScreenInsert, kind: Kind) {
  return await insert_installment({
    description: data.description,
    cashflow_type: getCashflowType(kind),
    category_id: data.category.id,
    transaction_instrument_id: data.transactionInstrument.id,
    transfer_method_code: data.transactionInstrument.transfer_method_code,
    start_date: data.startDate,
    installments_number: Number(data.installments),
    total_amount: Number(data.amountValue)
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
    amountValue: installment_founded.total_amount.toFixed(2),
    startDate: installment_founded.start_date,
    installments: installment_founded.installments_number.toFixed(0)
  }
}

// Parcelados
export const installmentStrategies: Record<
  Kind,
  {
    insert: (data: InstallmentScreenInsert) => void
    fetchById: (id: string) => Promise<InstallmentScreenInsert | undefined>
  }
> = {
  payment: {
    insert: async (data) => sharedInsert(data, "payment"),
    fetchById: async (id) => sharedFetch(id)
  },
  receipt: {
    insert: async (data) => sharedInsert(data, "receipt"),
    fetchById: async (id) => sharedFetch(id)
  }
}