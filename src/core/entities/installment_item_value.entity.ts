/* eslint-disable jsdoc/require-jsdoc */
import { BaseItemValue, IBaseItemValue, ReturnProperties_BaseItemValue } from "./base_item_value.entity";

export interface IInstallmentItemValue extends IBaseItemValue {
	installments_number: number;
}

interface ReturnProperties extends ReturnProperties_BaseItemValue {
	installments_number: number;
}

export class InstallmentItemValue extends BaseItemValue implements IInstallmentItemValue {
	private _installments_number: IInstallmentItemValue["installments_number"];

	constructor({
		installments_number,
    ...props
	}: IInstallmentItemValue) {
		super(props);
		this._installments_number = installments_number;
	}

	public get installments_number(): InstallmentItemValue["_installments_number"] {
		return this._installments_number;
	}

	public change_installments_number(new_value: InstallmentItemValue["_installments_number"]): undefined | Error {
		// Runtime Error
		if (this.installments_number < 2) {
			return new Error("Valor informado para o número de parcelas é inválido!", {
        cause: "Número de parcela precisa ser maior ou igual à 2"
      });
		}
		this._installments_number = new_value;
		return undefined;
	}

	get properties(): ReturnProperties {
		return {
			...super.properties,
			installments_number: this.installments_number,
		} as const;
	}
}