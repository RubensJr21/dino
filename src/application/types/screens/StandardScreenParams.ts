import { TagsAvailable } from "@src/core/start_configs";

export type HomeStandardScreenParams = undefined;

export type RegisterStandardScreenParams = undefined;

export interface EditStandardScreenParams {
  id: number;
  description: string;
  date: Date;
  currency: number;
  tag: TagsAvailable;
}