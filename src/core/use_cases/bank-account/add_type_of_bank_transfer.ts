import { BankAccount } from "@src/core/entities/bank_account.entity";
import { IRepoBankAccount } from "@src/core/shared/interfaces/IRepoBankAccount";
import IUseCase from "@src/core/shared/IUseCase_v2";
import { RepoInterfaceNames } from "@src/core/shared/types/RepoInterfaceNames";
import { TypeOfTransferMethods } from "@src/core/shared/types/transfer_methods";
import { UnionRepoInterfaces } from "@src/core/shared/types/UnionRepoInterfaces";
import { UnionRepoInterfacesNames } from "@src/core/shared/types/UnionRepoInterfacesNames";
import { UseCaseResult } from "@src/core/shared/types/UseCaseResult";

interface Input {
  method: TypeOfTransferMethods
  value: boolean
}

type UsedRepoInterfaces = UnionRepoInterfaces<[
  IRepoBankAccount
]>;

type UsedRepoInterfaceNames = UnionRepoInterfacesNames<[
  RepoInterfaceNames.BankAccount
]>;

type Return = UseCaseResult<
  "AddTypeOfBankTransfer",
  BankAccount,
  UsedRepoInterfaces,
  UsedRepoInterfaceNames
>

type UseCaseInterface = IUseCase<Input, Return>

export default class AddTypeOfBankTransfer implements UseCaseInterface {
  async execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
      return {} as Return
  }
}