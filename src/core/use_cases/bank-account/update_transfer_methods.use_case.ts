import { BankAccount } from "@core/entities/bank_account.entity";
import IUseCase from "@core/shared/IUseCase";
import { IBankAccountTransferMethod } from "@src/core/entities/bank_account_transfer_method.entity";
import { IRepoBankAccount } from "@src/core/shared/interfaces/IRepoBankAccount";
import { IRepoBankAccountTransferMethod } from "@src/core/shared/interfaces/IRepoBankAccountTransferMethod";
import { TypeOfTransferMethods } from "@src/core/shared/types/transfer_methods";

interface Input extends Pick<IBankAccountTransferMethod, "id"> {
  type_of_bank_transfers: Record<TypeOfTransferMethods, boolean>
}

type UseCaseInterface = IUseCase<Input, BankAccount>

export default class UpdateTransferMethodsBankAccount implements UseCaseInterface {
  constructor(
    private repo_ba: IRepoBankAccount,
    private repo_ba_tm: IRepoBankAccountTransferMethod
  ) { }
  async execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result_transfer_methods_all = this.repo_ba_tm.findAllOfBankAccount(input.id)

    if(!result_transfer_methods_all.success){
      const scope = `UpdateTransferMethodsBankAccount(${this.repo_ba_tm.findAllOfBankAccount.name}) > ${result_transfer_methods_all.error.scope}`
      return {
        success: false,
        error: {
          ...result_transfer_methods_all.error,
          scope
        }
      }
    }

    const transfer_methods_data = result_transfer_methods_all.data

    for (const { id, bank_account, transfer_method } of transfer_methods_data) {
      const bk_tm_updated = this.repo_ba_tm.update(
          id,
          {
            fk_id_bank_account: bank_account.id,
            fk_id_transfer_method: transfer_method.id,
            is_disabled: input.type_of_bank_transfers[transfer_method.method]
          }
        )
        if(!bk_tm_updated.success){
          const scope = `UpdateTransferMethodsBankAccount(${this.repo_ba_tm.update.name}) > ${bk_tm_updated.error.scope}`
          return {
            success: false,
            error: {
              ...bk_tm_updated.error,
              scope
            }
          }
        }
    }

    const bank_account = this.repo_ba.findById(input.id)

    return bank_account
  }
}