import { RepoInterfaceNames } from "@core-types/enum/RepoInterfaceNames";
import { UseCaseResult } from "@core-types/UseCaseResult";
import { TypeOfVariants } from "@core-types/variants_items";
import IUseCase from "@core/interfaces/IUseCase_v3";
import { IRecurring, Recurring } from "@domain/entities/recurring.entity";
import { IRepoRecurring } from "@domain/repositories/IRepoRecurring";

interface Input {
  id: IRecurring["id"];
  current_amount: IRecurring["current_amount"]
}

type UsedRepoInterfaces = 
  | IRepoRecurring;

type UsedRepoInterfaceNames =
  | RepoInterfaceNames.Recurring

type Return = UseCaseResult<
  "UpdateCurrentRecurringAmount",
  Recurring,
  UsedRepoInterfaces,
  UsedRepoInterfaceNames
>

type UseCaseInterface = IUseCase<Input, Return>

export default abstract class UpdateCurrentRecurringAmount implements UseCaseInterface {
  protected abstract variant: TypeOfVariants;
  
  constructor( private repo_r: IRepoRecurring ){}
  
  execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result_search = this.repo_r.find_by_id(input.id);

    if(!result_search.success){
      return {
        success: false,
        error: {
          ...result_search.error,
          trace: "UpdateCurrentRecurringAmount > RepoRecurring"
        }
      }
    }

    const data = result_search.data.properties

    const result_update = this.repo_r.update(input.id, {
      description: data.description,
      is_disabled: data.is_disabled,
      current_amount: input.current_amount,
      start_date: data.start_date,
      end_date: data.end_date,
      fk_id_tag: data.tag.id,
      fk_id_transfer_method: data.transfer_method.id,
      fk_id_recurrence_type: data.recurrence_type.id
    })

    if(!result_update.success){
      return {
        success: false,
        error: {
          ...result_update.error,
          trace: "UpdateCurrentRecurringAmount > RepoRecurring"
        }
      }
    }

    return {
      success: true,
      data: result_update.data
    }
  }
}