import { IStandard } from "@src/core/entities/standard.entity";
import { IItemValue } from "../entities/item_value.entity";

export interface MStandard extends StrictOmit<IStandard, "item_value"> {
  fk_id_item_value: IItemValue["id"]
}