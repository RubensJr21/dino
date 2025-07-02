import { MRecurring } from "@src/core/models/recurring.model";
import { ItemValue } from "../../entities/item_value.entity";
import { Recurring } from "../../entities/recurring.entity";

export type IRepoRecurringCreateProps = StrictOmit<MRecurring, "id" | "is_disabled" | "created_at" | "updated_at">;
export type IRepoRecurringUpdateProps = StrictOmit<MRecurring, "id" | "itens" | "fk_id_recurrence_type" | "created_at" | "updated_at">

export interface IRepoRecurring {
  /**
   * Creates a new recurring item value in the database
   * @param {IRepoRecurringCreateProps} data The data required to create a recurring item value
   * @returns {Recurring} The newly created Recurring instance
   */
  create(data: IRepoRecurringCreateProps): Recurring;

  /**
   * Retrieves a recurring item value by its unique identifier
   * @param {MRecurring["id"]} id The unique identifier of the recurring item value to find
   * @returns {Recurring} The found recurring item value with associated tag, transfer method type, and recurrence type
   * @throws {RecurringNotFoundById} If no recurring item value is found with the given ID
   */
  findById(id: MRecurring["id"]): Recurring;

  /**
   * Retrieves all recurring item values with their associated item values, tags, transfer method types, and recurrence types.
   * @returns {Recurring[]} An array of fully hydrated Recurring instances
   */
  findAll(): Recurring[];

  /**
   * Retrieves all installment item values with their associated item values, tags, transfer method types, and recurrence types.
   * @param {ItemValue["cashflow_type"]} cashflow_type flow from item_value [0 = Entrada, 1 = Saída; CHECK(type IN (0,1))]
   * @returns {Recurring[]} An array of fully hydrated Recurring instances
   */
    findAllByCashflowType(cashflow_type: ItemValue["cashflow_type"]): Recurring[];

  /**
   * Updates a recurring item value and its associated base item value
   * @param {MRecurring["id"]} id - The ID of the recurring item value to update
   * @param {IRepoRecurringUpdateProps} data - The update data for the recurring item value
   * @returns {Recurring} The updated recurring item value
   */
  update(id: MRecurring["id"], data: IRepoRecurringUpdateProps): Recurring;

  /**
   * Deletes a recurring item value by its ID
   * @param {MRecurring["id"]} id - The unique identifier of the recurring item value to delete
   * @returns {boolean} Indicates whether the deletion was successful
   */
  delete(id: MRecurring["id"]): boolean
}