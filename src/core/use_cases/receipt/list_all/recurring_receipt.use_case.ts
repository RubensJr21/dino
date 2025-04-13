import { RecurringItemValue } from "@core/entities/recurring_item_value.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoRecurringItemValue } from "@core/shared/RepositoryTypes";

export default class ListAllRecurringReceipts implements IUseCase<void, RecurringItemValue[]> {
    constructor(
        private repo_riv: IRepoRecurringItemValue
    ){}
    async execute(): Promise<RecurringItemValue[]> {
        const item_values = await this.repo_riv.findAll()
        return item_values.filter((riv) => {
            return riv.base_item_value.type === "Entrada"
        });
    }
}