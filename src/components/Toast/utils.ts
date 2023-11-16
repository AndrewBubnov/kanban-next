import {
	LAUNCH_TOAST,
	START_TOAST_POSITION,
	TOAST_ANIMATION_AND_DELAY_TIME,
	TOAST_GAP,
	TOAST_HEIGHT,
} from '@/components/Toast/constants';
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

export const createNotificationMap = (prevState: NotificationMap, notifications: { text: string; link: string }[]) => {
	const keys = Object.keys(prevState);
	if (keys.length && keys.length < notifications.length) {
		const existed = keys.reduce((acc, cur) => {
			const [stringStart, stringTransformY] = prevState[cur].moves.at(-1)?.move.split(',') || [];
			const lastTransformY = parseFloat(stringTransformY || '');
			acc[cur] = {
				...prevState[cur],
				moves: [
					{
						move: `${stringStart}, ${lastTransformY - (TOAST_HEIGHT + TOAST_GAP)}px, 0px)`,
						timeout: 0,
					},
				],
			};
			return acc;
		}, {} as NotificationMap);
		const updated = {
			...existed,
			[String(notifications.length)]: {
				moves: [{ move: LAUNCH_TOAST, timeout: 0 }],
				text: notifications.at(-1)?.text || '',
				link: notifications.at(-1)?.link || '',
			},
		};
		const backUpExisted = keys.reduce((acc, cur) => {
			const [stringStart, stringTransformY] = prevState[cur].moves.at(-1)?.move.split(',') || [];
			const lastTransformY = parseFloat(stringTransformY || '');
			acc[cur] = {
				...prevState[cur],
				moves: [
					...prevState[cur].moves,
					{
						move: `${stringStart}, ${lastTransformY - (TOAST_HEIGHT + TOAST_GAP)}px, 0px)`,
						timeout: 0,
					},
				],
			};
			return acc;
		}, {} as NotificationMap);
		const backUpUpdated = {
			...backUpExisted,
			[String(notifications.length)]: {
				moves: [{ move: LAUNCH_TOAST, timeout: 0 }],
				text: notifications.at(-1)?.text || '',
				link: notifications.at(-1)?.link || '',
			},
		};

		return { updated, backUpUpdated };
	}

	const updated = notifications.reduce((acc, cur, index) => {
		const verticalMoves = Array.from({ length: notifications.length - 1 - index }, (_, arrayIndex) => ({
			move: `translate3d(calc(-100% - 40px), ${-(arrayIndex + 1) * (TOAST_HEIGHT + TOAST_GAP)}px, 0px)`,
			timeout: (index + arrayIndex + 1) * TOAST_ANIMATION_AND_DELAY_TIME,
		}));
		const moves = [{ move: LAUNCH_TOAST, timeout: index * TOAST_ANIMATION_AND_DELAY_TIME }, ...verticalMoves];
		acc[String(index)] = {
			moves,
			text: cur.text,
			link: cur.link,
		};
		return acc;
	}, {} as NotificationMap);
	return { updated, backUpUpdated: updated };
};
