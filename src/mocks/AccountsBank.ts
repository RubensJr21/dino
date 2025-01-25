import { AccountsBank } from "@/models/AccountsBank";

export const dataAccountsBank: AccountsBank[] = Array.from(
	{ length: 3 },
	(_, index) => {
		const id = index + 1;

		return {
			id,
			account: 3000 + id,
			agency: 475 + id,
			bank_name: generateBankName(),
		} as AccountsBank;
	}
);

function generateBankName(): string {
	const prefixes = [
		"Banco",
		"Financeira",
		"Instituto",
		"Corporação",
		"Cooperativa",
		"Crédito",
	];
	const coreNames = [
		"Alpha",
		"Bravo",
		"Fortuna",
		"Vanguard",
		"Prime",
		"Nexo",
		"Harmonia",
		"Solidez",
		"Aurum",
		"Nova Era",
		"Sentinela",
		"Ouro",
	];
	const suffixes = [
		"S.A.",
		"LTDA",
		"do Brasil",
		"Global",
		"Internacional",
		"Nacional",
		"Universal",
	];

	const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
	const coreName = coreNames[Math.floor(Math.random() * coreNames.length)];
	const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

	return `${prefix} ${coreName} ${suffix}`;
}
