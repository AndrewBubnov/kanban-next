import { timeUnits } from '@/modules/CreateAndUpdateTask/constants';

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

export const getElapsedTime = (date: Date) => {
	const elapsed = Date.parse(date.toString()) - Date.now();
	const biggestUnit = (Object.keys(timeUnits) as Array<keyof typeof timeUnits>).filter(
		unit => Math.abs(elapsed) > timeUnits[unit] || unit == 'second'
	)[0];
	return rtf.format(Math.round(elapsed / timeUnits[biggestUnit]), biggestUnit);
};
