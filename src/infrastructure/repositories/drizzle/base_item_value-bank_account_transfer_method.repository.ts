import { BankAccountTransferMethod } from "@core/entities/bank_account_transfer_method.entity";
import { BankAccount } from "@src/core/entities/bank_account.entity";
import { BaseItemValue_BankAccountTransferMethod } from "@src/core/entities/base_item_value-bank_account_transfer_method.entity";
import { IBaseItemValue } from "@src/core/entities/base_item_value.entity";
import { BankAccountTransferMethodNotFoundById } from "@src/core/shared/errors/bank_account_transfer_method";
import { IRepositoryWithoutDates, IRepositoryWithoutDatesCreateProps, IRepositoryWithoutDatesUpdateProps } from "@src/core/shared/IRepositoryWithoutDates";
import { db } from "@src/infrastructure/database/drizzle/client";
import { base_item_value_pivot_bank_account_transfer_method as base_item_pivot_bk_transfer_method } from "@src/infrastructure/database/drizzle/schemas";
import { MBaseItemValue_BankAccountTransferMethod } from "@src/infrastructure/models/base_item_value-bank_account_transfer_method.model";
import { MBaseItemValue } from "@src/infrastructure/models/base_item_value.model";
import { eq } from "drizzle-orm/sql";

export interface IRepoBaseItemValue_BankAccountTransferMethod<T extends MBaseItemValue, U extends IBaseItemValue> extends IRepositoryWithoutDates<MBaseItemValue_BankAccountTransferMethod<T>, BaseItemValue_BankAccountTransferMethod<U>>{
  /**
   * Creates a new BaseItemValue_BankAccountTransferMethod record in the database
   * @param {IRepositoryWithoutDatesCreateProps<MBaseItemValue_BankAccountTransferMethod<T>>} data - The data for creating the new record
   * @returns {BaseItemValue_BankAccountTransferMethod<U>} The newly created BaseItemValue_BankAccountTransferMethod record with full details
   */
  create(
    data: IRepositoryWithoutDatesCreateProps<MBaseItemValue_BankAccountTransferMethod<T>>
  ): BaseItemValue_BankAccountTransferMethod<U>;
  
  /**
   * Retrieves a BaseItemValue_BankAccountTransferMethod record by its unique identifier
   * @param {MBaseItemValue_BankAccountTransferMethod<T>["id"]} id - The unique identifier of the BaseItemValue_BankAccountTransferMethod record
   * @returns {BaseItemValue_BankAccountTransferMethod<U>} A BaseItemValue_BankAccountTransferMethod record with full details including related bank account transfer method and base item value
   * @throws {BankAccountTransferMethodNotFoundById} Throws an error if no record is found with the given ID
   */
  findById(id: MBaseItemValue_BankAccountTransferMethod<T>["id"]): BaseItemValue_BankAccountTransferMethod<U>;

  /**
   * Retrieves a BaseItemValue_BankAccountTransferMethod record by its base item value ID and bank account transfer method
   * @param {T["fk_id_base_item_value"]} fk_id_base_item - The unique identifier of the base item value
   * @param {BankAccountTransferMethod} ba_transfer_method - The bank account transfer method to search for
   * @returns {BaseItemValue_BankAccountTransferMethod<U>} A BaseItemValue_BankAccountTransferMethod record matching the given base item value and transfer method
   */
  findByBaseItemValueAndBankTransferMethod(
    fk_id_base_item: T["fk_id_base_item_value"],
    ba_transfer_method: BankAccountTransferMethod
  ): BaseItemValue_BankAccountTransferMethod<U>;

  /**
   * Retrieves all BaseItemValue_BankAccountTransferMethod records with their related bank account transfer methods and base item values
   * @returns {BaseItemValue_BankAccountTransferMethod<U>[]} An array of BaseItemValue_BankAccountTransferMethod records with nested relationships
   */
  findAll(): BaseItemValue_BankAccountTransferMethod<U>[];

  /**
   * Updates a BaseItemValue_BankAccountTransferMethod record by its ID
   * @param {MBaseItemValue_BankAccountTransferMethod<T>["id"]} id The unique identifier of the record to be updated
   * @param {IRepositoryWithoutDatesUpdateProps<MBaseItemValue_BankAccountTransferMethod<T>>} data The updated data for the record
   * @returns {BaseItemValue_BankAccountTransferMethod<U>} The updated BaseItemValue_BankAccountTransferMethod record
   */
  update(
    id: MBaseItemValue_BankAccountTransferMethod<T>["id"],
    data: IRepositoryWithoutDatesUpdateProps<MBaseItemValue_BankAccountTransferMethod<T>>
  ): BaseItemValue_BankAccountTransferMethod<U>;

  /**
   * Deletes a BaseItemValue_BankAccountTransferMethod record by its ID
   * @param {MBaseItemValue_BankAccountTransferMethod<T>["id"]} id The unique identifier of the record to be deleted
   * @returns {boolean} A boolean indicating whether the deletion was successful
   */
  delete(id: MBaseItemValue_BankAccountTransferMethod<T>["id"]): boolean;
}

export default class BaseItemValue_BankAccountTransferMethodDrizzleRepository<T extends MBaseItemValue, U extends IBaseItemValue> implements IRepoBaseItemValue_BankAccountTransferMethod<T, U> {  
  /**
   * @param {Function} parseToTypeItemValue função para parsear valor inserido em base_item_value
   */
  constructor(
    private parseToTypeItemValue: <T>(param: T) => U
  ){}
  
  // eslint-disable-next-line jsdoc/require-jsdoc
  public create(data: IRepositoryWithoutDatesCreateProps<MBaseItemValue_BankAccountTransferMethod<T>>): BaseItemValue_BankAccountTransferMethod<U> {   
    const result = db.insert(base_item_pivot_bk_transfer_method).values(data).returning().get()
    return this.findById(result.id)
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findById(id: MBaseItemValue_BankAccountTransferMethod<T>["id"]): BaseItemValue_BankAccountTransferMethod<U> {
    const result = db.query.base_item_value_pivot_bank_account_transfer_method.findFirst({
      where: eq(base_item_pivot_bk_transfer_method.id, id),
      with: {
        bank_account_transfer_method: {
          with: {
            bank_account: true,
          }
        },
        base_item_value: {
          with: {
            tag: true,
            transfer_method_type: true
          }
        }
      }
    }).sync()

    if(!result) throw new BankAccountTransferMethodNotFoundById(id);
    
    const {
      bank_account_transfer_method,
      fk_id_bank_account_transfer_method,
      base_item_value,
    } = result
    
    return new BaseItemValue_BankAccountTransferMethod<U>({
      id: result.id,
      base_item_value: this.parseToTypeItemValue(base_item_value),
      bank_account_transfer_method: new BankAccountTransferMethod({
        id: fk_id_bank_account_transfer_method,
        type: bank_account_transfer_method.type,
        is_enable: bank_account_transfer_method.is_enable,
        bank_account: (({created_at, updated_at, ...rest}) => {
          return new BankAccount({
            ...rest,
            created_at: new Date(created_at),
            updated_at: new Date(updated_at),
          })
        })(bank_account_transfer_method.bank_account),
        created_at: new Date(bank_account_transfer_method.created_at),
        updated_at: new Date(bank_account_transfer_method.updated_at)
      })
    })
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  findByBaseItemValueAndBankTransferMethod(
    fk_id_base_item: T["fk_id_base_item_value"],
    ba_transfer_method: BankAccountTransferMethod
  ): BaseItemValue_BankAccountTransferMethod<U> {
    throw new Error("Method not implemented.");
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findAll(): BaseItemValue_BankAccountTransferMethod<U>[] {
    const results = db.query.base_item_value_pivot_bank_account_transfer_method.findMany({
      with: {
        bank_account_transfer_method: {
          with: {
            bank_account: true,
          }
        },
        base_item_value: {
          with: {
            tag: true,
            transfer_method_type: true
          }
        }
      }
    }).sync()
    return results.map(biv_batm => {
      const {
        bank_account_transfer_method,
        fk_id_bank_account_transfer_method,
        base_item_value,
        fk_id_base_item_value,
        id
      } = biv_batm
      
      return new BaseItemValue_BankAccountTransferMethod<U>({
        id,
        base_item_value: this.parseToTypeItemValue(base_item_value),
        bank_account_transfer_method: new BankAccountTransferMethod({
          id: fk_id_bank_account_transfer_method,
          type: bank_account_transfer_method.type,
          is_enable: bank_account_transfer_method.is_enable,
          bank_account: (({created_at, updated_at, ...rest}) => {
            return new BankAccount({
              ...rest,
              created_at: new Date(created_at),
              updated_at: new Date(updated_at),
            })
          })(bank_account_transfer_method.bank_account),
          created_at: new Date(bank_account_transfer_method.created_at),
          updated_at: new Date(bank_account_transfer_method.updated_at)
        })
      })
    })
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public update(
    id: MBaseItemValue_BankAccountTransferMethod<T>["id"],
    data: IRepositoryWithoutDatesUpdateProps<MBaseItemValue_BankAccountTransferMethod<T>>
  ): BaseItemValue_BankAccountTransferMethod<U> {
    db.update(base_item_pivot_bk_transfer_method).set(data).where(
      eq(base_item_pivot_bk_transfer_method.id, id)
    ).returning().get()
    return this.findById(id)
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public delete(id: MBaseItemValue_BankAccountTransferMethod<T>["id"]): boolean {
    const result = db.delete(base_item_pivot_bk_transfer_method).where(
      eq(base_item_pivot_bk_transfer_method.id, id)
    ).returning().get()
    if(!result) return false;         
    return true;
  }
}