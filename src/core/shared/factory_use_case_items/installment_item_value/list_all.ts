import { InstallmentItemValue } from "@core/entities/installment_item_value.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoInstallmentItemValue } from "@src/infrastructure/repositories/drizzle/installment_item_value.repository";
import { TypeOfVariants, Variants_Of_ItemValue } from "../../types/variants_items";

export default abstract class UseCase_InstallmentItemValue_ListAll implements IUseCase<void, InstallmentItemValue[]> {
  protected abstract variant: TypeOfVariants
  /**
   * @param {IRepoInstallmentItemValue} repo_iiv - The repository for retrieving installment item values
   */
  constructor(
    private repo_iiv: IRepoInstallmentItemValue
  ){}
  /**
   * @returns {Promise<InstallmentItemValue[]>} Promise de uma lista de InstallmentItemValue
   */
  async execute(): Promise<InstallmentItemValue[]> {
    const item_values = this.repo_iiv.findAll()
    const item_values_filtered = item_values.filter(iiv => iiv.type === Variants_Of_ItemValue[this.variant])
    return item_values_filtered
  }
}