import { Recurring } from "@src/core/entities/recurring.entity";
import { RecurrencesAvailable, TagsAvailable } from "@src/core/start_configs";

export type HomeRecurringScreenParams = undefined;

export type RegisterRecurringScreenParams = undefined;

export interface EditRecurringScreenParams {
  id: number;
  description: string;
  date: Date;
  currency: number;
  tag: TagsAvailable;
  recurring: RecurrencesAvailable;
}

export interface DetailsRecurringScreenParams {
  recurring_id: Recurring["id"];
}