import { BankAccount } from "@src/core/entities/bank_account.entity";
import IUseCase from "@src/core/shared/IUseCase";
import { Result } from "@src/core/shared/types/Result";
import { TypeOfTransferMethods } from "@src/core/shared/types/transfer_methods";

interface Input {
  method: TypeOfTransferMethods
  value: boolean
}

type UseCaseInterface = IUseCase<Input, BankAccount>

export default class AddTypeOfBankTransfer implements UseCaseInterface {
  async execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
      return {} as Result<BankAccount>
  }
}