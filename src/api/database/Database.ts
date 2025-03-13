import * as SQLite from "expo-sqlite";

export default class Database {
	private db: SQLite.SQLiteDatabase;

	public constructor(db_name?: string) {
		// garante que não sejam aceitas strings vazias
		const name = db_name || "default";
		this.db = SQLite.openDatabaseSync(`${name}.db`);
		this.db.execSync(DATABASE_SCHEMA);
	}

	public get instance() {
		return this.db;
	}
}

// https://www.sqlite.org/foreignkeys.html#fk_actions

const DATABASE_SCHEMA: string = `
PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS tag (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	'description' TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS transfer_method_type (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	'name' TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS base_item_value (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	'description' TEXT NOT NULL,
	'type' TEXT NOT NULL,
	scheduled_at REAL NOT NULL,
	amount REAL NOT NULL,
	was_processed INTEGER NOT NULL DEFAULT 0,
	fk_id_transfer_method_type INTEGER NOT NULL,
	fk_id_tag INTEGER NOT NULL,
	created_at INTEGER NOT NULL DEFAULT CURRENT_DATE,
	updated_at INTEGER NOT NULL DEFAULT CURRENT_DATE,
	FOREIGN KEY(fk_id_transfer_method_type) REFERENCES transfer_method_type(id),
	FOREIGN KEY(fk_id_tag) REFERENCES tag(id)
);

CREATE TABLE IF NOT EXISTS item_value (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	fk_id_base_item_value INTEGER NOT NULL,
	FOREIGN KEY(fk_id_base_item_value) REFERENCES base_item_value(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS recurrence_type (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	'type' TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS recurring_item_value (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	is_disabled INTEGER NOT NULL DEFAULT 0,
	fk_id_recurrence_type INTEGER NOT NULL,
	fk_id_base_item_value INTEGER NOT NULL,
	FOREIGN KEY(fk_id_recurrence_type) REFERENCES recurrence_type(id),
	FOREIGN KEY(fk_id_base_item_value) REFERENCES base_item_value(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS installment_item_value (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	number_of_installments INTEGER NOT NULL,
	fk_id_base_item_value INTEGER NOT NULL,
	FOREIGN KEY(fk_id_base_item_value) REFERENCES base_item_value(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS bank_account (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	nickname TEXT NOT NULL,
	is_disabled INTEGER NOT NULL DEFAULT 0,
	balance REAL NOT NULL,
	created_at INTEGER NOT NULL DEFAULT CURRENT_DATE,
	updated_at INTEGER NOT NULL DEFAULT CURRENT_DATE
);
CREATE TABLE IF NOT EXISTS bank_account_transfer_method (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	'type' TEXT NOT NULL,
	fk_id_bank_account INTEGER NOT NULL,
	created_at INTEGER NOT NULL DEFAULT CURRENT_DATE,
	updated_at INTEGER NOT NULL DEFAULT CURRENT_DATE,
	FOREIGN KEY(fk_id_bank_account) REFERENCES bank_account(id)
);
CREATE TABLE IF NOT EXISTS item_value_pivot_bank_account_transfer_method (
	fk_id_base_item_value INTEGER NOT NULL,
	fk_id_bank_account_transfer_method INTEGER NOT NULL,
	FOREIGN KEY(fk_id_base_item_value) REFERENCES item_value(id),
	FOREIGN KEY(fk_id_bank_account_transfer_method) REFERENCES bank_account_transfer_method(id)
);
CREATE TABLE IF NOT EXISTS credit_card (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	nickname TEXT NOT NULL,
	last_four_digits TEXT NOT NULL,
	'limit' REAL NOT NULL,
	closing_date INTEGER NOT NULL,
	due_date INTEGER NOT NULL,
	is_disabled INTEGER NOT NULL DEFAULT 0,
	created_at INTEGER NOT NULL DEFAULT CURRENT_DATE,
	updated_at INTEGER NOT NULL DEFAULT CURRENT_DATE
);
CREATE TABLE IF NOT EXISTS item_value_pivot_credit_card_method (
	fk_id_base_item_value INTEGER NOT NULL,
	fk_id_credit_card INTEGER NOT NULL,
	FOREIGN KEY(fk_id_base_item_value) REFERENCES item_value(id),
	FOREIGN KEY(fk_id_credit_card) REFERENCES credit_card(id)
);
CREATE TABLE IF NOT EXISTS credit_card_statement (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	closing_date INTEGER NOT NULL,
	due_date INTEGER NOT NULL,
	created_at INTEGER NOT NULL DEFAULT CURRENT_DATE,
	updated_at INTEGER NOT NULL DEFAULT CURRENT_DATE,
	fk_id_credit_card INTEGER NOT NULL,
	FOREIGN KEY(fk_id_credit_card) REFERENCES credit_card(id)
);
CREATE TABLE IF NOT EXISTS credit_card_statement_item (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	fk_id_base_item_value INTEGER NOT NULL,
	fk_id_credit_card_statement INTEGER NOT NULL,
	FOREIGN KEY(fk_id_base_item_value) REFERENCES item_value(id),
	FOREIGN KEY(fk_id_credit_card_statement) REFERENCES credit_card_statement(id)
);

INSERT OR IGNORE INTO transfer_method_type (id, name) VALUES
(1, 'Cartão de crédito'),
(2, 'Pix'),
(3, 'Débito'),
(4, 'Boleto'),
(5, 'Transferência bancária');

INSERT OR IGNORE INTO tag (id, description) VALUES
( 1, 'Educação'),
( 2, 'Saúde'),
( 3, 'Lazer'),
( 4, 'Alimentação'),
( 5, 'Moradia'),
( 6, 'Transporte'),
( 7, 'Serviços'),
( 8, 'Compras'),
( 9, 'Impostos/Taxas'),
(10, 'Outros');

INSERT OR IGNORE INTO recurrence_type (id, type) VALUES
(1, 'Mensalmente'),
(2, 'Anualmente');
`;
