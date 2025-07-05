/**
 *
 * @param resource
 * @param callback
 */
export function using<T extends { /**
                                   *
                                   */
close(): void }, R>(
	resource: T,
	callback: (res: T) => R
): R {
	try {
		return callback(resource);
	} finally {
		resource.close();
	}
}
