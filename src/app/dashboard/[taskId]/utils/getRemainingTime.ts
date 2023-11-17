import { timeUnits } from '@/modules/CreateAndUpdateTask/constants';

export const getRemainingTime = (createdAt: Date, days: number) => {
	if (!days) return { isExpired: false, remainingTimeString: '' };
	const remaining = Date.parse(createdAt.toString()) + days * timeUnits.day - Date.now();
	if (remaining <= 0) return { isExpired: true, remainingTimeString: "Task's time is up. Re-estimate?" };
	const biggestUnit = (Object.keys(timeUnits) as Array<keyof typeof timeUnits>).filter(
		unit => Math.abs(remaining) > timeUnits[unit] || unit == 'second'
	)[0];
	const number = Math.round(remaining / timeUnits[biggestUnit]);
	return { isExpired: false, remainingTimeString: `${number} ${biggestUnit}${number > 1 ? 's' : ''}` };
};
