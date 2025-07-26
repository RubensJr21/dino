import { IInstallment, Installment } from "@src/core/entities/installment.entity";

export function installment_mapper(input: IInstallment): Installment {
  return new Installment(input)
}