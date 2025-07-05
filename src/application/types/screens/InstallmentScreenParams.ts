import { TagsAvailable } from "@src/core/start_configs";

export type HomeInstallmentScreenParams = undefined;

export type RegisterInstallmentScreenParams = undefined;

export interface EditInstallmentScreenParams {
  id: number;
  description: string;
  date: Date;
  tag: TagsAvailable;
  currency: number;
}