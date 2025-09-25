import InstallmentPaymentApi from "data/api/payment/installment.api"
import InstallmentReceiptApi from "data/api/receipt/installment.api"
import { InstallmentScreenInsert, Kind } from "../types"

// Parcelados
export const installmentStrategies: Record<
  Kind,
  {
    insert: (data: InstallmentScreenInsert) => void
    fetchById: (id: string) => Promise<InstallmentScreenInsert | undefined>
  }
> = {
  payment: {
    insert: async (data) => {
      const result = await InstallmentPaymentApi.register({
        description: data.description,
        startDate: data.startDate,
        installments: Number(data.installments),
        totalAmount: Number(data.amountValue),
        tagSelected: data.tagSelected,
        transferMethodId: data.transferMethodSelected.id
      })
      console.log(result?.properties)
    },
    fetchById: async (id) => {
      return await InstallmentPaymentApi.find_by_id({ id: Number(id) })
    }
  },
  receipt: {
    insert: async (data) => {
      const result = await InstallmentReceiptApi.register({
        description: data.description,
        startDate: data.startDate,
        installments: Number(data.installments),
        totalAmount: Number(data.amountValue),
        tagSelected: data.tagSelected,
        transferMethodId: data.transferMethodSelected.id
      })
      console.log(result?.properties)
    },
    fetchById: async (id) => {
      return await InstallmentReceiptApi.find_by_id({ id: Number(id) })
    }
  }
}