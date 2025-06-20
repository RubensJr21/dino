/* eslint-disable jsdoc/require-jsdoc */

// TODO: Implementar para Incomes (Verificar modelo de dados)

import { Income } from "@application/models/Income";

const DADOS_RECUPERADOS: Income[] = Array.from({ length: 50 }, (_, index) => {
	const id = index + 1;

	// Função para gerar uma data aleatória no intervalo
	const randomDate = () => {
		const startDate = new Date(2025, 1, 22); // 22/01/2025
		const endDate = new Date(2025, 1, 28); // 28/02/2025
		const randomTime =
			startDate.getTime() +
			Math.random() * (endDate.getTime() - startDate.getTime());
		const date = new Date(randomTime);
		return date.toLocaleDateString("pt-BR"); // Formato DD/MM/AAAA
	};

	// Valores de 0.00 a 50.00
	const randomCurrency = () => `${Number((Math.random() * 50).toFixed(2))}`;

  const randomType = () => {
    const prob = Math.random();
    if(prob < .3) return "default";
    if(prob < .6) return "installment";
    return "recurring";
  }

	return {
		id,
		get description() {
			return `Recebimento nº ${this.id}`;
		},
		datePicker: randomDate(),
		currency: randomCurrency(),
    type: randomType()
	} as Income;
});

function groupByDate(
	incomes: Income[]
): { date: string; incomes: Income[] }[] {
	const grouped = incomes.reduce((acc, item) => {
		const date = item.datePicker; // A data no formato "DD/MM/AAAA"

		// Se a data não existe no acumulador, cria um array vazio
		if (!acc[date]) {
			acc[date] = [];
		}

		// Adiciona o item ao grupo correspondente
		acc[date].push(item);

		return acc;
	}, {} as Record<string, Income[]>);

	// Converte o objeto agrupado em uma lista de objetos
	return Object.entries(grouped).map(([date, incomes]) => ({
		date,
		incomes,
	}));
}

export type IncomeGroupByDate = { date: string; incomes: Income[] }[];

export const dataGroupByDate: IncomeGroupByDate = groupByDate(DADOS_RECUPERADOS);
