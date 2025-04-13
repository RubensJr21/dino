import { InstallmentItemValue } from "@core/entities/installment_item_value.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoInstallmentItemValue } from "@core/shared/RepositoryTypes";

export default class ListAllInstallmentReceipts implements IUseCase<void, InstallmentItemValue[]> {
    constructor(
        private repo_iiv: IRepoInstallmentItemValue
    ){}
    async execute(): Promise<InstallmentItemValue[]> {
        const item_values = await this.repo_iiv.findAll()
        return item_values.filter((iiv) => {
            return iiv.base_item_value.type === "Entrada"
        });
    }
}