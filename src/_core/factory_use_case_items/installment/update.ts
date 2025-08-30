import { RepoInterfaceNames } from "@core-types/enum/RepoInterfaceNames";
import { UnionRepoInterfaces } from "@core-types/UnionRepoInterfaces";
import { UnionRepoInterfacesNames } from "@core-types/UnionRepoInterfacesNames";
import { UseCaseResult } from "@core-types/UseCaseResult";
import IUseCase from "@core/interfaces/IUseCase_v3";
import { Installment } from "@domain/entities/installment.entity";
import { IRepoInstallment, UpdateInstallmentParams } from "@domain/repositories/IRepoInstallment";
import { IRepoItemValue } from "@domain/repositories/IRepoItemValue";

interface Input {
  id: number;
  data: UpdateInstallmentParams
}

type UsedRepoInterfaces = UnionRepoInterfaces<[
  IRepoInstallment,
  IRepoItemValue
]>;

type UsedRepoInterfaceNames = UnionRepoInterfacesNames<[
  RepoInterfaceNames.Installment,
  RepoInterfaceNames.ItemValue
]>;

type Return = UseCaseResult<
  "UpdateInstallment",
  Installment,
  UsedRepoInterfaces,
  UsedRepoInterfaceNames
>

type UseCaseInterface = IUseCase<Input, Return>

export default abstract class UpdateInstallment implements UseCaseInterface {

  constructor(
    private repo_i: IRepoInstallment,
    private repo_iv: IRepoItemValue
  ) { }

  execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result_search = this.repo_i.find_by_id(input.id);

    if (!result_search.success) {
      return {
        success: false,
        error: {
          ...result_search.error,
          trace: "UpdateInstallment > RepoInstallment"
        }
      }
    }

    const old_description = result_search.data.description

    const item_values_founded = this.repo_i.find_all_item_value(input.id);

    if (!item_values_founded.success) {
      return {
        success: false,
        error: {
          ...item_values_founded.error,
          trace: "UpdateInstallment > RepoInstallment"
        }
      }
    }

    const item_values_data = item_values_founded.data

    for (const item_value of item_values_data) {
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

      if (!item_value_updated.success) {
        const scope = `UpdateInstallment(${this.repo_i.find_all_item_value.name}) > ${item_value_updated.error.scope}`
        return {
          success: false,
          error: {
            ...item_value_updated.error,
            trace: "UpdateInstallment > RepoItemValue"
          }
        }
      }
    }
    // Caso chegue aqui todos os descriptions foram atualizados

    const result_update = this.repo_i.update(input.id, input.data)

    if (!result_update.success) {
      return {
        success: false,
        error: {
          ...result_update.error,
          trace: "UpdateInstallment > RepoInstallment"
        }
      }
    }

    return {
      success: true,
      data: result_update.data
    }
  }
}