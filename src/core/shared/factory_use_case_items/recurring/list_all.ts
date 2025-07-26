import IUseCase from "@core/shared/IUseCase";
import { Recurring } from "@src/core/entities/recurring.entity";
import { IRepoRecurring } from "../../interfaces/IRepoRecurring";
import { Result } from "../../types/Result";
import { TypeOfVariants } from "../../types/variants_items";

type Return = Result<Recurring[]>

export default abstract class UseCase_Recurring_ListAll implements IUseCase<void, Return> {
  protected abstract variant: TypeOfVariants;
  
  constructor(
    private repo_riv: IRepoRecurring
  ){}
  
  async execute(): Promise<Return> {
    return this.repo_riv.findAllByCashflowType(this.variant);
  }
}