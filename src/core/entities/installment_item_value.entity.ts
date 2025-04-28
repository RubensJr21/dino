import { ABaseItemValue, IBaseItemValue } from "./base_item_value.entity";

interface IInstallmentItemValue extends IBaseItemValue {
	readonly id?: number;
	installments_number: number;
}

interface ReturnProperties extends StrictOmit<IInstallmentItemValue, "tag" | "transfer_method_type"> {
	transfer_method_type: ABaseItemValue["_transfer_method_type"]["properties"];
	tag: ABaseItemValue["tag"]["properties"];
}

export class InstallmentItemValue extends ABaseItemValue implements IInstallmentItemValue {
	protected readonly _id: IInstallmentItemValue["id"];
	private _installments_number: IInstallmentItemValue["installments_number"];
	protected readonly _biv_id: IInstallmentItemValue["biv_id"];
	protected _description: IInstallmentItemValue["description"];
	protected _type: IInstallmentItemValue["type"];
	protected _scheduled_at: IInstallmentItemValue["scheduled_at"];
	protected _amount: IInstallmentItemValue["amount"];
	protected _was_processed: IInstallmentItemValue["was_processed"];
	protected _transfer_method_type: IInstallmentItemValue["transfer_method_type"];
	protected _tag: IInstallmentItemValue["tag"];
  protected readonly _created_at: Date;
  protected readonly _updated_at: Date;

	constructor({
		id,
		installments_number,
		biv_id,
		description,
		type,
		scheduled_at,
		amount,
		was_processed,
		transfer_method_type,
		tag,
    created_at,
    updated_at
	}: IInstallmentItemValue) {
		super();
		this._id = id;
		this._installments_number = installments_number;
		this._biv_id = biv_id;
		this._description = description;
		this._type = type,
    this._scheduled_at = scheduled_at,
    this._amount = amount,
    this._was_processed = was_processed,
    this._transfer_method_type = transfer_method_type,
    this._tag = tag;
    this._created_at = created_at;
    this._updated_at = updated_at;
	}

	public get id(): InstallmentItemValue["_id"] {
		return this._id;
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
			id: this.id,
			installments_number: this.installments_number,
			description: this.description,
			type: this.type,
			scheduled_at: this.scheduled_at,
			amount: this.amount,
			was_processed: this.was_processed,
			transfer_method_type: this.transfer_method_type.properties,
			tag: this.tag.properties,
      created_at: this._created_at,
      updated_at: this._updated_at
		};
	}
}