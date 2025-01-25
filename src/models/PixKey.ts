export interface PixKey {
	id: number;
	key: string;
	// Nesse ponto tem uma fk_id_conta_bancaria
	// Que é resolvido da seguinte forma:
	account_bank: {
		id: number;
		bank_name: string;
		agency: number;
		account: number;
	};
}
