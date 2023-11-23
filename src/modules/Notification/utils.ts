import { Move, MoveStateItem, Notification } from '@/modules/Notification/types';
import { TOAST_ANIMATION_AND_DELAY_TIME } from '@/modules/Notification/constants';

export const onDeleteNotification = (deletedKey: string) => (prevState: MoveStateItem[]) => {
	const deletedRow = prevState.find(el => el.id === deletedKey)?.moves.at(-1)?.row || 0;
	return prevState.map(el => {
		const lastRow = el.moves.at(-1)?.row || 0;
		if (el.id === deletedKey) {
			return { ...el, moves: [{ move: Move.RIGHT, row: lastRow, timeout: 0 }] };
		}
		if (el.moves.at(-1)?.row || 0 > deletedRow) {
			return { ...el, moves: [{ move: Move.UP, row: lastRow - 1, timeout: 0 }] };
		}
		return el;
	});
};

export const createMoveState = (state: MoveStateItem[], notifications: Notification[]) => {
	if (!state.length) {
		return notifications.reduce((acc, cur, index) => {
			const verticalMoves = Array.from({ length: notifications.length - 1 - index }, (_, arrayIndex) => ({
				move: Move.UP,
				timeout: (index + arrayIndex + 1) * TOAST_ANIMATION_AND_DELAY_TIME,
				row: arrayIndex + 1,
			}));
			const moves = [
				{ move: Move.LEFT, timeout: index * TOAST_ANIMATION_AND_DELAY_TIME, row: 0 },
				...verticalMoves,
			];
			acc.push({
				moves,
				text: cur.text,
				link: cur.link,
				id: cur.id,
			});
			return acc;
		}, [] as MoveStateItem[]);
	}
	if (state.length < notifications.length) {
		const existed = Object.values(state).map(el => ({
			...el,
			moves: [{ move: Move.UP, timeout: 0, row: (el.moves.at(-1)?.row || 0) + 1 }],
		}));
		return [
			...existed,
			{
				moves: [{ move: Move.LEFT, timeout: 0, row: 0 }],
				id: notifications.at(-1)?.id || '',
				text: notifications.at(-1)?.text || '',
				link: notifications.at(-1)?.link || '',
			},
		];
	}
	return state;
};
