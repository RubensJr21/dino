import { ItemValue } from '@src/core/entities/item_value.entity';
import { MItemValue } from '@src/core/models/item_value.model';
import { Result } from '../types/Result';

export type CreateItemValueParams = StrictOmit<MItemValue, "id"|"created_at"|"updated_at">
export type UpdateItemValueParams = StrictOmit<MItemValue, "id"|"created_at"|"updated_at">

export interface IRepoItemValue {
  create(data: CreateItemValueParams): Result<ItemValue>;
  findById(id: MItemValue["id"]): Result<ItemValue>;
  findAll(): Result<ItemValue[]>;
  update(id: MItemValue["id"], data: UpdateItemValueParams): Result<ItemValue>;
  delete(id: MItemValue["id"]): Result<boolean>;
}