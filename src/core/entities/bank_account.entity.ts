export interface IBankAccount {
  readonly id: number;
  nickname: string;
  is_disabled: boolean;
  balance: number;
  created_at: Date;
  updated_at: Date;
}