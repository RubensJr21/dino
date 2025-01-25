import { dataAccountsBank } from "./AccountsBank";

import { PixKey } from "@/models/PixKey";

const qtd_PixKeys = 12;

const repeat_with_char = (
	char: string,
	list_count_repeat: number[],
	separator: string
) => {
	return list_count_repeat
		.map((count) => {
			return char.repeat(count);
		})
		.join(separator);
};

const keyPixFormat = [8, 4, 4, 4, 12];

const optionPixKey = [
	"123.456.789-00", // CPF
	"jhon.doe@email.com.br", // E-mail
	"00 98765-4321", // Telefone
	repeat_with_char("X", keyPixFormat, "-"), // Chave aleatória
];

const drawRandomPixKey = () => {
	const index = Math.floor(Math.random() * optionPixKey.length);
	return optionPixKey[index];
};

const drawRandomAccountBank = () => {
	const index = Math.floor(Math.random() * dataAccountsBank.length);
	return dataAccountsBank[index];
};

export const dataPixKeys: PixKey[] = Array.from(
	{ length: qtd_PixKeys },
	(_, index) => {
		const id = index + 1;

		return {
			id,
			key: drawRandomPixKey(),
			account_bank: drawRandomAccountBank(),
		} as PixKey;
	}
);
