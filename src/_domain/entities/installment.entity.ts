import { Tag } from "./tag.entity";
import { TransferMethod } from "./transfer_method.entity";

export interface IInstallment {
  id: number;
  description: string;
  transfer_method: TransferMethod;
  tag: Tag;
  start_date: Date;
  installments_number: number;
  total_amount: number;
  created_at: Date;
  updated_at: Date;
}

export interface ReturnProperties extends StrictOmit<IInstallment, "tag" | "transfer_method"> {
  transfer_method: IInstallment["transfer_method"]["properties"];
  tag: IInstallment["tag"]["properties"];
}

export class Installment implements IInstallment {
  private readonly installment: IInstallment

  constructor(installment: IInstallment) {
    this.installment = installment
  }

  public get id(): IInstallment["id"] {
    return this.installment.id;
  }

  public get description(): IInstallment["description"] {
    return this.installment.description;
  }

  public get transfer_method(): IInstallment["transfer_method"] {
    return this.installment.transfer_method;
  }

  public get tag(): IInstallment["tag"] {
    return this.installment.tag;
  }

  public get start_date(): IInstallment["start_date"] {
    return this.installment.start_date;
  }

  public get installments_number(): IInstallment["installments_number"] {
    return this.installment.installments_number;
  }
  public change_installments_number(new_value: IInstallment["installments_number"]): undefined | Error {
    // Runtime Error
    if (this.installments_number < 2) {
      return new Error("Valor informado para o número de parcelas é inválido!", {
        cause: "Número de parcela precisa ser maior ou igual à 2"
      });
    }
    this.installment.installments_number = new_value;
    return undefined;
  }

  public get total_amount(): IInstallment["total_amount"] {
    return this.installment.total_amount;
  }
  public change_total_amount(new_value: IInstallment["total_amount"]): undefined {
    this.installment.total_amount = new_value;
  }

  public get created_at(): IInstallment["created_at"] {
    return this.installment.created_at
  }

  public get updated_at(): IInstallment["updated_at"] {
    return this.installment.updated_at
  }

  get properties(): ReturnProperties {
    return {
      ...this.installment,
      transfer_method: this.transfer_method.properties,
      tag: this.tag.properties,
    } as const;
  }
}