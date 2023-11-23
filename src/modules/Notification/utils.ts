import { Move, MoveStateItem, Notification } from '@/modules/Notification/types';

export const onDeleteNotification = (deletedKey: string) => (prevState: MoveStateItem[]) => {
	const deletedRow = prevState.find(el => el.id === deletedKey)?.row || 0;
	return prevState.map(el => {
		if (el.id === deletedKey)
			return {
				...el,
				move: Move.RIGHT,
			};
		if (el.row > deletedRow)
			return {
				...el,
				move: Move.DOWN,
				row: el.row - 1,
			};
		return el;
	});
};

export const createTimerState = (state: MoveStateItem[][], notifications: Notification[]) => {
	if (state.length === notifications.length) return state;
	return Array(notifications.length)
		.fill(null)
		.map((_, counter) =>
			notifications
				.slice(0, counter + 1)
				.reverse()
				.map((el, index, { length }) => ({
					move: length === 1 ? Move.LEFT : index ? Move.UP : Move.LEFT,
					text: el.text,
					link: el.link,
					row: index,
					id: el.id,
				}))
		);
};
