import IUseCase from "@core/shared/IUseCase";
import { Recurring } from "@src/core/entities/recurring.entity";
import { IRepoRecurring } from "../../interfaces/IRepoRecurring";
import { Result } from "../../types/Result";
import { TypeOfVariants } from "../../types/variants_items";

interface UpdateRecurring_Input {
  id: number;
  data: StrictOmit<Recurring, "id">
}

type Return = Result<Recurring>

export default abstract class UseCase_Recurring_Update implements IUseCase<UpdateRecurring_Input, Return>{
  protected abstract variant: TypeOfVariants;
  
  constructor(
    private repo_rec: IRepoRecurring
  ){}
  
  async execute(input: UpdateRecurring_Input): Promise<Return> {
    const {
      id,
      recurrence_type,
      created_at,
      updated_at,
      ...data
    } = input.data.properties

    return this.repo_rec.update(id, data)
  }
}