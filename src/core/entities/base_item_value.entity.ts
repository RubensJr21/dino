import { Tag } from "./tag.entity";
import { TransferMethodType } from "./transfer_method_type.entity";

export interface BaseItemValue {
    readonly id: number;
    description: string;
    type: string;
    scheduled_at: Date;
    amount: number;
    was_processed: boolean;
    transfer_method_type: TransferMethodType;
    tag: Tag;
    created_at: Date;
    updated_at: Date;
}