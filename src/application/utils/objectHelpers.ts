export function withObject<T, R>(obj: T, callback: (o: T) => R): R {
	return callback(obj);
}
