import IUseCase from "@core/shared/IUseCase";
import { IRepoRecurring } from "../../interfaces/IRepoRecurring";
import { TypeOfVariants } from "../../types/variants_items";

interface FindRecurringById_Input {
  id: number
}

type Return = ReturnType<IRepoRecurring["findById"]>

export default abstract class FindRecurringById implements IUseCase<FindRecurringById_Input, Return> {
  protected abstract variant: TypeOfVariants
  
  constructor(
    private repo_riv: IRepoRecurring
  ){}
  
  async execute(input: FindRecurringById_Input): Promise<Return> {
    return this.repo_riv.findById(input.id)
  }
}