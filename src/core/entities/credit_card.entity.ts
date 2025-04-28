export interface ICreditCard {
  readonly id: number;
  nickname: string;
  last_four_digits: string;
  limit: number;
  closing_date: Date;
  due_date: Date;
  is_disabled: boolean;
  readonly created_at: Date;
  readonly updated_at: Date;
}