import { ItemValue } from "@core/entities/item_value.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoItemValue } from "@core/shared/RepositoryTypes";

export default class ListAllPayments implements IUseCase<void, ItemValue[]> {
    constructor(
        private repo_iv: IRepoItemValue,
    ){}
    async execute(): Promise<ItemValue[]> {
        const item_values = await this.repo_iv.findAll()
        return item_values.filter((iv) => {
            return iv.base_item_value.type === "Saída"
        });
    }
}