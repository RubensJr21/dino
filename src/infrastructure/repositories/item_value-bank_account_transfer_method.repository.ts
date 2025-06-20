import { BankAccountTransferMethod } from "@core/entities/bank_account_transfer_method.entity";
import { BankAccount } from "@src/core/entities/bank_account.entity";
import { ItemValue_BankAccountTransferMethod } from "@src/core/entities/item_value-bank_account_transfer_method.entity";
import { IItemValue } from "@src/core/entities/item_value.entity";
import { MItemValue_BankAccountTransferMethod } from "@src/core/models/item_value-bank_account_transfer_method.model";
import { MItemValue } from "@src/core/models/item_value.model";
import { BankAccountTransferMethodNotFoundById } from "@src/core/shared/errors/bank_account_transfer_method";
import { IRepositoryWithoutDates, IRepositoryWithoutDatesCreateProps, IRepositoryWithoutDatesUpdateProps } from "@src/core/shared/IRepositoryWithoutDates";
import { db } from "@src/infrastructure/database/client";
import { item_value_pivot_bank_account_transfer_method } from "@src/infrastructure/database/schemas";
import { eq } from "drizzle-orm/sql";

export interface IRepoItemValue_BankAccountTransferMethod<T extends MItemValue, U extends IItemValue> extends IRepositoryWithoutDates<MItemValue_BankAccountTransferMethod<T>, ItemValue_BankAccountTransferMethod<U>>{
  /**
   * Creates a new ItemValue_BankAccountTransferMethod record in the database
   * @param {IRepositoryWithoutDatesCreateProps<MItemValue_BankAccountTransferMethod<T>>} data - The data for creating the new record
   * @returns {ItemValue_BankAccountTransferMethod<U>} The newly created ItemValue_BankAccountTransferMethod record with full details
   */
  create(
    data: IRepositoryWithoutDatesCreateProps<MItemValue_BankAccountTransferMethod<T>>
  ): ItemValue_BankAccountTransferMethod<U>;
  
  /**
   * Retrieves a ItemValue_BankAccountTransferMethod record by its unique identifier
   * @param {MItemValue_BankAccountTransferMethod<T>["id"]} id - The unique identifier of the ItemValue_BankAccountTransferMethod record
   * @returns {ItemValue_BankAccountTransferMethod<U>} A ItemValue_BankAccountTransferMethod record with full details including related bank account transfer method and base item value
   * @throws {BankAccountTransferMethodNotFoundById} Throws an error if no record is found with the given ID
   */
  findById(id: MItemValue_BankAccountTransferMethod<T>["id"]): ItemValue_BankAccountTransferMethod<U>;

  /**
   * Retrieves a ItemValue_BankAccountTransferMethod record by its base item value ID and bank account transfer method
   * @param {T["fk_id_base_item_value"]} fk_id_base_item - The unique identifier of the base item value
   * @param {BankAccountTransferMethod} ba_transfer_method - The bank account transfer method to search for
   * @returns {ItemValue_BankAccountTransferMethod<U>} A ItemValue_BankAccountTransferMethod record matching the given base item value and transfer method
   */
  findByItemValueAndBankTransferMethod(
    fk_id_base_item: T["id"],
    ba_transfer_method: BankAccountTransferMethod
  ): ItemValue_BankAccountTransferMethod<U>;

  /**
   * Retrieves all ItemValue_BankAccountTransferMethod records with their related bank account transfer methods and base item values
   * @returns {ItemValue_BankAccountTransferMethod<U>[]} An array of ItemValue_BankAccountTransferMethod records with nested relationships
   */
  findAll(): ItemValue_BankAccountTransferMethod<U>[];

  /**
   * Updates a ItemValue_BankAccountTransferMethod record by its ID
   * @param {MItemValue_BankAccountTransferMethod<T>["id"]} id The unique identifier of the record to be updated
   * @param {IRepositoryWithoutDatesUpdateProps<MItemValue_BankAccountTransferMethod<T>>} data The updated data for the record
   * @returns {ItemValue_BankAccountTransferMethod<U>} The updated ItemValue_BankAccountTransferMethod record
   */
  update(
    id: MItemValue_BankAccountTransferMethod<T>["id"],
    data: IRepositoryWithoutDatesUpdateProps<MItemValue_BankAccountTransferMethod<T>>
  ): ItemValue_BankAccountTransferMethod<U>;

  /**
   * Deletes a ItemValue_BankAccountTransferMethod record by its ID
   * @param {MItemValue_BankAccountTransferMethod<T>["id"]} id The unique identifier of the record to be deleted
   * @returns {boolean} A boolean indicating whether the deletion was successful
   */
  delete(id: MItemValue_BankAccountTransferMethod<T>["id"]): boolean;
}

export default class ItemValue_BankAccountTransferMethodDrizzleRepository<T extends MItemValue, U extends IItemValue> implements IRepoItemValue_BankAccountTransferMethod<T, U> {  
  /**
   * @param {Function} parseToTypeItemValue função para parsear valor inserido em base_item_value
   */
  constructor(
    private parseToTypeItemValue: <T>(param: T) => U
  ){}
  
  // eslint-disable-next-line jsdoc/require-jsdoc
  public create(data: IRepositoryWithoutDatesCreateProps<MItemValue_BankAccountTransferMethod<T>>): ItemValue_BankAccountTransferMethod<U> {   
    const result = db.insert(item_value_pivot_bank_account_transfer_method).values(data).returning().get()
    return this.findById(result.id)
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findById(id: MItemValue_BankAccountTransferMethod<T>["id"]): ItemValue_BankAccountTransferMethod<U> {
    const result = db.query.item_value_pivot_bank_account_transfer_method.findFirst({
      where: eq(item_value_pivot_bank_account_transfer_method.id, id),
      with: {
        bank_account_transfer_method: {
          with: {
            bank_account: true,
          }
        },
        item_value: {
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
      item_value,
    } = result
    
    return new ItemValue_BankAccountTransferMethod<U>({
      id: result.id,
      item_value: this.parseToTypeItemValue(item_value),
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
  findByItemValueAndBankTransferMethod(
    fk_id_item_value: T["id"],
    ba_transfer_method: BankAccountTransferMethod
  ): ItemValue_BankAccountTransferMethod<U> {
    throw new Error("Method not implemented.");
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findAll(): ItemValue_BankAccountTransferMethod<U>[] {
    const results = db.query.item_value_pivot_bank_account_transfer_method.findMany({
      with: {
        bank_account_transfer_method: {
          with: {
            bank_account: true,
          }
        },
        item_value: {
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
        item_value,
        fk_id_item_value,
        id
      } = biv_batm
      
      return new ItemValue_BankAccountTransferMethod<U>({
        id,
        item_value: this.parseToTypeItemValue(item_value),
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
    id: MItemValue_BankAccountTransferMethod<T>["id"],
    data: IRepositoryWithoutDatesUpdateProps<MItemValue_BankAccountTransferMethod<T>>
  ): ItemValue_BankAccountTransferMethod<U> {
    db.update(item_value_pivot_bank_account_transfer_method).set(data).where(
      eq(item_value_pivot_bank_account_transfer_method.id, id)
    ).returning().get()
    return this.findById(id)
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public delete(id: MItemValue_BankAccountTransferMethod<T>["id"]): boolean {
    const result = db.delete(item_value_pivot_bank_account_transfer_method).where(
      eq(item_value_pivot_bank_account_transfer_method.id, id)
    ).returning().get()
    if(!result) return false;         
    return true;
  }
}