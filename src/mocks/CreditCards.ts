import { CreditCard } from "@/models/CreditCard";

const qtd_cards = 12;

export const dataCreditCards: CreditCard[] = Array.from(
	{ length: qtd_cards },
	(_, index) => {
		const id = index + 1;

		return {
			id,
			name: `CC${id.toString().padStart(6, "0")}`,
			limit: 1000 + id * 100,
		} as CreditCard;
	}
);
