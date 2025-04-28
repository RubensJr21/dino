export interface IBankAccount {
  readonly id: number;
  nickname: string;
  is_disabled: boolean;
  balance: number;
  readonly created_at: Date;
  readonly updated_at: Date;
}