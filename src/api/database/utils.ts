export type AddDollarSign<T extends Record<string, any>> = {
	[K in keyof T as `$${string & K}`]: T[K];
};

export function addDollarSign<T extends Record<string, any>>(
	obj: T
): AddDollarSign<T> {
	return Object.entries(obj).reduce((acc, [key, value]) => {
		(acc as any)[`$${key}`] = value;
		return acc;
	}, {} as AddDollarSign<T>);
}

export function prepareDataForInsert<T extends object>(
	table_name: string,
	data: T
) {
	const columns = Object.keys(data);
	const columns_string = columns.join(", ");
	const values_string = columns.map(() => "?").join(", ");

	const query = `INSERT INTO ${table_name} (${columns_string}) VALUES (${values_string})`;

	const values = Object.values(data);

	return { query, values };
}

export function prepareDataForUpdate<T extends object, TYPE_ID>(
	table_name: string,
	data: T,
	id: TYPE_ID
) {
	const columns = Object.keys(data);
	const columns_and_values_string = columns
		.map((c) => `${c} = $${c}`)
		.join(", ");

	const query = `UPDATE ${table_name} SET ${columns_and_values_string} WHERE id = $id`;

	const values = addDollarSign({ ...data, id });

	return { query, values };
}
