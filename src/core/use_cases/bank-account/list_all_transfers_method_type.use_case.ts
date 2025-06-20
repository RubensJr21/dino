import IUseCase from "@core/shared/IUseCase";
import { BankAccountTransferMethod, IBankAccountTransferMethod } from "@src/core/entities/bank_account_transfer_method.entity";
import { BankAccountUnknownError, isBankAccountNotFoundById } from "@src/core/shared/errors/bank_account";
import { IRepoBankAccountTransferMethod } from "@src/infrastructure/repositories/bank_account_transfer_method.repository";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface BankAccount_ListAllTransfersMethodTypeInput extends Pick<IBankAccountTransferMethod, "id"> {}

export default class ListAllTransfersMethodTypeBankAccount implements IUseCase<BankAccount_ListAllTransfersMethodTypeInput, BankAccountTransferMethod[]> {
  /**
   * @param {IRepoBankAccountTransferMethod} repo_ba_tm Interface do repositório de BankAccountTransferMethod
   */
  constructor(
    private repo_ba_tm: IRepoBankAccountTransferMethod
  ){}
  /**
   * @param {BankAccount_ListAllTransfersMethodTypeInput} input objeto contém o id da conta bancária usada para filtrar os métodos de transferência pertencentes a conta bancária
   * @throws {BankAccountNotFoundById}
   * @throws {BankAccountUnknownError}
   * @returns {Promise<BankAccountTransferMethod[]>} retorna uma promise com uma lista de objetos que representam a entidade BankAccountTransferMethod
   */
  async execute(input: BankAccount_ListAllTransfersMethodTypeInput): Promise<BankAccountTransferMethod[]> {
    try {
      const transfers_method_type = this.repo_ba_tm.findByBankAccountId(input.id)
      return transfers_method_type
    } catch (error) {
      if(isBankAccountNotFoundById(error)){
        throw error;
      }
      console.log("Algum erro aconteceu!")
      console.error(error)
      throw new BankAccountUnknownError()
    }
  }
}