import { BaseItemValue, IBaseItemValue } from "@core/entities/base_item_value.entity";
import { CreditCard } from "@core/entities/credit_card.entity";
import { BaseItemValue_CreditCard, IBaseItemValue_CreditCard } from "@src/core/entities/base_item_value-credit_card.entity";
import { BaseItemValueCreditCardNotFoundById } from "@src/core/shared/errors/base_item_value-credit_card.repository";
import { IRepositoryWithoutDates, IRepositoryWithoutDatesCreateProps, IRepositoryWithoutDatesUpdateProps } from "@src/core/shared/IRepositoryWithoutDates";
import { db } from "@src/infrastructure/database/drizzle/client";
import { base_item_value_pivot_credit_card } from "@src/infrastructure/database/drizzle/schemas";
import { MBaseItemValue_CreditCard } from "@src/infrastructure/models/base_item_value-credit_card.model";
import { MBaseItemValue } from "@src/infrastructure/models/base_item_value.model";
import { eq } from "drizzle-orm/sql";

export interface IRepoBaseItemValue_CreditCard<T extends MBaseItemValue, U extends BaseItemValue> extends IRepositoryWithoutDates<MBaseItemValue_CreditCard<T>, IBaseItemValue_CreditCard<U>> {
  /**
   * Creates a new BaseItemValue_CreditCard record in the database
   * @param {IRepositoryWithoutDatesCreateProps<MBaseItemValue_CreditCard<T>>} data The data to create the new record
   * @returns {BaseItemValue_CreditCard<U>} The newly created BaseItemValue_CreditCard record
   */
  create(data: IRepositoryWithoutDatesCreateProps<MBaseItemValue_CreditCard<T>>): BaseItemValue_CreditCard<U>;

  /**
   * Finds a BaseItemValue_CreditCard record by its unique identifier
   * @param {MBaseItemValue_CreditCard<T>["id"]} id The unique identifier of the BaseItemValue_CreditCard record
   * @returns {BaseItemValue_CreditCard<U>} The BaseItemValue_CreditCard record matching the provided ID
   * @throws {BaseItemValueCreditCardNotFoundById} Thrown if no record is found with the given ID
   */
  findById(id: MBaseItemValue_CreditCard<T>["id"]): BaseItemValue_CreditCard<U>;

  /**
   * Finds a BaseItemValue_CreditCard by matching a base item value ID and a credit card ID
   * @param {IBaseItemValue["fk_id_base_item_value"]} fk_id_base_item The ID of the base item value to search for
   * @param {CreditCard["id"]} fk_id_credit_card The ID of the credit card to search for
   * @returns {BaseItemValue_CreditCard<U>} The matching BaseItemValue_CreditCard instance
   */
  findByBaseItemValueAndBankTransferMethod(
    fk_id_base_item: IBaseItemValue["fk_id_base_item_value"],
    fk_id_credit_card: CreditCard["id"]
  ): BaseItemValue_CreditCard<U>;

  /**
   * Retrieves all BaseItemValue_CreditCard records with their associated credit card and base item value details
   * @returns {BaseItemValue_CreditCard<U>[]} An array of BaseItemValue_CreditCard records with nested credit card and base item value information
   */
  findAll(): BaseItemValue_CreditCard<U>[];

  /**
   * Updates a BaseItemValue_CreditCard record by its ID
   * @param {MBaseItemValue_CreditCard<T>["id"]} id - The unique identifier of the BaseItemValue_CreditCard record to update
   * @param {IRepositoryWithoutDatesUpdateProps<MBaseItemValue_CreditCard<T>>} data - The data to update the record with
   * @returns {BaseItemValue_CreditCard<U>} The updated BaseItemValue_CreditCard record
   */
  update(id: MBaseItemValue_CreditCard<T>["id"], data: IRepositoryWithoutDatesUpdateProps<MBaseItemValue_CreditCard<T>>): BaseItemValue_CreditCard<U>;

  /**
   * Deletes a BaseItemValue_CreditCard record by its ID
   * @param {MBaseItemValue_CreditCard<T>["id"]} id - The unique identifier of the BaseItemValue_CreditCard record to delete
   * @returns {boolean} Indicates whether the deletion was successful
   */
  delete(id: MBaseItemValue_CreditCard<T>["id"]): boolean;
}

export default class BaseItemValue_CreditCardDrizzleRepository<T extends MBaseItemValue, U extends BaseItemValue> implements IRepoBaseItemValue_CreditCard<T, U> {
  /**
   * @param {Function} parseToTypeItemValue função para parsear valor inserido em base_item_value
   */
  constructor(
    private parseToTypeItemValue: <T>(param: T) => U
  ){}

  // eslint-disable-next-line jsdoc/require-jsdoc
  public create(data: IRepositoryWithoutDatesCreateProps<MBaseItemValue_CreditCard<T>>): BaseItemValue_CreditCard<U> {
    const result = db.insert(base_item_value_pivot_credit_card).values(data).returning().get()
    return this.findById(result.id)
  }
  
  // eslint-disable-next-line jsdoc/require-jsdoc
  public findById(id: MBaseItemValue_CreditCard<T>["id"]): BaseItemValue_CreditCard<U> {
    const result = db.query.base_item_value_pivot_credit_card.findFirst({
      where: eq(base_item_value_pivot_credit_card.id, id),
      with: {
        credit_card: true,
        base_item_value: {
          with: {
            tag: true,
            transfer_method_type: true
          }
        }
      }
    }).sync()

    if(!result) throw new BaseItemValueCreditCardNotFoundById(id);
    
    const {
      credit_card,
      base_item_value,
    } = result
    
    return new BaseItemValue_CreditCard<U>({
      id: result.id,
      base_item_value_instance: this.parseToTypeItemValue(base_item_value),
      credit_card: (({
        created_at, updated_at,
        closing_date, due_date,
        ...rest
      }) => {
        return new CreditCard({
          ...rest,
          created_at: new Date(created_at),
          updated_at: new Date(updated_at),
          closing_date: new  Date(closing_date),
          due_date: new Date(due_date)
        })
      })(credit_card)
    })
  }
  
  // eslint-disable-next-line jsdoc/require-jsdoc
  public findByBaseItemValueAndBankTransferMethod(fk_id_base_item_value: IBaseItemValue["fk_id_base_item_value"], credit_card_id: CreditCard["id"]): BaseItemValue_CreditCard<U> {
    throw new Error("Method not implemented.");
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findAll(): BaseItemValue_CreditCard<U>[] {
    const results = db.query.base_item_value_pivot_credit_card.findMany({
      with: {
        credit_card: true,
        base_item_value: {
          with: {
            tag: true,
            transfer_method_type: true
          }
        }
      }
    }).sync()
    return results.map(biv_cc => {
      const {
        credit_card,
        base_item_value,
        id,
      } = biv_cc
      
      return new BaseItemValue_CreditCard<U>({
        id,
        base_item_value_instance: this.parseToTypeItemValue(base_item_value),
        credit_card: (({
          created_at, updated_at,
          closing_date, due_date,
          ...rest
        }) => {
          return new CreditCard({
            ...rest,
            created_at: new Date(created_at),
            updated_at: new Date(updated_at),
            closing_date: new  Date(closing_date),
            due_date: new Date(due_date)
          })
        })(credit_card)
      })
    })
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public update(id: MBaseItemValue_CreditCard<T>["id"], data: IRepositoryWithoutDatesUpdateProps<MBaseItemValue_CreditCard<T>>): BaseItemValue_CreditCard<U> {
    db.update(base_item_value_pivot_credit_card).set(data).where(
      eq(base_item_value_pivot_credit_card.id, id)
    ).returning().get()
    return this.findById(id)
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public delete(id: MBaseItemValue_CreditCard<T>["id"]): boolean {
    const result = db.delete(base_item_value_pivot_credit_card).where(
      eq(base_item_value_pivot_credit_card.id, id)
    ).returning().get()  
    return !result ? false : true;
  }
}