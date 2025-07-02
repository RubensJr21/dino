import { Installment } from "@src/core/entities/installment.entity";
import { Recurring } from "@src/core/entities/recurring.entity";
import { Standard } from "@src/core/entities/standard.entity";

// eslint-disable-next-line jsdoc/require-jsdoc
export function filterStandardById(list: Standard[], id: number) {
  return list.filter((e) => e.id !== id);
}
// eslint-disable-next-line jsdoc/require-jsdoc
export function filterInstallmentById(list: Installment[], id: number) {
  return list.filter((e) => e.id !== id);
}
// eslint-disable-next-line jsdoc/require-jsdoc
export function filterRecurringById(list: Recurring[], id: number) {
  return list.filter((e) => e.id !== id);
}