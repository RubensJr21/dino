export interface Expense {
	id: number;
	description: string;
	datePicker: string;
	currency: `${number}`;
	recurring: boolean;
}
