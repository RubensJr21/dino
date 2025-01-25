import { Expense } from "@/models/Expense";

const DADOS_RECUPERADOS: Expense[] = Array.from({ length: 50 }, (_, index) => {
	const id = index + 1;

	// Função para gerar uma data aleatória no intervalo
	const randomDate = () => {
		const startDate = new Date(2024, 12, 31); // 30/11/2024
		const endDate = new Date(2025, 1, 28); // 28/02/2025
		const randomTime =
			startDate.getTime() +
			Math.random() * (endDate.getTime() - startDate.getTime());
		const date = new Date(randomTime);
		return date.toLocaleDateString("pt-BR"); // Formato DD/MM/AAAA
	};

	// Valores de 0.00 a 50.00
	const randomCurrency = () => `${Number((Math.random() * 50).toFixed(2))}`;

	return {
		id,
		get description() {
			return `Descrição ${this.id}`;
		},
		datePicker: randomDate(),
		currency: randomCurrency(),
		recurring: Math.random() < 0.5, // true ou false aleatório
	} as Expense;
});

function groupByDate(
	expenses: Expense[]
): { date: string; expenses: Expense[] }[] {
	const grouped = expenses.reduce((acc, item) => {
		const date = item.datePicker; // A data no formato "DD/MM/AAAA"

		// Se a data não existe no acumulador, cria um array vazio
		if (!acc[date]) {
			acc[date] = [];
		}

		// Adiciona o item ao grupo correspondente
		acc[date].push(item);

		return acc;
	}, {} as Record<string, Expense[]>);

	// Converte o objeto agrupado em uma lista de objetos
	return Object.entries(grouped).map(([date, expenses]) => ({
		date,
		expenses,
	}));
}

export type ExpenseGroupByDate = { date: string; expenses: Expense[] }[];

export const dataGroupByDate: ExpenseGroupByDate =
	groupByDate(DADOS_RECUPERADOS);
