import { RecurrenceType } from "@lib/types";
import { Tag } from "./tag.entity";
import { TransferMethod } from "./transfer_method.entity";

export interface IRecurring {
  id: number;
  description: string;
  is_disabled: boolean;
  start_date: Date;
  end_date?: Date;
  current_amount: number;
  tag: Tag;
  transfer_method: TransferMethod;
  recurrence_type: RecurrenceType;
  created_at: Date;
  updated_at: Date;
}

interface ReturnProperties extends StrictOmit<IRecurring, "tag" | "transfer_method"> {
  tag: Tag["properties"];
  transfer_method: TransferMethod["properties"];
}

export class Recurring implements IRecurring {
  private readonly recurring: IRecurring;

  constructor(recurring: StrictOmit<IRecurring, "is_disabled">) {
    this.recurring = {
      ...recurring,
      is_disabled: recurring.end_date !== undefined
    }
  }

  public get id(): IRecurring["id"] {
    return this.recurring.id;
  }

  public get description(): IRecurring["description"] {
    return this.recurring.description
  }

  public get is_disabled(): IRecurring["is_disabled"] {
    return this.recurring.is_disabled;
  }
  public enable(): void {
    if (this.end_date !== undefined) {
      // Não está HABILITADO
      // start_date = new Date; end_date = undefined
      this.recurring.start_date = new Date();
      this.recurring.end_date = undefined;
      return;
    }
  }
  public disable(): void {
    if (this.end_date !== undefined) {
      // Está HABILITADO
      // start_date = new Date; end_date = undefined
      this.recurring.end_date = new Date();
      return;
    }
  }

  public get start_date(): IRecurring["start_date"] {
    return this.recurring.start_date
  }

  public get end_date(): IRecurring["end_date"] {
    return this.recurring.end_date
  }

  public get current_amount(): IRecurring["current_amount"] {
    return this.recurring.current_amount;
  }

  public get tag(): IRecurring["tag"] {
    return this.recurring.tag;
  }

  public get transfer_method(): IRecurring["transfer_method"] {
    return this.recurring.transfer_method;
  }

  public get recurrence_type(): IRecurring["recurrence_type"] {
    return this.recurring.recurrence_type
  }
  public change_recurrence_type(new_value: IRecurring["recurrence_type"]): void {
    this.recurring.recurrence_type = new_value;
  }

  public get created_at(): IRecurring["created_at"] {
    return this.recurring.created_at
  }

  public get updated_at(): IRecurring["updated_at"] {
    return this.recurring.updated_at
  }

  get properties(): ReturnProperties {
    return {
      ...this.recurring,
      id: this.recurring.id,
      tag: this.recurring.tag.properties,
      transfer_method: this.recurring.transfer_method.properties,
      recurrence_type: this.recurring.recurrence_type
    } as const;
  }
}