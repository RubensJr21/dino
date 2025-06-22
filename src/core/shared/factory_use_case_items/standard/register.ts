import IUseCase from "@core/shared/IUseCase";
import { IStandard, Standard } from "@src/core/entities/standard.entity";
import { IRepoStandard } from "../../interfaces/IRepositoryStandard";
import { TypeOfVariants } from "../../types/variants_items";

type RegisterStandard_Input = StrictOmit<IStandard, "id"|"created_at"|"updated_at">

export default abstract class UseCase_ItemValue_Register implements IUseCase<RegisterStandard_Input, Standard> {
  protected abstract variant: TypeOfVariants;
  /**
   * Constructs a new UseCase_ItemValue_Register instance
   * @param {IRepoStandard} repo_s Repository for standard operations
   */
  constructor(
    private repo_s: IRepoStandard
  ){}
  /**
   * Executes the registration of an standard
   * @param {RegisterStandard_Input} input - The input data for creating an standard
   * @returns {Promise<Standard>} The created standard
   */
  async execute(input: RegisterStandard_Input): Promise<Standard> {
    const {
      tag,
      transfer_method,
      ...item_value
    } = {
      ...input.item_value.properties,
      fk_id_tag: input.item_value.tag.id,
      fk_id_transfer_method: input.item_value.transfer_method.id,
    }

    return this.repo_s.create({
      item_value
    })
  }
}