import IUseCase from "@core/shared/IUseCase";
import { Standard } from "@src/core/entities/standard.entity";
import { IRepoItemValue } from "@src/infrastructure/repositories/item_value.repository";
import { IRepoStandard } from "../../interfaces/IRepositoryStandard";
import { TypeOfVariants } from "../../types/variants_items";

interface UpdateStandard_Input {
  id: number;
  data: StrictOmit<Standard, "id">
}

export default abstract class UseCase_Standard_Update implements IUseCase<UpdateStandard_Input, Standard>{
  abstract variant: TypeOfVariants;
  /**
   * Constructs an instance of the Standard update use case
   * @param {IRepoStandard} repo_s - The repository for standard operations
   * @param {IRepoItemValue} repo_iv - The repository for item value operations
   */
  constructor(
    private repo_s: IRepoStandard,
    private repo_iv: IRepoItemValue
  ){}
  /**
   * Executes the update operation for an Standard
   * @param {UpdateStandard_Input} input - The input data for updating an Standard
   * @returns {Promise<Standard>} The updated Standard or undefined if update fails
   */
  async execute(input: UpdateStandard_Input): Promise<Standard> {
    const {
      item_value,
      ...data
    } = input.data

    const {
      tag,
      transfer_method,
      ...iv
    } = item_value.properties
    return this.repo_s.update(input.id, {
      ...data,
      item_value: {
        ...iv,
        fk_id_tag: tag.id,
        fk_id_transfer_method: transfer_method.id
      }
    })
  }
}