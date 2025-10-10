import { amountParseToNumber, amountParseToString } from "@components/ui/AmountInput";
import { find_installment } from "@data/playground/installment/find";
import { insert_installment } from "@data/playground/installment/insert";
import { list_all_installments } from "@data/playground/installment/list_all";
import { update_installment } from "@data/playground/installment/update";
import { getCashflowType, InstallmentScreenInsert, InstallmentScreenUpdate, Kind } from "../types";

type InstallmentReturn = NonNullable<Awaited<ReturnType<typeof find_installment>>>

export function mapperInstallment(installment: InstallmentReturn) {
  return {
    id: installment.id,
    description: installment.description,
    category: {
      id: installment.category_id,
      code: installment.category_code
    },
    amountValue: amountParseToString(installment.total_amount),
    transactionInstrument: {
      id: installment.transaction_instrument_id,
      nickname: installment.transaction_instrument_nickname,
      transfer_method_code: installment.transfer_method_code,
      bank_nickname: installment.bank_nickname
    },
    startDate: installment.start_date,
    installments: installment.installments_number.toFixed(0)
  }
}

export async function sharedListAll(kind: Kind) {
  return await list_all_installments(getCashflowType(kind)).then(installments =>
    installments.map(mapperInstallment)
  )
}

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
      transfer_method_code: installment_founded.transfer_method_code,
      bank_nickname: installment_founded.bank_nickname
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
    list_all: () => ReturnType<typeof sharedListAll>
    insert: (data: InstallmentScreenInsert) => Promise<void>
    fetchById: (id: string) => Promise<InstallmentScreenInsert | undefined>
    update: (id: string, data: InstallmentScreenUpdate) => Promise<undefined>
  }
> = {
  payment: {
    list_all: async () => await sharedListAll("payment"),
    insert: async (data) => await sharedInsert(data, "payment"),
    fetchById: async (id) => await sharedFetch(id),
    update: async (id, data) => await sharedUpdate(id, data)
  },
  receipt: {
    list_all: async () => await sharedListAll("receipt"),
    insert: async (data) => await sharedInsert(data, "receipt"),
    fetchById: async (id) => await sharedFetch(id),
    update: async (id, data) => await sharedUpdate(id, data)
  }
}