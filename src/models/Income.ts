/* TODO: Implementar modelo de dados do Income / Depois da reunião com professor */
export interface Income {
	id: number;
	description: string;
	datePicker: string;
	currency: `${number}`;
	recurring: boolean;
}
