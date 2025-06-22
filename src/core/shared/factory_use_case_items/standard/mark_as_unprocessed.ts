import IUseCase from "@core/shared/IUseCase";
import { Standard } from "@src/core/entities/standard.entity";
import { IRepoItemValue } from "@src/infrastructure/repositories/item_value.repository";
import { isStandardNotFoundById, StandardUnknownError } from "../../errors/standard";
import { IRepoStandard } from "../../interfaces/IRepositoryStandard";
import { TypeOfVariants } from "../../types/variants_items";

interface MarkStandardAsUnprocessed_Input {
  id: number
}

export default abstract class UseCase_StandardItemValue_MarkAsUnprocessed implements IUseCase<MarkStandardAsUnprocessed_Input, Standard>{
  protected abstract variant: TypeOfVariants;
  /**
   * Constructs an instance of the use case with the required standard repository
   * @param {IRepoStandard} repo_s - The repository for standard operations
   * @param {IRepoItemValue} repo_iv - The repository for item value operations
   */
  constructor(
    private repo_s: IRepoStandard,
    private repo_iv: IRepoItemValue
  ){}
  /**
   * Marks an standard as unprocessed by updating its properties
   * @param {MarkStandardAsUnprocessed_Input} input - The input containing the standard ID
   * @returns {Promise<Standard>} The updated standard
   * @throws {StandardNotFoundError} If the standard is not found
   * @throws {StandardUnknownError} If an unexpected error occurs during processing
   */
  async execute(input: MarkStandardAsUnprocessed_Input): Promise<Standard> {
    try {
      const { item_value } = this.repo_s.findById(input.id)
      item_value.markAsUnprocessed()
      const { id, tag, transfer_method, ...iv } = item_value.properties
      this.repo_iv.update(id, {
        ...iv,
        fk_id_tag: tag.id,
        fk_id_transfer_method: transfer_method.id
      })
      return this.repo_s.findById(input.id);
    } catch (error) {
      if(isStandardNotFoundById(error)) {
        throw error
      }
      throw new StandardUnknownError()
    }
  }
}