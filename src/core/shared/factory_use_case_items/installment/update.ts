import IUseCase from "@core/shared/IUseCase";
import { Installment } from "@src/core/entities/installment.entity";
import { IRepoInstallment, UpdateInstallmentParams } from "../../interfaces/IRepoInstallment";
import { IRepoItemValue } from "../../interfaces/IRepoItemValue";

interface Input {
  id: number;
  data: UpdateInstallmentParams
}

type UseCaseInterface = IUseCase<Input, Installment>

export default abstract class UpdateInstallment implements UseCaseInterface {
  
  constructor(
    private repo_i: IRepoInstallment,
    private repo_iv: IRepoItemValue
  ){}
  
  async execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result_search = this.repo_i.find_by_id(input.id);

    if(!result_search.success){
      const scope = `UpdateInstallment(${this.repo_i.find_by_id.name}) > ${result_search.error.scope}`
      return {
        success: false,
        error: {
          ...result_search.error,
          scope
        }
      }
    }

    const old_description = result_search.data.description
    
    const item_values_founded = this.repo_i.find_all_item_value(input.id);
    
    if(!item_values_founded.success){
      const scope = `UpdateInstallment(${this.repo_i.find_all_item_value.name}) > ${item_values_founded.error.scope}`
      return {
        success: false,
        error: {
          ...item_values_founded.error,
          scope
        }
      }
    }
    
    const item_values_data = item_values_founded.data
    
    for (const item_value of item_values_data) {
      const new_item_value_description = item_value.description.replace(old_description, input.data.description)
      
      item_value.change_description(new_item_value_description)
      
      const {
        id,
        tag,
        transfer_method,
        ...rest
      } = {
        ...item_value.properties,
        fk_id_tag: item_value.tag.id,
        fk_id_transfer_method: item_value.transfer_method.id,
      }
      const item_value_updated = this.repo_iv.update(id, rest)

      if(!item_value_updated.success){
        const scope = `UpdateInstallment(${this.repo_i.find_all_item_value.name}) > ${item_value_updated.error.scope}`
        return {
          success: false,
          error: {
            ...item_value_updated.error,
            scope
          }
        }
      }
    }
    // Caso chegue aqui todos os descriptions foram atualizados

    const result_update = this.repo_i.update(input.id, input.data)

    if(!result_update.success){
      const scope = `UpdateInstallment(${this.repo_i.update.name}) > ${result_update.error.scope}`
      return {
        success: false,
        error: {
          ...result_update.error,
          scope
        }
      }
    }

    return {
      success: true,
      data: result_update.data
    }
  }
}