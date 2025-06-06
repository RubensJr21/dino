/* eslint-disable jsdoc/require-jsdoc */
import { BaseItemValue, IBaseItemValue } from "./base_item_value.entity";

export type IItemValue = IBaseItemValue

export class ItemValue extends BaseItemValue implements IItemValue {
  constructor(props: IItemValue) {
    super(props);
  }
}
