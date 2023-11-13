import { START_TOAST_POSITION } from '@/components/Toast/constants';
import { NotificationMap } from '@/components/Toast/types';

export const remapNotifications = (deletedKey: string, backup: NotificationMap) => (prevState: NotificationMap) => {
	const keys = Object.keys(prevState);
	if (keys.length === 1)
		return {
			[deletedKey]: {
				...prevState[deletedKey],
				moves: [{ move: START_TOAST_POSITION, timeout: 0 }],
			},
		};
	return keys.reduce((acc, cur) => {
		if (backup[cur].moves.length < 2) {
			acc[cur] = backup[cur];
			return acc;
		}
		if (+cur < +deletedKey) {
			acc[cur] = {
				...backup[cur],
				moves: [{ move: backup[cur].moves.at(-2)?.move || '', timeout: 0 }],
			};
			return acc;
		}
		acc[cur] = prevState[cur];
		return acc;
	}, {} as NotificationMap);
};

export const remapBackup = (deletedKey: string) => (prevState: NotificationMap) =>
	Object.keys(prevState).reduce((acc, cur) => {
		if (+cur < +deletedKey) {
			return {
				...acc,
				[cur]: {
					...prevState[cur],
					moves: prevState[cur].moves.slice(0, prevState[cur].moves.length - 1),
				},
			};
		}
		return {
			...acc,
			[cur]: prevState[cur],
		};
	}, {} as NotificationMap);

export const filterDeletedNotifications = (deletedKey: string) => (prevState: NotificationMap) =>
	Object.keys(prevState)
		.filter(el => el !== deletedKey)
		.reduce(
			(acc, cur) => ({
				...acc,
				[cur]: prevState[cur],
			}),
			{} as NotificationMap
		);
