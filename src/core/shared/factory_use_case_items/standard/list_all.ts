import IUseCase from "@core/shared/IUseCase";
import { Standard } from "@src/core/entities/standard.entity";
import { IRepoStandard } from "../../interfaces/IRepositoryStandard";
import { TypeOfVariants } from "../../types/variants_items";

export default abstract class UseCase_Standard_ListAll implements IUseCase<void, Standard[]> {
  protected abstract variant: TypeOfVariants;
  /**
   * Constructs a new instance of the list all standard use case.
   * @param {IRepoStandard} repo_iv - The repository for standards used to retrieve data.
   */
  constructor(
    private repo_iv: IRepoStandard,
  ){}
  /**
   * Executes the use case to retrieve and filter standards based on the specified variant.
   * @returns {Promise<Standard[]>} A promise that resolves to an array of filtered standards.
   */
  async execute(): Promise<Standard[]> { 
    return this.repo_iv.findAllByCashflowType(this.variant);
  }
}