import { BankAccount } from "@core/entities/bank_account.entity";
import { BankAccountTransferMethod } from "@src/core/entities/bank_account_transfer_method.entity";
import { MBankAccountTransferMethod } from "@src/core/models/bank_account_transfer_method.model";
import { BankAccountNotFoundById, isBankAccountNotFoundById } from "@src/core/shared/errors/bank_account";
import { BankAccountTransferMethodNotFoundById, BankAccountTransferMethodUnknownError } from "@src/core/shared/errors/bank_account_transfer_method";
import { IRepository, IRepositoryCreateProps, IRepositoryUpdateProps } from "@src/core/shared/IRepository";
import { db } from "@src/infrastructure/database/drizzle/client";
import { bank_account_transfer_method } from "@src/infrastructure/database/drizzle/schemas";
import { eq } from "drizzle-orm/sql";

type MBankAccountTransferMethodWithoutDate = StrictOmit<MBankAccountTransferMethod, "created_at" | "updated_at">

interface MBankAccountTransferMethodOutput extends MBankAccountTransferMethodWithoutDate {
  created_at: string;
  updated_at: string;
}

export interface IRepoBankAccountTransferMethod extends IRepository<MBankAccountTransferMethod, BankAccountTransferMethod> {
  /**
   * @param {IRepositoryCreateProps<MBankAccountTransferMethod>} data Atributos que são passados para a criação de uma nova Bank Account Transfer Method
   * @returns {BankAccount} Retorna objeto que representa a entidade Bank Account Transfer Method que contém os dados informados para criação
   */
  create(data: IRepositoryCreateProps<MBankAccountTransferMethod>): BankAccountTransferMethod;
  
  /**
   * @param {MBankAccountTransferMethod["id"]} id id pelo qual a bank account transfer method será buscada
   * @throws {BankAccountTransferMethodNotFoundById}
   * @returns {BankAccountTransferMethod} Retorna objeto que representa a entidade BankAccountTransferMethod que contém o id informado
   */
  findById(id: MBankAccountTransferMethod["id"]): BankAccountTransferMethod;

  /**
   * Finds a bank account transfer method by bank account ID and type
   * @param {BankAccount["id"]} bank_account_id The ID of the bank account
   * @throws {BankAccountTransferMethodNotFoundById} Throws an error if no matching transfer method is found
   * @returns {BankAccountTransferMethod} The bank account transfer method matching the given bank account ID and type
   */
  findByBankAccountId(bank_account_id: BankAccount["id"]): BankAccountTransferMethod[];

  /**
   * Retrieves all bank account transfer methods with their associated bank accounts
   * @returns {BankAccountTransferMethod[]} An array of bank account transfer method entities with populated bank account details
   */
  findAll(): BankAccountTransferMethod[];

  /**
   * Updates a bank account transfer method by its ID
   * @param {BankAccountTransferMethod["id"]} id - The unique identifier of the bank account transfer method to update
   * @param {IRepositoryUpdateProps<MBankAccountTransferMethod>} data - The data to update the bank account transfer method with
   * @returns {BankAccountTransferMethod} The updated bank account transfer method
   */
  update(id: BankAccountTransferMethod["id"], data: IRepositoryUpdateProps<MBankAccountTransferMethod>): BankAccountTransferMethod;

  /**
   * Deletes a bank account transfer method by its ID
   * @param {BankAccountTransferMethod["id"]} id - The unique identifier of the bank account transfer method to delete
   * @returns {boolean} Indicates whether the deletion was successful
   */
  delete(id: BankAccountTransferMethod["id"]): boolean;
}

export default class BankAccountTransferMethodDrizzleRepository implements IRepoBankAccountTransferMethod {
  // eslint-disable-next-line jsdoc/require-jsdoc
  private formatOutput(output: MBankAccountTransferMethodOutput): MBankAccountTransferMethod {
    return {
      ...output,
      created_at: new Date(output.created_at),
      updated_at: new Date(output.updated_at)
    }
  }
  
  // eslint-disable-next-line jsdoc/require-jsdoc
  public create(data: IRepositoryCreateProps<MBankAccountTransferMethod>): BankAccountTransferMethod {   
    const result = db.insert(bank_account_transfer_method).values(data).returning().get()
    return this.findById(result.id);
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findById(id: MBankAccountTransferMethod["id"]): BankAccountTransferMethod {
    const result = db.query.bank_account_transfer_method.findFirst({
      where: eq(bank_account_transfer_method.id, id),
      with: {
        bank_account: true
      }
    }).sync()
    if(!result) throw new BankAccountTransferMethodNotFoundById(id);

    const {
      bank_account,
      ...bank_account_transfer_method_searched
    } = result

    return new BankAccountTransferMethod({
      ...this.formatOutput(bank_account_transfer_method_searched),
      bank_account: new BankAccount({
        ...bank_account,
        created_at: new Date(bank_account.created_at),
        updated_at: new Date(bank_account.updated_at),
      })
    })
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findByBankAccountId(bank_account_id: BankAccount["id"]): BankAccountTransferMethod[] {
    try{
      const bankId_transfers = db.query.bank_account_transfer_method.findMany({
        where: eq(bank_account_transfer_method.fk_id_bank_account, bank_account_id),
        with: {
          bank_account: true
        }
      }).sync()

      if(bankId_transfers.length === 0){
        throw new BankAccountNotFoundById(bank_account_id);
      }

      return bankId_transfers.map(value => {
        const {
          fk_id_bank_account,
          ...value_formated
        } = {
          ...value,
          bank_account: new BankAccount({
            ...value.bank_account,
            created_at: new Date(value.bank_account.created_at),
            updated_at: new Date(value.bank_account.updated_at)
          }),
          created_at: new Date(value.created_at),
          updated_at: new Date(value.updated_at)
        }
        return new BankAccountTransferMethod(value_formated)
      })
    } catch(error) {
      if(isBankAccountNotFoundById(error)){
        throw error;
      }
      throw new BankAccountTransferMethodUnknownError()
    }
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findAll(): BankAccountTransferMethod[] {
    const results = db.query.bank_account_transfer_method.findMany({
      with: {
        bank_account: true
      }
    }).sync()
    return results
      .map(ba_tm => {
        const {
          bank_account,
          ...bank_account_transfer_method_searched
        } = ba_tm
    
        return new BankAccountTransferMethod({
          ...this.formatOutput(bank_account_transfer_method_searched),
          bank_account: new BankAccount({
            ...bank_account,
            created_at: new Date(bank_account.created_at),
            updated_at: new Date(bank_account.updated_at),
          })
        })
      })
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public update(id: BankAccountTransferMethod["id"], data: IRepositoryUpdateProps<MBankAccountTransferMethod>): BankAccountTransferMethod {    
    db.update(bank_account_transfer_method).set(data).where(eq(bank_account_transfer_method.id, id)).returning().get()
    return this.findById(id)
  }
  
  // eslint-disable-next-line jsdoc/require-jsdoc
  public delete(id: BankAccountTransferMethod["id"]): boolean {
    const result = db.delete(bank_account_transfer_method).where(eq(bank_account_transfer_method.id, id)).returning().get()
    return !result ? false : true;
  }
}