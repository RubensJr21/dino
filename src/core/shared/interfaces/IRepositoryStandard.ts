import { MStandard } from "@src/core/models/standard.model";
import { ItemValue } from "../../entities/item_value.entity";
import { Standard } from "../../entities/standard.entity";

export type IRepoStandardCreateProps = StrictOmit<MStandard, "id" | "created_at" | "updated_at">;
export type IRepoStandardUpdateProps = IRepoStandardCreateProps

export interface IRepoStandard {
  /**
   * Creates a new standard item value in the database
   * @param {IRepoStandardCreateProps} data The data required to create a standard item value
   * @returns {Standard} The newly created Standard instance
   */
  create(data: IRepoStandardCreateProps): Standard;

  /**
   * Retrieves a standard item value by its unique identifier
   * @param {MStandard["id"]} id The unique identifier of the standard item value to find
   * @returns {Standard} The found standard item value with associated tag, transfer method type, and recurrence type
   * @throws {StandardNotFoundById} If no standard item value is found with the given ID
   */
  findById(id: MStandard["id"]): Standard;

  /**
   * Retrieves all standard item values with their associated item values, tags, transfer method types, and recurrence types.
   * @returns {Standard[]} An array of fully hydrated Standard instances
   */
  findAll(): Standard[];

  /**
   * Retrieves all installment item values with their associated item values, tags, transfer method types, and recurrence types.
   * @param {ItemValue["cashflow_type"]} cashflow_type flow from item_value [0 = Entrada, 1 = Saída; CHECK(type IN (0,1))]
   * @returns {Standard[]} An array of fully hydrated Standard instances
   */
  findAllByCashflowType(cashflow_type: ItemValue["cashflow_type"]): Standard[];

  /**
   * Updates a standard item value and its associated item value
   * @param {MStandard["id"]} id - The ID of the standard item value to update
   * @param {IRepoStandardUpdateProps} data - The update data for the standard item value
   * @returns {Standard} The updated standard item value
   */
  update(id: MStandard["id"], data: IRepoStandardUpdateProps): Standard;

  /**
   * Deletes a standard item value by its ID
   * @param {MStandard["id"]} id - The unique identifier of the standard item value to delete
   * @returns {boolean} Indicates whether the deletion was successful
   */
  delete(id: MStandard["id"]): boolean
}