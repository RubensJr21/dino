import IUseCase from "@core/shared/IUseCase";
import { BankAccountTransferMethod } from "@src/core/entities/bank_account_transfer_method.entity";
import IEntityBase from "@src/core/shared/interfaces/IEntityBase";
import { IRepoBankAccountTransferMethod } from "@src/core/shared/interfaces/IRepoBankAccountTransferMethod";

interface Input {
  id: IEntityBase["id"]
}

type UseCaseInterface = IUseCase<Input, BankAccountTransferMethod[]>

export default class ListAllTransfersMethodTypeBankAccount implements UseCaseInterface {
  constructor(
    private repo_ba_tm: IRepoBankAccountTransferMethod
  ) { }
  async execute({ id }: Input): ReturnType<UseCaseInterface["execute"]> {
    const result = this.repo_ba_tm.findAllOfBankAccount(id)

    if(!result.success){
      return {
        success: false,
        error: {
          ...result.error,
          scope: `ListAllTransfersMethodTypeBankAccount > ${result.error.scope}`
        }
      }
    }

    return {
      success: true,
      data: result.data
    }
  }
}