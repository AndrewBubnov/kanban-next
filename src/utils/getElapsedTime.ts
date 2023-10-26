const units = {
	year: 24 * 60 * 60 * 1000 * 365,
	month: (24 * 60 * 60 * 1000 * 365) / 12,
	day: 24 * 60 * 60 * 1000,
	hour: 60 * 60 * 1000,
	minute: 60 * 1000,
	second: 1000,
};

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

export const getElapsedTime = (date: Date) => {
	const elapsed = Date.parse(date.toString()) - Date.now();
	const biggestUnit = (Object.keys(units) as Array<keyof typeof units>).filter(
		unit => Math.abs(elapsed) > units[unit] || unit == 'second'
	)[0];
	return rtf.format(Math.round(elapsed / units[biggestUnit]), biggestUnit);
};
