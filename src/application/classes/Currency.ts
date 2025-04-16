import { AddThousandSeparator, PadStart } from "@application/decorators/Currency";

export class Currency {
	private value: number;

	@PadStart(1)
	@AddThousandSeparator()
	public get units() {
		return `${Math.floor(this.value / 100)}`;
	}

	@PadStart(2)
	public get cents() {
		return `${this.value % 100}`;
	}

	public get formattedValue(): string {
		return `${this.units}.${this.cents}`;
	}

	constructor(currencyValue: string) {
		this.value = Number(currencyValue);
	}
}
