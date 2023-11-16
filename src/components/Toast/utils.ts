import { TOAST_ANIMATION_AND_DELAY_TIME } from '@/components/Toast/constants';
import { Move, NotificationMap } from '@/components/Toast/types';

export const remapNotifications = (deletedKey: string) => (prevState: NotificationMap) => {
	return Object.keys(prevState).reduce((acc, cur) => {
		if (cur === deletedKey) {
			acc[cur] = { ...prevState[deletedKey], moves: [{ move: 'right', timeout: 0 }] };
			return acc;
		}
		if (+cur < +deletedKey) {
			acc[cur] = { ...prevState[cur], moves: [{ move: `down${Date.now()}`, timeout: 0 }] };
			return acc;
		}
		acc[cur] = prevState[cur];
		return acc;
	}, {} as NotificationMap);
};

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

export const createNotificationMap =
	(notifications: { text: string; link: string }[]) =>
	(prevState: NotificationMap): NotificationMap => {
		const keys = Object.keys(prevState);
		if (keys.length && keys.length < notifications.length) {
			const existed = keys.reduce((acc, cur) => {
				acc[cur] = { ...prevState[cur], moves: [{ move: 'up', timeout: 0 }] };
				return acc;
			}, {} as NotificationMap);
			return {
				...existed,
				[String(notifications.length)]: {
					moves: [{ move: 'left', timeout: 0 }],
					text: notifications.at(-1)?.text || '',
					link: notifications.at(-1)?.link || '',
				},
			};
		}

		return notifications.reduce((acc, cur, index) => {
			const verticalMoves: Move[] = Array.from({ length: notifications.length - 1 - index }, (_, arrayIndex) => ({
				move: 'up',
				timeout: (index + arrayIndex + 1) * TOAST_ANIMATION_AND_DELAY_TIME,
			}));
			const moves: Move[] = [{ move: 'left', timeout: index * TOAST_ANIMATION_AND_DELAY_TIME }, ...verticalMoves];
			acc[String(index)] = {
				moves,
				text: cur.text,
				link: cur.link,
			};
			return acc;
		}, {} as NotificationMap);
	};
