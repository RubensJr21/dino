import IUseCase from "@core/shared/IUseCase";
import { Installment } from "@src/core/entities/installment.entity";
import { IRepoInstallment } from "../../interfaces/IRepositoryInstallment";

// REVIEW: Pensar se vou permitir alteração ou se para trocar as informações será necessário excluir e criar um novo

interface UpdateInstallment_Input {
  id: number;
  data: StrictOmit<Installment["properties"], "id"|"created_at"|"updated_at">
}

export default abstract class UseCase_Installment_Update implements IUseCase<UpdateInstallment_Input, Installment>{
  /**
   * Construtor da Classe UseCase_Installment_Update
   * @param {IRepoInstallment} repo_i ""
   */
  constructor(
    private repo_i: IRepoInstallment
  ){}
  
  /**
   * Executes the update process for an installment
   * @param {UpdateInstallment_Input} input - The input data for updating the installment
   * @returns {Promise<Installment>} The updated installment
   */
  async execute(input: UpdateInstallment_Input): Promise<Installment> {
    const {
      itens,
      ...data
    } = {
      ...input.data,
    }

    return this.repo_i.update(input.id, data)
  }
}