import IUseCase from "@core/shared/IUseCase";
import { Standard } from "@src/core/entities/standard.entity";
import { IRepoItemValue } from "@src/infrastructure/repositories/item_value.repository";
import { isStandardNotFoundById, StandardUnknownError } from "../../errors/standard";
import { IRepoStandard } from "../../interfaces/IRepositoryStandard";
import { TypeOfVariants } from "../../types/variants_items";

interface MarkStandardAsProcessed_Input {
  id: number
}

export default abstract class UseCase_StandardItemValue_MarkAsProcessed implements IUseCase<MarkStandardAsProcessed_Input, Standard>{
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
   * Marks an standard as processed by updating its status in the repository
   * @param {MarkStandardAsProcessed_Input} input - The input containing the standard ID to be processed
   * @returns {Promise<Standard>} The updated standard after marking as processed
   * @throws {StandardNotFoundById} If the standard with the given ID is not found
   * @throws {StandardUnknownError} If an unexpected error occurs during processing
   */
  async execute(input: MarkStandardAsProcessed_Input): Promise<Standard> {
    try {
      const { item_value } = this.repo_s.findById(input.id)
      item_value.markAsProcessed()
      const { id, tag, transfer_method, ...iv } = item_value.properties
      this.repo_iv.update(id, {
        ...iv,
        fk_id_tag: tag.id,
        fk_id_transfer_method: transfer_method.id
      })
      return this.repo_s.findById(input.id);
    } catch (error) {
      if(isStandardNotFoundById(error)){
        throw error
      }
      throw new StandardUnknownError()
    }
  }
}