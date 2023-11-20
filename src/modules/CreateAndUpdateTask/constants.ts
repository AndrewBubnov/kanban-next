export const estimation = [0.5]
	.concat(Array.from({ length: 10 }).map((_, index) => index + 1))
	.map(el => `${el} ${el > 1 ? 'days' : 'day'}`);
