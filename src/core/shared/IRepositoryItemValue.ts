import { MItemValue } from "@src/core/models/item_value.model";
import { IItemValue } from "../entities/item_value.entity";

export type IRepoItemValueCreateProps<T extends MItemValue> = StrictOmit<T, "id" | "created_at" | "updated_at">;
export type IRepoItemValueUpdateProps<T extends MItemValue> = StrictOmit<T, "id" | "created_at" | "updated_at">;

/**
 * Represents a repository interface for managing item values with generic type support.
 * @template T The base item value model type
 * @template U The base item value entity type
 * @description Provides CRUD operations for repository item values with type-safe methods
 */
export interface IRepositoryItemValue<T extends MItemValue, U extends IItemValue> {
  /**
   * Creates a new item value in the repository.
   * @param {IRepoItemValueCreateProps<T>} data The data for creating the item value
   * @returns {U} The created item value entity
   * @throws {Error} If creation fails
   */
  create(data: IRepoItemValueCreateProps<T>): U;
  /**
   *
   * @param {number} id id da Entidade a ser recuperada
   * @throws {Error}
   * @returns {U} entidade que representa U
   */
  findById(id: T["id"]): U;
  /**
   * Retrieves all item values from the repository.
   * @returns {U[]} An array of item value entities
   * @throws {Error} If retrieval fails
   */
  findAll(): U[];
  /**
   * Updates an existing item value in the repository.
   * @param {T["id"]} id The unique identifier of the item value to update
   * @param {IRepoItemValueUpdateProps<T>} data The updated data for the item value
   * @returns {U} The updated item value entity
   * @throws {Error} If update fails
   */
  update(id: T["id"], data: StrictOmit<T, "id" | "created_at" | "updated_at">): U;
  /**
   * Deletes an item value from the repository by its unique identifier.
   * @param {T["id"]} id The unique identifier of the item value to delete
   * @returns {boolean} Indicates whether the deletion was successful
   * @throws {Error} If deletion fails
   */
  delete(id: T["id"]): boolean;
}
