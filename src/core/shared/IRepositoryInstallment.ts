import { MInstallment } from "@src/core/models/installment.model";
import { Installment } from "../entities/installment.entity";

export type IRepoInstallmentCreateProps = StrictOmit<MInstallment, "id" | "created_at" | "updated_at">;
export type IRepoInstallmentUpdateProps = StrictOmit<MInstallment, "id" | "itens" | "created_at" | "updated_at">

export interface IRepoInstallment {
  /**
   * Creates a new installment item value in the database
   * @param {IRepoInstallmentCreateProps} data The data required to create a installment item value
   * @returns {Installment} The newly created Installment instance
   */
  create(data: IRepoInstallmentCreateProps): Installment;

  /**
   * Retrieves a installment item value by its unique identifier
   * @param {MInstallment["id"]} id The unique identifier of the installment item value to find
   * @returns {Installment} The found installment item value with associated tag, transfer method type, and recurrence type
   * @throws {InstallmentNotFoundById} If no installment item value is found with the given ID
   */
  findById(id: MInstallment["id"]): Installment;

  /**
   * Retrieves all installment item values with their associated base item values, tags, transfer method types, and recurrence types.
   * @returns {Installment[]} An array of fully hydrated Installment instances
   */
  findAll(): Installment[];

  /**
   * Updates a installment item value and its associated base item value
   * @param {MInstallment["id"]} id - The ID of the installment item value to update
   * @param {IRepoInstallmentUpdateProps} data - The update data for the installment item value
   * @returns {Installment} The updated installment item value
   */
  update(id: MInstallment["id"], data: IRepoInstallmentUpdateProps): Installment;

  /**
   * Deletes a installment item value by its ID
   * @param {MInstallment["id"]} id - The unique identifier of the installment item value to delete
   * @returns {boolean} Indicates whether the deletion was successful
   */
  delete(id: MInstallment["id"]): boolean
}