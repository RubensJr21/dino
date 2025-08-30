import { TypeOfVariants } from "@core-types/variants_items";
import { Tag } from "./tag.entity";
import { TransferMethod } from "./transfer_method.entity";

export interface IItemValue {
  id: number;
  cashflow_type: TypeOfVariants;
  scheduled_at: Date;
  amount: number;
  was_processed: boolean;
  transfer_method: TransferMethod;
  tag: Tag;
  created_at: Date;
  updated_at: Date;
}

export interface ReturnProperties_ItemValue extends StrictOmit<IItemValue, "tag" | "transfer_method"> {
  transfer_method: IItemValue["transfer_method"]["properties"];
  tag: IItemValue["tag"]["properties"];
}

export class ItemValue implements IItemValue {
  private readonly item_value: IItemValue;

  constructor(item_value: IItemValue) {
    this.item_value = item_value
  }

  public get id(): IItemValue["id"] {
    return this.item_value.id;
  }

  public get cashflow_type(): IItemValue["cashflow_type"] {
    return this.item_value.cashflow_type
  }

  public change_cashflow_type(new_value: IItemValue["cashflow_type"]): undefined | Error {
    this.item_value.cashflow_type = new_value
    return undefined;
  }

  public get scheduled_at(): IItemValue["scheduled_at"] {
    return this.item_value.scheduled_at
  }

  public change_scheduled_at(new_value: IItemValue["scheduled_at"]): undefined | Error {
    this.item_value.scheduled_at = new_value
    return undefined;
  }

  public get amount(): IItemValue["amount"] {
    return this.item_value.amount
  }

  public change_amount(new_value: IItemValue["amount"]): undefined | Error {
    if (new_value <= 0) {
      return new Error("O valor precisa ser maior que 0")
    }
    this.item_value.amount = new_value
    return undefined;
  }


  public get was_processed(): IItemValue["was_processed"] {
    return this.item_value.was_processed
  }

  markAsProcessed(): void {
    this.item_value.was_processed = true;
  }

  markAsUnprocessed(): void {
    this.item_value.was_processed = false;
  }


  public get transfer_method(): IItemValue["transfer_method"] {
    return this.item_value.transfer_method
  }

  public change_transfer_method(new_value: IItemValue["transfer_method"]): undefined | Error {
    this.item_value.transfer_method = new_value
    return undefined;
  }

  public get tag(): IItemValue["tag"] {
    return this.item_value.tag
  }

  public change_tag(new_value: IItemValue["tag"]): undefined | Error {
    this.item_value.tag = new_value
    return undefined;
  }

  public get created_at(): IItemValue["created_at"] {
    return this.item_value.created_at
  }

  public get updated_at(): IItemValue["updated_at"] {
    return this.item_value.updated_at
  }

  get properties(): ReturnProperties_ItemValue {
    return {
      ...this.item_value,
      transfer_method: this.transfer_method.properties,
      tag: this.tag.properties,
    } as const;
  }
}