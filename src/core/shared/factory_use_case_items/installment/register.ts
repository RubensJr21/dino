import IUseCase from "@core/shared/IUseCase";
import { Installment } from "@src/core/entities/installment.entity";
import { ItemValue } from "@src/core/entities/item_value.entity";
import { MInstallment } from "@src/core/models/installment.model";
import { IRepoInstallment } from "../../interfaces/IRepoInstallment";
import { IRepoItemValue } from "../../interfaces/IRepoItemValue";
import { TypeOfVariants } from "../../types/variants_items";

type Input = StrictOmit<MInstallment, "id" | "created_at" | "updated_at">

type UseCaseInterface = IUseCase<Input, Installment>

export default abstract class RegisterInstallment implements UseCaseInterface {
  protected abstract variant: TypeOfVariants

  constructor(
    private repo_i: IRepoInstallment,
    private repo_iv: IRepoItemValue
  ) { }

  protected calculate_installment_dates(start_date: Input["start_date"], installments_number: Input["installments_number"]): Array<Date> {
    // Garante que o número de datas será igual ao número de parcelas
    const array = Array.from<Date>({ length: installments_number })

    array[0] = start_date;

    const startDay = start_date.getDate();
    const startMonth = start_date.getMonth();
    const startYear = start_date.getFullYear();

    for (let i = 1; i < installments_number; i++) {
      // calcula ano e mês “absolutos” do parcelamento
      const year = startYear + Math.floor((startMonth + i) / 12);
      const month = (startMonth + i) % 12;

      // último dia do mês alvo: new Date(ano, mês+1, 0)
      // Em JS, usar dia 0 do mês M+1 retorna o último dia do mês M.
      const lastDayOfTargetMonth = new Date(year, month + 1, 0).getDate();

      // escolhe o dia: ou o mesmo dia do startDate, ou o último dia do mês
      const day = Math.min(startDay, lastDayOfTargetMonth);

      array[i] = new Date(year, month, day)
    }
    return array
  }

  protected calculate_installments(total_amount: Input["total_amount"], installments_number: Input["installments_number"]): Array<number> {
    // Garante que o número de valores será igual ao número de parcelas
    const array = Array.from<number>({ length: installments_number })

    const installment_value = Math.trunc(total_amount / installments_number);
    const residual_installment_value = total_amount % installments_number;

    array[0] = installment_value + residual_installment_value

    for (let i = 1; i < installments_number; i++) {
      array[i] = installment_value
    }
    return array
  }

  async execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const {
      description,
      fk_id_tag,
      fk_id_transfer_method,
      start_date,
      installments_number,
      total_amount,
    } = input

    if (installments_number <= 2) {
      return {
        success: false,
        error: {
          code: "installment_number_less_than_2",
          scope: "RegisterInstallment",
          message: "O valor da quantidade das parcelas precisa ser de no mínimo 2."
        }
      }
    }

    const result_create = this.repo_i.create({
      description,
      fk_id_tag,
      fk_id_transfer_method,
      start_date,
      installments_number,
      total_amount,
    })

    if (!result_create.success) {
      const scope = `RegisterInstallment(${this.repo_iv.create.name}) > ${result_create.error.scope}`
      return {
        success: false,
        error: {
          ...result_create.error,
          scope
        }
      }
    }

    const list_dates = this.calculate_installment_dates(start_date, installments_number);
    const list_installments = this.calculate_installments(total_amount, installments_number);

    const item_value_id_list = Array.from({length: installments_number}) satisfies Array<ItemValue["id"]>

    for (let i = 0; i < installments_number; i++) {
      const result_item_value_create = this.repo_iv.create({
        description: `${description} - installment ${i + 1}`,
        cashflow_type: this.variant,
        amount: list_installments[i],
        scheduled_at: list_dates[i],
        was_processed: false,
        fk_id_tag,
        fk_id_transfer_method
      })

      if (!result_item_value_create.success) {
        const scope = `RegisterInstallment(${this.repo_iv.create.name}) > ${result_item_value_create.error.scope}`
        return {
          success: false,
          error: {
            ...result_item_value_create.error,
            scope
          }
        }
      }

      const item_value = result_item_value_create.data

      item_value_id_list.push(item_value.id)
    }

    const installment = result_create.data

    const installment_item_value_linked = this.repo_i.registerInstallments(installment.id, item_value_id_list);

    if(!installment_item_value_linked.success){
      const scope = `RegisterInstallment(${this.repo_i.registerInstallments.name}) > ${installment_item_value_linked.error.scope}`
      return {
        success: false,
        error: {
          ...installment_item_value_linked.error,
          scope
        }
      }
    }

    return {
      success: true,
      data: installment
    }
  }
}