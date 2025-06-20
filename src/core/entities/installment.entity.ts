/* eslint-disable jsdoc/require-jsdoc */
import { IEntityWithDates } from "../shared/IEntityWithDates";
import { ItemValue } from "./item_value.entity";

export interface IInstallment extends IEntityWithDates {
  readonly id: number;
  total_amount: number;
  itens: ItemValue[];
	installments_number: number;
}

interface ReturnProperties extends StrictOmit<IInstallment, "itens"> {
	itens: Array<ItemValue["properties"]>
}

export class Installment implements IInstallment {
  private _id: IInstallment["id"];
  private _total_amount: IInstallment["total_amount"];
  private _itens: ItemValue[];
	private _installments_number: IInstallment["installments_number"];
  private readonly _created_at: IInstallment["created_at"]
  private readonly _updated_at: IInstallment["updated_at"]

	constructor({
    id,
    total_amount,
    itens,
		installments_number,
    created_at,
    updated_at
	}: IInstallment) {
		this._id = id;
		this._total_amount = total_amount;
		this._itens = itens;
		this._installments_number = installments_number;
		this._created_at = created_at;
		this._updated_at = updated_at;
	}

  public get id(): Installment["_id"]{
    return this._id;
  }

  public get total_amount(): Installment["_total_amount"]{
    return this._total_amount;
  }
  public change_total_amount(new_value: Installment["_total_amount"]): undefined{
    this._total_amount = new_value;
  }

  public get itens(): Installment["_itens"] {
    return this._itens;
  }

	public get installments_number(): Installment["_installments_number"] {
		return this._installments_number;
	}
	public change_installments_number(new_value: Installment["installments_number"]): undefined | Error {
		// Runtime Error
		if (this.installments_number < 2) {
			return new Error("Valor informado para o número de parcelas é inválido!", {
        cause: "Número de parcela precisa ser maior ou igual à 2"
      });
		}
		this._installments_number = new_value;
		return undefined;
	}

    public get created_at(): Installment["_created_at"] {
      return this._created_at
    }
    
    public get updated_at(): Installment["_updated_at"] {
      return this._updated_at
    }

	get properties(): ReturnProperties {
		return {
      id: this.id,
      total_amount: this.total_amount,
      itens: this.itens.map(item => item.properties),
			installments_number: this.installments_number,
      created_at: this.created_at,
      updated_at: this.updated_at
		} as const;
	}
}