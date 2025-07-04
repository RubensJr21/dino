import { RecurrencesAvailable } from "@src/core/start_configs";

export type HomeRecurringScreenParams = undefined;

export type RegisterRecurringScreenParams = undefined;

export interface EditRecurringScreenParams {
  id: number;
  description: string;
  date: Date;
  currency: number;
  recurring: RecurrencesAvailable;
}