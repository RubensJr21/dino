// Motivo dos comentários
// https://stackoverflow.com/questions/54243641/vscode-codeactionsonsave-ignore-specific-file#76646440

// not-order-next-line
export { tag } from "@infrastructure/database/drizzle/schemas/tag.schema";
// not-order-next-line
export { transfer_method_type } from "@schemas/transfer_method_type.schema";
// not-order-next-line
export { item_value, item_value_relations } from "@src/infrastructure/database/drizzle/schemas/item_value.schema";
// not-order-next-line
export { standard, standard_relations } from "@src/infrastructure/database/drizzle/schemas/standard.schema";
// not-order-next-line
export { recurrence_type } from "@schemas/recurrence_type.schema";
// not-order-next-line
export { recurring, recurring_relations } from "@src/infrastructure/database/drizzle/schemas/recurring.schema";
// not-order-next-line
export { recurring_item_value, recurring_item_value_relations } from "@src/infrastructure/database/drizzle/schemas/recurring_item_value.schema";
// not-order-next-line
export { installment } from "@src/infrastructure/database/drizzle/schemas/installment.schema";
// not-order-next-line
export { installment_item_value, installment_item_value_relations } from "@src/infrastructure/database/drizzle/schemas/installment_item_value.schema";
// not-order-next-line
export { bank_account } from "@schemas/bank_account.schema";
// not-order-next-line
export { bank_account_transfer_method, bank_account_transfer_method_relations } from "@schemas/bank_account_transfer_method.schema";
// // not-order-next-line
export {
  item_value_pivot_bank_account_transfer_method, item_value_pivot_bank_account_transfer_method_relations
} from "@src/infrastructure/database/drizzle/schemas/item_value-bank_account_transfer_method.schema";
// not-order-next-line