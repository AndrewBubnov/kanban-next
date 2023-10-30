import { timeUnits } from '@/constants';

export const getRemainingTime = (createdAt: Date, days: number) => {
	if (!days) return 'not estimated';
	const remaining = Date.parse(createdAt.toString()) + days * timeUnits.day - Date.now();
	if (remaining <= 0) return "task's time is up";
	const biggestUnit = (Object.keys(timeUnits) as Array<keyof typeof timeUnits>).filter(
		unit => Math.abs(remaining) > timeUnits[unit] || unit == 'second'
	)[0];
	const number = Math.round(remaining / timeUnits[biggestUnit]);
	return `${number} ${biggestUnit}${number > 1 ? 's' : ''}`;
};
