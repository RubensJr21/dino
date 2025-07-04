
export type HomeInstallmentScreenParams = undefined;

export type RegisterInstallmentScreenParams = undefined;

export interface EditInstallmentScreenParams {
  id: number;
  description: string;
  date: Date;
  currency: number;
}