import { IStandard } from "@src/core/entities/standard.entity";
import { MItemValue } from "./item_value.model";

export interface MStandard extends StrictOmit<IStandard, "item_value"> {
  item_value: MItemValue
}