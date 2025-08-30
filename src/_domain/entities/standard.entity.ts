import { ItemValue } from "./item_value.entity";

export interface IStandard {
  id: number;
  description: string;
  item_value: ItemValue;
  created_at: Date;
  updated_at: Date;
}

export class Standard implements IStandard {
  private readonly standard: IStandard;

  constructor(standard: IStandard) {
    this.standard = standard
  }

  public get id(): IStandard["id"] {
    return this.standard.id
  }
  public get description(): IStandard["description"] {
    return this.standard.description
  }
  public get item_value(): IStandard["item_value"] {
    return this.standard.item_value
  }
  public get created_at(): IStandard["created_at"] {
    return this.standard.created_at
  }
  public get updated_at(): IStandard["updated_at"] {
    return this.standard.updated_at
  }
}
