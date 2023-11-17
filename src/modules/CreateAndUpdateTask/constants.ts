export const columns = ['New', 'In progress', 'Pending', 'Done'];
export const timeUnits = {
	year: 24 * 60 * 60 * 1000 * 365,
	month: (24 * 60 * 60 * 1000 * 365) / 12,
	day: 24 * 60 * 60 * 1000,
	hour: 60 * 60 * 1000,
	minute: 60 * 1000,
	second: 1000,
};
export const estimation = [0.5]
	.concat(Array.from({ length: 10 }).map((_, index) => index + 1))
	.map(el => `${el} ${el > 1 ? 'days' : 'day'}`);
