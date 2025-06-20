import IUseCase from "@core/shared/IUseCase";
import { InstallmentItemValue } from "@src/core/entities/installment.entity";
import { IRepoInstallmentItemValue } from "@src/infrastructure/repositories/installment.repository";

interface UpdateInstallmentReceipt_Input {
  id: number;
  data: StrictOmit<InstallmentItemValue, "id">
}

export default abstract class UseCase_InstallmentItemValue_Update implements IUseCase<UpdateInstallmentReceipt_Input, InstallmentItemValue>{
  /**
   * Construtor da Classe UseCase_InstallmentItemValue_Update
   * @param {IRepoInstallmentItemValue} repo_iiv ""
   */
  constructor(
    private repo_iiv: IRepoInstallmentItemValue
  ){}
  
  /**
   * Executes the update process for an installment item value
   * @param {UpdateInstallmentReceipt_Input} input - The input data for updating the installment item value
   * @returns {Promise<InstallmentItemValue>} The updated installment item value
   */
  async execute(input: UpdateInstallmentReceipt_Input): Promise<InstallmentItemValue> {
    const {
      id,
      tag,
      transfer_method_type,
      created_at,
      updated_at,
      ...data
    } = {
      ...input.data.properties,
      fk_id_tag: input.data.tag.id,
      fk_id_transfer_method_type: input.data.transfer_method_type.id
    }

    return this.repo_iiv.update(input.id, data)
  }
}