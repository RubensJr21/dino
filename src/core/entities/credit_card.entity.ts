export interface CreditCard {
  readonly id: number;
  nickname: string;
  last_four_digits: string;
  limit: number;
  closing_date: Date;
  due_date: Date;
  is_disabled: boolean;
  created_at: Date;
  updated_at: Date;
}