import { IItemValue } from "@domain/entities/item_value.entity";
import { IStandard } from "@domain/entities/standard.entity";

export interface MStandard extends StrictOmit<IStandard, "item_value"> {
  fk_id_item_value: IItemValue["id"]
}