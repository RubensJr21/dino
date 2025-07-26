import { Installment } from "@src/core/entities/installment.entity";
import { Recurring } from "@src/core/entities/recurring.entity";
import { Standard } from "@src/core/entities/standard.entity";

export function filterStandardById(list: Standard[], id: number) {
  return list.filter((e) => e.id !== id);
}
export function filterInstallmentById(list: Installment[], id: number) {
  return list.filter((e) => e.id !== id);
}
export function filterRecurringById(list: Recurring[], id: number) {
  return list.filter((e) => e.id !== id);
}