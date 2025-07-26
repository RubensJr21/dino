import IUseCase from "@core/shared/IUseCase";
import { Installment } from "@src/core/entities/installment.entity";
import { IRepoInstallment } from "../../interfaces/IRepoInstallment";
import { Result } from "../../types/Result";

// REVIEW: Pensar se vou permitir alteração ou se para trocar as informações será necessário excluir e criar um novo

interface UpdateInstallment_Input {
  id: number;
  data: StrictOmit<Installment["properties"], "id"|"created_at"|"updated_at">
}

type Return = Result<Installment>

export default abstract class UseCase_Installment_Update implements IUseCase<UpdateInstallment_Input, Return>{
  
  constructor(
    private repo_i: IRepoInstallment
  ){}
  
  async execute(input: UpdateInstallment_Input): Promise<Return> {
    return this.repo_i.update(input.id, input.data)
  }
}