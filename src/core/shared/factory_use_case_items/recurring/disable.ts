import IUseCase from "@core/shared/IUseCase_v3";
import { IRecurring, Recurring } from "@src/core/entities/recurring.entity";
import { IRepoRecurring } from "../../interfaces/IRepoRecurring";
import { RepoInterfaceNames } from "../../types/RepoInterfaceNames";
import { UseCaseResult } from "../../types/UseCaseResult";
import { TypeOfVariants } from "../../types/variants_items";

interface Input {
  id: IRecurring["id"]
}

type UsedRepoInterfaces = 
  | IRepoRecurring;

type UsedRepoInterfaceNames =
  | RepoInterfaceNames.Recurring

type Return = UseCaseResult<
  "DisableRecurring",
  Recurring,
  UsedRepoInterfaces,
  UsedRepoInterfaceNames
>

type UseCaseInterface = IUseCase<Input, Return>

export default abstract class DisableRecurring implements UseCaseInterface {
  protected abstract variant: TypeOfVariants;
  
  constructor(
    private repo_r: IRepoRecurring
  ){}
  
  execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result_search = this.repo_r.find_by_id(input.id)

    if (!result_search.success) {
      return {
        success: false,
        error: {
          ...result_search.error,
          trace: "DisableRecurring > RepoRecurring"
        }
      }
    }

    const recurring = result_search.data

    recurring.disable();
    
    const {
      id,
      tag,
      transfer_method,
      recurrence_type,
      created_at,
      updated_at,
      ...data
    } = {
      ...recurring.properties,
      fk_id_tag: recurring.tag.id,
      fk_id_transfer_method: recurring.transfer_method.id,
      fk_id_recurrence_type: recurring.recurrence_type.id,
    }

    const result_updated = this.repo_r.update(input.id, data)

    if(!result_updated.success) {
      return {
        success: false,
        error: {
          ...result_updated.error,
          trace: "DisableRecurring > RepoRecurring"
        }
      }
    }

    return {
      success: true,
      data: result_updated.data
    }
  }
}