/**
 *
 * @param num
 * @param decimals
 */
export const truncateDecimals = (num: number, decimals: number = 2) => {
	const factor = Math.pow(10, decimals);
	return Math.trunc(num * factor) / factor;
};

/**
 *
 * @param min
 * @param max
 */
export const getRandomInt = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
