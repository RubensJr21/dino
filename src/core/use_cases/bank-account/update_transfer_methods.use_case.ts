import { BankAccount } from "@core/entities/bank_account.entity";
import IUseCase from "@core/shared/IUseCase";
import { IBankAccountTransferMethod } from "@src/core/entities/bank_account_transfer_method.entity";
import { BankAccountUnknownError, isBankAccountNotFoundById } from "@src/core/shared/errors/bank_account";
import { IRepoBankAccount } from "@src/infrastructure/repositories/drizzle/bank_account.repository";
import { IRepoBankAccountTransferMethod } from "@src/infrastructure/repositories/drizzle/bank_account_transfer_method.repository";

interface BankAccount_UpdateTransferMethodsInput extends Pick<IBankAccountTransferMethod, "id"> {
  type_of_bank_transfers: {
    "Pix": boolean,
    "Débito": boolean,
    "Transferência Bancária": boolean
  }
}

export default class UpdateTransferMethodsBankAccount implements IUseCase<BankAccount_UpdateTransferMethodsInput, BankAccount> {
  /**
   * @param {IRepoBankAccount} repo_ba Interface do repositório de BankAccount
   * @param {IRepoBankAccountTransferMethod} repo_ba_tm Interface do repositório de BankAccountTransferMethod
   */
  constructor(
    private repo_ba: IRepoBankAccount,
    private repo_ba_tm: IRepoBankAccountTransferMethod
  ){}
  /**
   * @param {BankAccount_UpdateTransferMethodsInput} input objeto contém o valores que serão usado para criar um novo BankAccount
   * @throws {BankAccountNotFoundById}
   * @throws {BankAccountUnknownError}
   * @returns {Promise<BankAccount>} retorna uma promise com um objeto que representa a entidade BankAccount
   */
  async execute(input: BankAccount_UpdateTransferMethodsInput): Promise<BankAccount> {
    try {
      const transfers_method_type = this.repo_ba_tm.findByBankAccountId(input.id)

      Object.entries(input.type_of_bank_transfers).forEach(([key, value]) => {
        const bk_tm = transfers_method_type.find(bk_tm => {
          return bk_tm.type == key
        })
        if(bk_tm){
          this.repo_ba_tm.update(
            bk_tm.id,
            {
              fk_id_bank_account: bk_tm.bank_account.id,
              is_enable: value,
              type: key
            }
          )
        }
      })

      const bank_account = this.repo_ba.findById(input.id)

      return bank_account
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